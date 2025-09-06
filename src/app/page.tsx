"use client";
import React, { useState, useEffect, useRef } from "react";
import Footer from "./components/footer";
import { WobbleCard } from "../components/ui/wobble-card";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { BentoGridThirdDemo } from "@/components/Aboutus";
import { InfiniteMovingCardsDemo, InfiniteRightMovingCardsDemo } from "@/components/Sponsors";

const CosmicGateway = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [stellarPulse, setStellarPulse] = useState(false);
  const [systemStatus, setSystemStatus] = useState("INITIALIZING");
  // const [activeTimeline, setActiveTimeline] = useState(0); TIMELINE SECTION PENDING
  const [openFaq, setOpenFaq] = useState(-1);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

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



  const glimpses = [
    {
      title: "Previous Mission Log",
      type: "HOLO_ARCHIVE",
      size: "2.4 PB",
      image:"/event2.webp",
      icon: "📡",
    },
    {
      title: "Tech Deployment",
      type: "QUANTUM_DATA",
      size: "847 TB",
      image:"/event52.webp",
      icon: "🛸",
    },
    {
      title: "Cosmic Integration",
      type: "STELLAR_RECORD",
      size: "1.2 PB",
      image:"/event3.webp",
      icon: "🌟",
    },
    {
      title: "Universe Analysis",
      type: "SPACE_VIZ",
      size: "564 TB",
      image:"/event54.webp",
      icon: "🪐",
    },
  ];

 const faqs = [
  {
    q: "What is Zephyr?",
    a: "Zephyr is a 3-day annual techno-cultural festival featuring a blend of technical, non-technical, cultural, and fun events. It’s a platform where students can showcase talent, creativity, and innovation.",
  },
  {
    q: "Who can participate?",
    a: "Zephyr is open to students from all colleges and disciplines. Whether you’re into tech, arts, management, or cultural activities, there’s an event for everyone.",
  },
  {
    q: "How do I register?",
    a: "Participants can register online through the Zephyr portal. Simply choose your events, and complete the registration process.",
  },
  {
    q: "What are the prizes?",
    a: "Zephyr has an overall prize pool of more than ₹5 Lakhs. Winners also receive certificates, goodies, and exclusive opportunities for recognition.",
  },
  {
    q: "Are there online events?",
    a: "Yes, Zephyr hosts both offline and online events. Some competitions allow remote participation, while cultural and flagship events are held on campus.",
  },
];


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

      {/* HERO SECTION */}
      <Navbar />
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-purple-950/60 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,69,249,0.08),transparent_60%)]" />

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <motion.div
          className="text-center z-20 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="font-mono text-gray-400 text-sm mb-6 flex items-center justify-center gap-3 tracking-[0.2em] uppercase"
            animate={
              stellarPulse
                ? {
                    opacity: [0.7, 1, 0.7],
                  }
                : {}
            }
          >
            <span className="w-6 h-px bg-gray-500"></span>
            PORTAL_ID: COSMIC_GATEWAY_2025
            <span className="w-6 h-px bg-gray-500"></span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 leading-none tracking-tight"
            style={{
              fontFamily: "monospace",
            }}
          >
            <motion.span
              className="block text-gray-100 mb-2"
              style={{
                textShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
              }}
            >
            TSDW Presents
            </motion.span>
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-gray-200 to-purple-600"
              animate={
                stellarPulse
                  ? {
                      filter: [
                        "brightness(1)",
                        "brightness(1.2)",
                        "brightness(1)",
                      ],
                    }
                  : {}
              }
            >
              Zephyr 2025
            </motion.span>
          </motion.h1>

          <motion.div
            className="font-mono text-base mb-3 text-gray-300 flex items-center justify-center gap-3 tracking-[0.15em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-purple-400">▸</span> INTERDIMENSIONAL
            TECHNOLOGY SYMPOSIUM
          </motion.div>

          <motion.div
            className="font-mono text-sm text-gray-400 mb-16 flex items-center justify-center gap-3 tracking-[0.1em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
            25-27.September.2025 | [TCET] | MISSION_CRITICAL
            <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
           
              <Link href={"/zephyr-events"}>
              <CosmicButton
              variant="secondary"
              className="text-sm tracking-[0.1em] uppercase"
            >
              Book Event
            </CosmicButton>
              </Link>
          </motion.div>
        </motion.div>

        {/* Central Cosmic Portal */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            x: useTransform(mouseX, [-500, 500], [-30, 30]),
            y: useTransform(mouseY, [-500, 500], [-30, 30]),
          }}
        >
          <motion.div
            className="relative w-96 h-96"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {/* Outer orbital rings */}
            <div className="absolute inset-0 border border-purple-400/30 rounded-full" />
            <div className="absolute inset-8 border border-blue-400/40 rounded-full transform rotate-45" />
            <div className="absolute inset-16 border border-pink-400/50 rounded-full transform -rotate-45" />

            {/* Central cosmic core */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                         w-32 h-32 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(139, 69, 249, 0.5)",
                  "0 0 80px rgba(139, 69, 249, 0.8)",
                  "0 0 30px rgba(139, 69, 249, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Orbiting particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-white rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: `${80 + i * 20}px 0`,
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT US SECTION */}
       <BentoGridThirdDemo />
    

      {/* TIMELINE SECTION */}
      {/* <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-purple-300 text-lg mb-4 flex items-center gap-2">
              📅 MISSION_TIMELINE.COSMOS
            </div>
            <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
              Stellar Schedule
            </h2>
            <p className="text-xl text-blue-200 font-mono">
              Four-dimensional mission phases
            </p>
          </motion.div>

          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                className="relative bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm 
                         border border-purple-400/30 hover:border-purple-400/60 transition-all duration-500 rounded-xl
                         shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 15, scale: 1.02 }}
              >
                <div className="p-8 flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <div className="text-6xl">{event.icon}</div>
                    <div className="text-center">
                      <div className="font-mono text-2xl text-purple-300 mb-1">
                        {event.date}
                      </div>
                      <div className="font-mono text-sm text-blue-300">
                        {event.time}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-purple-100 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-blue-200 font-mono text-sm">
                        {event.desc}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`px-4 py-2 font-mono text-xs border rounded-lg ${
                      event.status === "READY"
                        ? "border-green-400 text-green-300 bg-green-400/10"
                        : event.status === "PENDING"
                        ? "border-yellow-400 text-yellow-300 bg-yellow-400/10"
                        : event.status === "QUEUED"
                        ? "border-blue-400 text-blue-300 bg-blue-400/10"
                        : "border-purple-400 text-purple-300 bg-purple-400/10"
                    }`}
                  >
                    {event.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* SPONSORS SECTION */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-purple-950/20 to-indigo-950/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-purple-300 text-lg mb-4 flex items-center gap-2">
              🤝 GALACTIC_ALLIANCES.DB
            </div>
            <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              Cosmic Partners
            </h2>
            <p className="text-xl text-blue-200 font-mono">
            Sponsors from last edition
            </p>
          </motion.div>

        <InfiniteMovingCardsDemo />
        <InfiniteRightMovingCardsDemo />
        </div>
      </section>

      {/* GLIMPSE SECTION */}
      {/* <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-purple-300 text-lg mb-4 flex items-center gap-2">
              📚 COSMIC_ARCHIVES.LOG
            </div>
            <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              Stellar Archives
            </h2>
            <p className="text-xl text-blue-200 font-mono">
            A glimpse into our previous journeys
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {glimpses.map((glimpse, index) => (
              <motion.div
                key={index}
                className="group bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm 
                         border border-purple-400/30 hover:border-purple-400/60 overflow-hidden 
                         transition-all duration-500 rounded-xl shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, rotateX: 10 }}
              >
                <div
                  className="aspect-video bg-gradient-to-br from-purple-800/30 to-blue-800/30 
                              flex items-center justify-center border-b border-purple-400/30"
                >
                  <Image fill src={glimpse.image} alt={glimpse.title} className="text-6xl object-cover" />
                </div>
                <div className="p-4">
                  <div className="font-mono text-xs text-purple-300 mb-2">
                    {glimpse.type}
                  </div>
                  <h3 className="text-lg font-semibold text-purple-100 mb-2 group-hover:text-purple-300 transition-colors">
                    {glimpse.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-blue-300">
                      {glimpse.size}
                    </span>
                    <span className="font-mono text-xs text-green-400">
                      🟢 ACCESSIBLE
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ SECTION */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-indigo-950/20 to-purple-950/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-purple-300 text-lg mb-4 flex items-center gap-2">
              ❓ COSMIC_DATABASE.QUERY
            </div>
            <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
              Universal Queries
            </h2>
            <p className="text-xl text-blue-200 font-mono">
              Frequently transmitted information
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm 
                         border border-purple-400/30 overflow-hidden rounded-xl shadow-lg shadow-purple-500/10"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.button
                  className="w-full p-6 text-left flex items-center justify-between 
                           hover:bg-purple-800/30 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  whileHover={{ x: 10 }}
                >
                  <h3 className="text-lg font-semibold text-purple-100 font-mono">
                    {faq.q}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 90 : 0 }}
                    className="text-2xl text-purple-300 font-mono"
                  >
                    🚀
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-blue-200 font-mono text-sm border-t border-purple-400/30">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="Contact" className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-purple-300 text-lg mb-4 flex items-center justify-center gap-2">
              📡 COMMUNICATION_PORTAL
            </div>
            <h2 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              Contact us
            </h2>
            <p className="text-xl text-blue-200 font-mono mb-12">
              🌌 Initialize direct quantum communication with mission control 🌌
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  protocol: "QUANTUM EMAIL",
                  channel: "technicalteamtsdw@gmail.com",
                  status: "ACTIVE",
                  icon: "📧",
                },
                {
                  protocol: "Neel jain",
                  channel: "+91 7020976545",
                  status: "Outreach Advisory",
                  icon: "📞",
                },
                {
                  protocol: "Amitabh Dwivedi",
                  channel: "+91 8429051078",
                  status: "Technical Advisory",
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
              <Link href={"/zephyr-events"}>
              <CosmicButton variant="primary" className="text-lg px-12 py-4">
                🌟 Get Started
              </CosmicButton>
              </Link>
             
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CosmicGateway;
