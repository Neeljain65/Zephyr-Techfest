"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { usePDF } from "react-to-pdf";

// UPDATED: Added phone_no to the interface
interface RegistrationData {
  eventName: string;
  name: string;
  college: string;
  paymentStatus: string;
  teamSize?: number;
  phone_no?: string;
}

// Print styles for a stylish PDF layout
const PrintStyles = () => (
  <style jsx global>{`
    @media print {
      @page {
        size: A4;
        margin: 0;
      }

      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        background: #0c0a18 !important;
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
        background: #111827 !important;
        width: 180mm;
        box-shadow: 0 0 40px rgba(139, 92, 246, 0.3) !important;
        position: static !important;
        transform: none !important;
        margin: 0;
        page-break-inside: avoid;
      }

      .no-print {
        display: none !important;
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

  const { toPDF, targetRef } = usePDF({
    filename: `zephyr-ticket-${registrationId}.pdf`,
    page: {
      format: "A4",
      orientation: "portrait",
    },
    canvas: {
      mimeType: "image/png",
      qualityRatio: 1,
    },
  });

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

      {/* === Ticket === */}
      <motion.div
        ref={targetRef}
        className="w-full max-w-md bg-slate-900/40 border border-purple-400/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-purple-500/10 printable-ticket"
        style={{ breakInside: "avoid" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center border-b border-purple-500/20 pb-4 mb-6">
          <h1
            className="text-2xl font-bold"
            style={{
              background: "linear-gradient(to right, #d8b4fe, #f9a8d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
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

        <div className="bg-white p-3 rounded-lg flex items-center justify-center">
          <QRCode value={registrationId} size={160} />
        </div>
        <p className="text-center text-xs font-mono text-gray-400 mt-3">
          Scan QR at entry. ID: {registrationId}
        </p>

        {/* === NEW CONTACT & WHATSAPP INFO SECTION === */}
        <div className="border-t border-purple-500/20 pt-4 mt-6 text-center space-y-2">
          <p className="text-sm font-mono text-slate-300">
            You will be added to the event WhatsApp group shortly.
          </p>
          <p className="text-xs text-slate-400">
            If not added within 24 hours, please contact the Event Manager:{" "}
            <span className="font-bold text-slate-200">
              {registration.phone_no}
            </span>
          </p>
        </div>

        {/* === Guidelines === */}
        <div className="border-t border-purple-500/20 pt-4 mt-6">
          <h2 className="font-mono text-center text-purple-300 text-sm mb-3">
            EVENT GUIDELINES
          </h2>
          <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400 font-mono">
            <li>Entry requires this e-card and a valid college ID card.</li>
            <li>Gates close 30 minutes prior to event start. No late entry.</li>
            <li>Bags subject to security checks.</li>
            <li>
              No sharp objects, flammable materials(including perfumes & deos),
              or outside food.
            </li>
            <li>Organizers not responsible for lost/stolen items.</li>
            <li>No re-entry to event premises allowed.</li>
            <li>No alcohol, narcotics or tobacco on campus.</li>
            <li>Ticket is non-transferable and non-refundable.</li>
            <li>
              Screenshot or Physical Print of this ticket both will be accepted
              at the entry gate
            </li>
          </ol>
        </div>
      </motion.div>

      {/* Download/Print Button */}
      <div className="flex gap-4 mt-8 no-print">
        <motion.button
          onClick={() => window.print()}
          className="relative px-6 py-3 border-2 font-mono font-semibold transition-all duration-300 backdrop-blur-sm rounded-lg bg-indigo-600/30 border-indigo-400/60 text-indigo-200 hover:bg-indigo-500/40 hover:shadow-indigo-500/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Print Ticket
        </motion.button>
      </div>
    </main>
  );
}
