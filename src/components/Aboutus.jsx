"use client";
import { cn } from "../lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

import { motion } from "framer-motion";
// import { RiSteamFill, RiTeamFill, RiTeamLine } from "react-icons/ri";
import { useState, useEffect } from "react";
// import { FaUsers, FaClipboardList, FaTools } from "react-icons/fa";
// import Image from "next/image";
export function BentoGridThirdDemo() {
  return (
    <section id="About">
      <div className="container px-5 my-20 z-10 relative before:absolute before:bg-gradient-to-b from-purple-600 via-purple-950 to-black  before:-inset-2 before:-z-10 before:blur-3xl before:round-[inherit]">
        <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[30rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn("[&>p:text-lg]", item.className)}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

//   const variants = {
//     initial: {
//       x: 0,
//     },
//     animate: {
//       x: 10,
//       rotate: 5,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };
//   const variantsSecond = {
//     initial: {
//       x: 0,
//     },
//     animate: {
//       x: -10,
//       rotate: -5,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   return (
//     <motion.div
//       initial="initial"
//       whileHover="animate"
//       className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 justify-center items-center"
//     >
//       <div className="flex flex-col items-start text-left gap-2">
//         <p className="text-5xl flex flex-col gap-2 md:text-4xl lg:text-5xl font-bold text-white">
//           Redefining
//           <p className="bg-gradient-to-r from-orange-500 to-purple-800 bg-clip-text text-transparent">
//             Norms
//           </p>
//         </p>
//         <p className="text-5xl font-bold text-white">Through</p>
//         <p className="text-5xl md:text-4xl lg:text-5xl font-bold text-white mt-2">
//           Intelligence
//         </p>
//       </div>
//     </motion.div>
//   );
// };

const SkeletonOne = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial="initial"
      animate={hovered ? "hover" : "initial"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 justify-center items-center relative overflow-hidden"
    >
      <motion.div
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`absolute rounded-sm  inset-0 sm:overflow-y-scroll md:overflow-y-hidden  bg-opacity-80 flex justify-center items-start text-white p-4 ${
          hovered ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <p className="lg:text-xl text-sm text-justify">
          Ever since it was first organized in 2004, Zephyr has been the most
          awaited event among the students of Thakur College of Engineering and
          Technology. This technical festival aims at providing students with a
          platform to enhance their technical skills. Each Year with a new
          edition, Zephyr brings new events such as workshops on in-demand
          technology and skills along with gaming tournaments and fun events.
          The theme of Zephyr'25 is Spectrum of Innovation. The time traveler,
          equipped with knowledge about the time period they wish to visit,
          steps into the machine. The interior is filled with an array of
          flashing lights, complex instruments, and a central control panel.
          After entering the desired date and time into the control panel, the
          traveler activates the machine.{" "}
        </p>
      </motion.div>

      <motion.div
        variants={{
          initial: { opacity: 1 },
          hover: { opacity: 0 },
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex flex-col gap-2 "
      >
        <p className="text-3xl flex  gap-2 md:text-4xl lg:text-5xl font-bold text-white">
          Cosmic
          <span className="bg-gradient-to-r from-orange-500 to-purple-800 bg-clip-text text-transparent">
            Zepyr
          </span>
        </p>
        <div>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Through
          </p>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2">
            Intelligence
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial="initial"
      animate={hovered ? "hover" : "initial"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col justify-center items-center relative overflow-hidden"
    >
      {/* Text Overlay on Hover */}
      <motion.div
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`absolute inset-0 rounded-sm  bg-opacity-80 flex justify-center items-center text-white p-4 ${
          hovered ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <p className="lg:text-lg text-sm  text-justify">
          The TCET Student Development and Welfare Association (TSDW),
          established in 2004-05 under the guidelines of Mumbai University,
          serves as a dynamic platform for creativity, innovation, and holistic
          growth. Commonly known as the Student Council, TSDW represents the
          student body and spearheads flagship events
        </p>
      </motion.div>

      {/* Image Section */}
      <motion.div
        variants={{
          initial: { opacity: 1 },
          hover: { opacity: 0 },
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative"
      >
        <img
          src="./TSDW.png"
          alt="Logo"
          className="max-w-full h-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
        />
      </motion.div>
    </motion.div>
  );
};

export default SkeletonFive;

const items = [
  {
    title: "Zephyr 2025",
    description: (
      <span className="text-sm">
        Where Ideas Ignite, spreading an endless technical exposure
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-2",
    // icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "TSDW ",
    description: (
      <span className="text-sm">Thakur Student Development Welfare.</span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    // icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
