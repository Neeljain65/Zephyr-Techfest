"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [systemStatus, setSystemStatus] = useState("INITIALIZING");
  // const [activeTimeline, setActiveTimeline] = useState(0); TIMELINE SECTION PENDING
  // timeline / faq state removed (not used in this page)
  const containerRef = useRef(null);
  // scroll progress currently unused

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax transforms for cosmic depth -> to be used in timeline section
  // const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  // const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  // const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);

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

  // Stellar pulse effect
  // useEffect(() => {
  //   const pulseInterval = setInterval(() => {
  //     setStellarPulse(true);
  //     setTimeout(() => setStellarPulse(false), 200);
  //   }, 6000);

  //   return () => clearInterval(pulseInterval);
  // }, []);

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

  const CosmicButton = ({
    children,
    className = "",
    variant = "primary",
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "danger";
    onClick?: () => void;
    [key: string]: unknown;
  }) => {
    const variants: Record<string, string> = {
      primary:
        "bg-purple-600/30 border-purple-400/60 text-purple-200 hover:bg-purple-500/40 hover:shadow-purple-500/50",
      secondary:
        "bg-indigo-800/40 border-blue-400/50 text-blue-200 hover:bg-indigo-700/50 hover:shadow-blue-500/30",
      danger:
        "bg-pink-600/30 border-pink-400/60 text-pink-200 hover:bg-pink-500/40 hover:shadow-pink-500/50",
    };

    return (
      <motion.button
        className={`relative px-8 py-3 border-2 font-mono font-semibold transition-all duration-300 backdrop-blur-sm rounded-lg ${variants[variant]} ${className}`}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 30px rgba(139, 69, 249, 0.4)",
        }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    );
  };

  const EnergyStream = ({
    direction = "vertical",
  }: {
    direction?: "vertical" | "horizontal";
  }) => (
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
        repeatDelay: Math.random() * 3,
      }}
    />
  );

 
  // (removed timeline/sponsors/glimpses/faqs arrays - unused in this view)

  // EVENTS: generate ~50 sample events sized for a dense grid
  const [dialogOpen, setDialogOpen] = useState(false);
 interface EventType {
  id: number;
  title: string;
  price: string;
  tag: string;
  college: string;
  image: string;
  desc?: string;
}

const events: EventType[] = eventsData;


  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const colleges = Array.from(new Set(events.map((e) => e.college)));


 // Using imported events data
  type SortOption = "alpha" | "price-asc" | "price-desc";
  const [selectedSort, setSelectedSort] = useState<SortOption>("alpha");
  const [selectedCollege, setSelectedCollege] = useState<string>("all");

  const parsePrice = (p: string) => Number(p.replace(/[^0-9.-]+/g, "")) || 0;

  const displayedEvents = events
    .filter((e) => (selectedCollege === "all" ? true : e.college === selectedCollege))
    .slice()
    .sort((a, b) => {
      if (selectedSort === "alpha") return a.title.localeCompare(b.title);
      if (selectedSort === "price-asc") return parsePrice(a.price) - parsePrice(b.price);
      if (selectedSort === "price-desc") return parsePrice(b.price) - parsePrice(a.price);
      return 0;
    });

  const EventCard = ({ event, onClick }: { event: EventType; onClick?: () => void }) => {
    return (
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        className="relative bg-gradient-to-br from-slate-900/40 to-indigo-900/30 border border-purple-400/20 rounded-xl p-3 cursor-pointer hover:scale-[1.01] hover:shadow-lg transition-transform duration-150"
      >
        <div className="absolute top-3 right-3 text-xs font-mono px-2 py-1 bg-black/50 backdrop-blur rounded-full border border-white/10">
          {event.tag}
        </div>

        <div className="w-full h-32 rounded-md overflow-hidden mb-3 bg-gradient-to-tr from-purple-800/20 to-indigo-800/10 flex items-center justify-center">
          <Image src={event.image} alt={event.title} width={80} height={80} className="opacity-90" />
        </div>

        <div className="font-semibold text-sm text-white mb-1 truncate">{event.title}</div>
        <div className="text-xs text-purple-200 font-mono">{event.price}</div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black text-white overflow-hidden relative"
    >
     

      <div className="fixed inset-0">
        <StarField />
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

      {/* Loading Screen */}
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
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
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
      {/* EVENTS GRID */}
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
              <label className="text-xs font-mono text-purple-300 mr-2">Sort</label>
              <select
  value={selectedSort}
  onChange={(e) => setSelectedSort(e.target.value as SortOption)}
  className="bg-black/50 text-white px-3 py-2 rounded-md border border-white/10 font-mono text-sm"
>
  <option value="all">All</option>
    <option value="alpha">Alphabetical</option>
    <option value="price-asc">Price: Low → High</option>
    <option value="price-desc">Price: High → Low</option>
</select>


              <label className="text-xs font-mono text-purple-300 ml-4 mr-2">College</label>
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="bg-black/50 text-white px-3 py-2 rounded-md border border-white/10 font-mono text-sm"
              >
                <option value="all">All</option>
                 {colleges.map((college) => (
    <option key={college} value={college}>
      {college}
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

      {/* EVENT DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={(open) => {
        if(!open) setSelectedEvent(null);
        setDialogOpen(open);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title ?? 'Event Details'}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-40 h-40 bg-slate-800 rounded-md flex items-center justify-center">
              {selectedEvent && (
                <Image src={selectedEvent.image} alt={selectedEvent.title} width={112} height={112} />
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm text-purple-200 font-mono mb-2">{selectedEvent?.price}</div>
              <DialogDescription>
                {selectedEvent?.desc}
              </DialogDescription>
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-2 mt-4">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md font-mono">Register</button>
              <DialogClose>
                <button className="px-4 py-2 bg-gray-800 text-white rounded-md font-mono">Close</button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* CONTACT SECTION */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-purple-300 text-lg mb-4 flex items-center justify-center gap-2">
              📡 COMMUNICATION_PORTAL.INIT
            </div>
            <h2 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              Establish Cosmic Link
            </h2>
            <p className="text-xl text-blue-200 font-mono mb-12">
              🌌 Initialize direct quantum communication with mission control 🌌
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  protocol: "QUANTUM EMAIL",
                  channel: "contact@cosmicgateway.tech",
                  status: "ACTIVE",
                  icon: "📧",
                },
                {
                  protocol: "STELLAR VOICE",
                  channel: "+91 1111111111",
                  status: "STANDBY",
                  icon: "📞",
                },
                {
                  protocol: "COORDINATES",
                  channel: "[TCET], [MUMBAI]",
                  status: "FIXED",
                  icon: "🗺️",
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm 
                           border border-purple-400/30 p-6 rounded-xl shadow-lg shadow-purple-500/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(139, 69, 249, 0.6)",
                    boxShadow: "0 0 30px rgba(139, 69, 249, 0.3)",
                  }}
                >
                  <div className="text-4xl mb-3">{contact.icon}</div>
                  <div className="font-mono text-xs text-purple-300 mb-3">
                    {contact.protocol}
                  </div>
                  <div className="text-purple-100 mb-3 font-mono text-sm">
                    {contact.channel}
                  </div>
                  <div
                    className={`inline-block px-2 py-1 font-mono text-xs border rounded-lg ${
                      contact.status === "ACTIVE"
                        ? "border-green-400 text-green-300 bg-green-400/10"
                        : contact.status === "STANDBY"
                        ? "border-yellow-400 text-yellow-300 bg-yellow-400/10"
                        : "border-purple-400 text-purple-300 bg-purple-400/10"
                    }`}
                  >
                    {contact.status}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <CosmicButton variant="primary" className="text-lg px-12 py-4">
                🌟 INITIATE_CONTACT
              </CosmicButton>
              <CosmicButton variant="secondary" className="text-lg px-12 py-4">
                📡 SUBSCRIBE_UPDATES
              </CosmicButton>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CosmicGateway;
