"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import eventsData from "../../../lib/data";
import { motion } from "framer-motion";
import { db } from "../../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

// --- HELPER COMPONENTS (NO CHANGE) ---
const FormInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 font-mono text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
  />
);
const FormLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="font-mono text-sm text-purple-200 mb-2 block">
    {children}
  </label>
);
// --- END HELPER COMPONENTS ---

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string | undefined;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

export default function RegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId;

  const selectedEvent = eventsData.find(
    (event) => event.id.toString() === eventId
  );

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    contact: "",
    email: "",
    teamSize: selectedEvent?.teamSize
      ? selectedEvent.teamSize.min.toString()
      : "1",
    teamMembers: "",
    referralCode: "",
  });

  const [currentPrice, setCurrentPrice] = useState<number | string | undefined>(
    Array.isArray(selectedEvent?.prices)
      ? selectedEvent.prices[0].cost
      : selectedEvent?.price
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedEvent) {
      if (Array.isArray(selectedEvent.prices)) {
        const selectedTeamSize = parseInt(formData.teamSize, 10);
        const priceInfo = selectedEvent.prices.find(
          (p) => p.teamSize === selectedTeamSize
        );
        if (priceInfo) {
          setCurrentPrice(priceInfo.cost);
        } else {
          setCurrentPrice(selectedEvent.prices[0].cost);
        }
      } else {
        setCurrentPrice(selectedEvent.price);
      }
    }
  }, [formData.teamSize, selectedEvent]);

  const getTeamSizeOptions = () => {
    if (!selectedEvent?.teamSize) return null;
    const options = [];

    if (Array.isArray(selectedEvent.prices)) {
      selectedEvent.prices.forEach((priceOption) => {
        options.push(
          <option key={priceOption.teamSize} value={priceOption.teamSize}>
            {priceOption.teamSize} members
          </option>
        );
      });
    } else {
      for (
        let i = selectedEvent.teamSize.min;
        i <= selectedEvent.teamSize.max;
        i++
      ) {
        options.push(
          <option key={i} value={i}>
            {i} members
          </option>
        );
      }
    }
    return options;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice =
      typeof currentPrice === "string"
        ? parseInt(currentPrice, 10)
        : currentPrice;

    if (
      !selectedEvent ||
      typeof numericPrice !== "number" ||
      isNaN(numericPrice)
    ) {
      alert("This event is not available for registration at the moment.");
      return;
    }
    setIsLoading(true);

    try {
      const docRef = await addDoc(collection(db, "registrations"), {
        eventId: selectedEvent.id,
        eventName: selectedEvent.title,
        ...formData,
        finalPrice: numericPrice,
        paymentStatus: "pending",
        createdAt: new Date(),
      });
      const registrationId = docRef.id;

      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: numericPrice }),
      });

      if (!res.ok) throw new Error("Failed to create payment order.");
      const order = await res.json();

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Zephyr Techfest",
        description: `Registration for ${selectedEvent.title}`,
        order_id: order.id,
        handler: async function (response: RazorpaySuccessResponse) {
          const verificationRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, registrationId }),
          });
          if (verificationRes.ok) {
            alert("Payment Successful & Verified!");
            router.push(`/ticket/${registrationId}`);
          } else {
            alert("Payment successful, but server verification failed.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
        },
        theme: { color: "#8B5CF6" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Registration or Payment Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedEvent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-950 to-black text-white">
        Event not found!
      </div>
    );
  }

  const isPayable =
    typeof currentPrice === "string"
      ? !isNaN(parseInt(currentPrice, 10))
      : typeof currentPrice === "number";

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black text-white p-4 sm:p-8 flex items-center justify-center">
      <motion.div
        className="w-full max-w-3xl bg-slate-900/40 border border-purple-400/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-purple-500/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 py-2">
            Register: {selectedEvent.title}
          </h1>
          <p className="font-mono text-xl text-purple-300">
            Registration Fee: {isPayable ? `₹${currentPrice}` : currentPrice}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <FormLabel>Your Full Name (as per College ID)</FormLabel>
            <FormInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <FormLabel>Your College Name</FormLabel>
            <FormInput
              type="text"
              name="college"
              value={formData.college}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <FormLabel>Contact Number</FormLabel>
              <FormInput
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <FormLabel>Email Address</FormLabel>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* UPDATED: This whole block is now conditional */}
          {selectedEvent.teamSize && selectedEvent.teamSize.max > 1 && (
            <div className="space-y-6 pt-6 border-t border-purple-500/20">
              <h2 className="font-mono text-lg text-purple-300">
                Team Details
              </h2>
              {/* This dropdown only shows if there's a choice to be made */}
              {selectedEvent.teamSize.min !== selectedEvent.teamSize.max && (
                <div>
                  <FormLabel>Number of Team Members</FormLabel>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 font-mono text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  >
                    {getTeamSizeOptions()}
                  </select>
                </div>
              )}
              <div>
                <FormLabel>Team Member Names & College</FormLabel>
                <textarea
                  name="teamMembers"
                  value={formData.teamMembers}
                  onChange={handleInputChange}
                  placeholder="Enter each member's full name and college, one per line."
                  rows={4}
                  className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 font-mono text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-vertical"
                />
              </div>
            </div>
          )}

          <div>
            <FormLabel>Referral Code (Optional)</FormLabel>
            <FormInput
              type="text"
              name="referralCode"
              value={formData.referralCode}
              placeholder="Enter referral code"
              onChange={handleInputChange}
            />
          </div>

          <div className="pt-6">
            <motion.button
              type="submit"
              disabled={isLoading || !isPayable}
              className="w-full relative px-8 py-4 border-2 font-mono font-semibold text-lg transition-all duration-300 backdrop-blur-sm rounded-lg bg-purple-600/30 border-purple-400/60 text-purple-200 hover:bg-purple-500/40 hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{
                scale: isLoading || !isPayable ? 1 : 1.02,
                boxShadow: "0 0 30px rgba(139, 69, 249, 0.4)",
              }}
              whileTap={{ scale: isLoading || !isPayable ? 1 : 0.98 }}
            >
              {isLoading
                ? "Processing..."
                : isPayable
                ? `Pay ₹${currentPrice}`
                : "Registration Closed"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </main>
  );
}
