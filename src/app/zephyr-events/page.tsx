"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/footer";
import eventsData from "../../lib/data"; // Importing events data
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
} from "../../components/ui/dialog";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

const CosmicGateway = () => {
  const [isClient, setIsClient] = useState(false); // Fix for Hydration Error
  const [isLoaded, setIsLoaded] = useState(false);
  const [systemStatus, setSystemStatus] = useState("INITIALIZING");
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // This hook runs only on the client side, after the component mounts
    setIsClient(true);
  }, []);

  useEffect(() => {
    const statusSequence = [
      "INITIALIZING",
      "SCANNING COSMOS",
      "ALIGNING GATEWAY",
      "PORTAL ACTIVE",
    ];
    let statusIndex = 0;

    const statusInterval = setInterval(() => {
      if (statusIndex < statusSequence.length - 1) {
        statusIndex++;
        setSystemStatus(statusSequence[statusIndex]);
      } else {
        setIsLoaded(true);
        clearInterval(statusInterval);
      }
    }, 800);

    return () => clearInterval(statusInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const StarField = () => {
    const stars = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      twinkleDelay: Math.random() * 5,
      opacity: Math.random() * 0.8 + 0.2,
    }));

    return (
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 0.3, star.opacity],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              delay: star.twinkleDelay,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    );
  };

  const EnergyStream = ({
    direction = "vertical",
  }: {
    direction?: "vertical" | "horizontal";
  }) => {
    const delayRef = useRef(Math.random() * 3);

    return (
      <motion.div
        className={`absolute ${
          direction === "vertical" ? "w-px h-full" : "w-full h-px"
        } 
        bg-gradient-to-${direction === "vertical" ? "b" : "r"} 
        from-transparent via-purple-400/60 to-transparent`}
        animate={
          direction === "vertical"
            ? { y: ["-100%", "100%"] }
            : { x: ["-100%", "100%"] }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: delayRef.current,
        }}
      />
    );
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  interface EventType {
    id: number;
    title: string;
    price?: string;
    prices?: { teamSize: number; cost: number }[];
    tag: string;
    college: string;
    image: string;
    desc?: string;
    prize_pool?: string;
    teamSize?: { min: number; max: number };
  }

  const events: EventType[] = eventsData;
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const committees = Array.from(new Set(events.map((e) => e.college)));

  type SortOption = "alpha" | "price-asc" | "price-desc";
  const [selectedSort, setSelectedSort] = useState<SortOption>("alpha");

  const [selectedCommittee, setSelectedCommittee] = useState<string>("all");

  const parsePrice = (p: string | undefined) => {
    if (typeof p !== "string") return 0;
    return Number(p.replace(/[^0-9.-]+/g, "")) || 0;
  };

  const displayedEvents = events
    .filter((e) =>
      selectedCommittee === "all" ? true : e.college === selectedCommittee
    )
    .slice()
    .sort((a, b) => {
      if (selectedSort === "alpha") return a.title.localeCompare(b.title);
      const priceA = Array.isArray(a.prices)
        ? a.prices[0].cost
        : parsePrice(a.price);
      const priceB = Array.isArray(b.prices)
        ? b.prices[0].cost
        : parsePrice(b.price);
      if (selectedSort === "price-asc") return priceA - priceB;
      if (selectedSort === "price-desc") return priceB - priceA;
      return 0;
    });

  const EventCard = ({
    event,
    onClick,
  }: {
    event: EventType;
    onClick?: () => void;
  }) => {
    const displayPrice = Array.isArray(event.prices)
      ? `From ₹${event.prices[0].cost}`
      : typeof event.price === "string" && !isNaN(parsePrice(event.price))
      ? `₹${event.price}`
      : event.price;

    return (
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        className="relative bg-gradient-to-br from-slate-900/40 to-indigo-900/30 border border-purple-400/20 rounded-xl p-3 cursor-pointer hover:scale-[1.01] hover:shadow-lg transition-transform duration-150"
      >
        {/* --- MODIFIED TAG FOR VISIBILITY --- */}
        <div className="absolute top-3 right-3 text-xs font-mono px-3 py-1 bg-black/70 backdrop-blur rounded-full border border-white/20 text-white z-10">
          {event.tag}
        </div>

        <div className="w-full h-32 rounded-md overflow-hidden mb-3 bg-gradient-to-tr from-purple-800/20 to-indigo-800/10 flex items-center justify-center relative">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover opacity-90"
          />
        </div>

        <div className="font-semibold text-sm text-white mb-1 truncate">
          {event.title}
        </div>
        <div className="text-xs text-purple-200 font-mono">{displayPrice}</div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black text-white overflow-hidden relative"
    >
      <div className="fixed inset-0">
        {isClient && <StarField />}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/30 to-black/50" />
        <div className="absolute top-0 left-1/4 w-px h-full">
          <EnergyStream direction="vertical" />
        </div>
        <div className="absolute top-0 right-1/3 w-px h-full">
          <EnergyStream direction="vertical" />
        </div>
        <div className="absolute top-1/4 left-0 w-full h-px">
          <EnergyStream direction="horizontal" />
        </div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-32 left-16 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <motion.div
                className="relative w-40 h-40 mb-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 border-2 border-purple-400 rounded-full" />
                <div
                  className="absolute inset-4 border-2 border-blue-400 rounded-full"
                  style={{ animationDelay: "1s" }}
                />
                <div
                  className="absolute inset-8 border-2 border-pink-400 rounded-full"
                  style={{ animationDelay: "2s" }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(139, 69, 249, 0.5)",
                      "0 0 60px rgba(139, 69, 249, 0.9)",
                      "0 0 20px rgba(139, 69, 249, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div className="font-mono text-purple-300 text-2xl mb-4">
                COSMIC GATEWAY
              </div>
              <div className="font-mono text-sm text-blue-300">
                {systemStatus}
              </div>
              <div className="w-64 h-2 bg-gray-800 mt-6 relative overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-full"
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ duration: 3.2, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <motion.h3
                className="font-mono text-sm text-purple-300 mb-1"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                🚩 ZEHPYR EVENTS
              </motion.h3>
              <motion.h2
                className="text-3xl md:text-4xl font-bold"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Explore Events
              </motion.h2>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs font-mono text-purple-300 mr-2">
                Sort
              </label>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as SortOption)}
                className="bg-black/50 text-white px-3 py-2 rounded-md border border-white/10 font-mono text-sm"
              >
                <option value="alpha">Alphabetical</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
              <label className="text-xs font-mono text-purple-300 ml-4 mr-2">
                Committee
              </label>
              <select
                value={selectedCommittee}
                onChange={(e) => setSelectedCommittee(e.target.value)}
                className="bg-black/50 text-white px-3 py-2 rounded-md border border-white/10 font-mono text-sm"
              >
                <option value="all">All</option>
                {committees.map((committee) => (
                  <option key={committee} value={committee}>
                    {committee}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {displayedEvents.map((ev) => (
              <EventCard
                key={ev.id}
                event={ev}
                onClick={() => {
                  setSelectedEvent(ev);
                  setDialogOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- UPDATED DIALOG --- */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedEvent(null);
          setDialogOpen(open);
        }}
      >
        <DialogContent
          className="bg-slate-950 border-purple-800/50 text-slate-200 
            w-[95%] max-w-lg max-h-[90vh] mx-auto my-auto 
            rounded-xl p-6 overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="text-slate-50">
              {selectedEvent?.title ?? "Event Details"}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-2 flex flex-col md:flex-row gap-4">
            <div className="w-full h-40 md:h-80 bg-slate-800 rounded-md flex items-center justify-center relative overflow-hidden">
              {selectedEvent && (
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  fill
                  className="object-contain rounded-md"
                />
              )}
            </div>
          </div>

          <div className="w-full flex flex-col items-center mt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center w-full p-4 bg-slate-900 rounded-lg border border-slate-800">
              <div>
                <p className="font-mono text-xs text-purple-400 mb-1">FEE</p>
                <p className="font-semibold text-lg text-white">
                  {Array.isArray(selectedEvent?.prices)
                    ? `From ₹${selectedEvent?.prices[0].cost}`
                    : typeof selectedEvent?.price === "string" &&
                      !isNaN(parsePrice(selectedEvent?.price))
                    ? `₹${selectedEvent?.price}`
                    : selectedEvent?.price}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-purple-400 mb-1">
                  PRIZE POOL
                </p>
                <p className="font-semibold text-lg text-white">
                  {selectedEvent?.prize_pool}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-purple-400 mb-1">
                  TEAM SIZE
                </p>
                <p className="font-semibold text-lg text-white">
                  {selectedEvent?.teamSize
                    ? selectedEvent.teamSize.min === selectedEvent.teamSize.max
                      ? `${selectedEvent.teamSize.min}`
                      : `${selectedEvent.teamSize.min} - ${selectedEvent.teamSize.max}`
                    : "N/A"}
                </p>
              </div>
            </div>

            <DialogDescription className="pt-4 border-t border-slate-800 text-slate-400 text-sm sm:text-base leading-relaxed w-full">
              {selectedEvent?.desc}
            </DialogDescription>
          </div>

          <DialogFooter>
            <div className="flex gap-2 mt-4 w-full">
              {selectedEvent && (
                <Link href={`/register/${selectedEvent.id}`} className="flex-1">
                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md font-mono cursor-pointer hover:bg-purple-500 transition-colors duration-200">
                    Register
                  </button>
                </Link>
              )}
              <DialogClose asChild>
                <button className="px-4 py-2 bg-slate-800 text-white rounded-md font-mono cursor-pointer hover:bg-slate-700 transition-colors duration-200">
                  Close
                </button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CosmicGateway;
