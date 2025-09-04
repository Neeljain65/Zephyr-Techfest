"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

// Define the structure of the registration data we expect from Firebase
interface RegistrationData {
  eventName: string;
  name: string;
  college: string;
  paymentStatus: string;
  teamSize?: number;
}

// Updated print styles using Flexbox for perfect centering
const PrintStyles = () => (
  <style jsx global>{`
    @media print {
      @page {
        size: A4;
        margin: 0;
      }

      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        background-color: #0c0a18;
        /* Use Flexbox to center the ticket */
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }

      body * {
        visibility: hidden;
      }

      .printable-ticket,
      .printable-ticket * {
        visibility: visible;
      }

      .printable-ticket {
        width: 180mm;
        box-shadow: 0 0 40px rgba(139, 92, 246, 0.3);
        /* Remove absolute positioning */
        position: static;
        transform: none;
      }

      .no-print {
        display: none;
      }
    }
  `}</style>
);

export default function TicketPage() {
  const params = useParams();
  const registrationId = params.registrationId as string;
  const [registration, setRegistration] = useState<RegistrationData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (registrationId) {
      const fetchRegistration = async () => {
        const docRef = doc(db, "registrations", registrationId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().paymentStatus === "paid") {
          setRegistration(docSnap.data() as RegistrationData);
        } else {
          console.error("No such document or payment not completed!");
        }
        setIsLoading(false);
      };
      fetchRegistration();
    }
  }, [registrationId]);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-950 to-black text-white">
        <p className="font-mono text-xl">Generating your E-Reg Card...</p>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-950 to-black text-white">
        <p className="font-mono text-xl text-red-400">
          Could not find a valid registration.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black text-white p-4 sm:p-8 flex flex-col items-center justify-center">
      <PrintStyles />

      <motion.div
        className="w-full max-w-md bg-slate-900/40 border border-purple-400/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-purple-500/10 printable-ticket"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center border-b border-purple-500/20 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
            ZEPHYR TECHFEST
          </h1>
          <p className="font-mono text-sm text-purple-300">
            E-Registration Card
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <p className="font-mono text-xs text-purple-400">EVENT NAME</p>
            <p className="font-semibold text-lg">{registration.eventName}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-purple-400">ATTENDEE NAME</p>
            <p className="font-semibold text-lg">{registration.name}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-purple-400">COLLEGE</p>
            <p className="font-semibold text-lg">{registration.college}</p>
          </div>
          {registration.teamSize && Number(registration.teamSize) > 1 && (
            <div>
              <p className="font-mono text-xs text-purple-400">TEAM SIZE</p>
              <p className="font-semibold text-lg">
                {registration.teamSize} Members
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg flex items-center justify-center">
          <QRCode value={registrationId} size={200} />
        </div>
        <p className="text-center text-xs font-mono text-gray-400 mt-4">
          Scan this QR at the entry gate. Reg ID: {registrationId}
        </p>

        {/* === EVENT GUIDELINES SECTION === */}
        <div className="border-t border-purple-500/20 pt-4 mt-6">
          <h2 className="font-mono text-center text-purple-300 text-sm mb-4">
            EVENT GUIDELINES
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-xs text-gray-400 font-mono">
            <li>
              Entry requires this e-card and a valid, original college ID card.
            </li>
            <li>
              Gates close 30 minutes prior to the event start time. Late entry
              is not permitted.
            </li>
            <li>
              Bags are subject to security checks. Prohibited items will be
              confiscated.
            </li>
            <li>
              Prohibited items include sharp objects, flammable materials,
              perfumes/deodorants, and outside food/beverages.
            </li>
            <li>
              The organizers are not responsible for any lost or stolen personal
              belongings.
            </li>
            <li>Re-entry to the event premises is strictly not allowed.</li>
            <li>
              Use of alcohol, narcotics, and tobacco products is strictly
              prohibited on campus.
            </li>
            <li>
              Please maintain decorum. Any form of misconduct will result in
              immediate removal from the event.
            </li>
            <li>
              Follow the instructions provided by event staff and security
              personnel at all times.
            </li>
            <li>
              This ticket is non-transferable and non-refundable under any
              circumstances.
            </li>
          </ol>
        </div>
      </motion.div>

      <motion.button
        onClick={handlePrint}
        className="mt-8 relative px-8 py-4 border-2 font-mono font-semibold text-lg transition-all duration-300 backdrop-blur-sm rounded-lg bg-purple-600/30 border-purple-400/60 text-purple-200 hover:bg-purple-500/40 hover:shadow-purple-500/50 no-print"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Download PDF Ticket
      </motion.button>
    </main>
  );
}
