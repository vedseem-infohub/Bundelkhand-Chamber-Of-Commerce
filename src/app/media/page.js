"use client";
import React, { useState } from "react";
import Nav from "@/components/sections/Nav";
import Image from "next/image";
import Footer from "@/components/sections/Footer";
import { motion, AnimatePresence } from "framer-motion";

function Page() {
  const media = [
    {
      img: "/mediabottom-1.jpg",
      description: "Meeting with minister of state",
      hoverImages: ["/mediabottom-1a.jpeg", "/mediabottom-1b.jpg", "/mediabottom-1c.jpg"],
    },
    {
      img: "/mediabottom-2.jpg",
      description: "Industrial area visit by senior office",
      hoverImages: ["/mediabottom-2.jpg","/mediabottom-2a.jpeg"],
    },
    {
      img: "/mediabottom-3.jpg",
      description: "Business summit in presence of Uma Bharti & Satish Mahana",
      hoverImages: ["/mediabottom-3a.jpeg", "/mediabottom-3b.jpeg", "/mediabottom-3c.jpeg", "mediabottom-3d.jpeg"],
    },
    {
      img: "/mediabottom-4.jpg",
      description: "Excellence award by Bundelkhand Chamber Of Commerce to various industrialist",
      hoverImages: ["/mediabottom-4a.jpeg", "/mediabottom-4b.jpeg", "/mediabottom-4c.jpeg"],
    },
    {
      img: "/mediabottom-5.jpg",
      description: "Clean jhansi green jhansi campaign",
      hoverImages: ["/mediabottom-5a.jpeg", "/mediabottom-5b.jpeg"],
    },
    {
      img: "/mediabottom-6.jpg",
      description: "Agro summit",
      hoverImages: [""],
    },
    {
      img: "/Newzr11.jpeg",
      description: "MSME Gathering",
      hoverImages: [ "/Newzr11.jpeg","/Newzr11-a.jpeg", "/Newzr11-c.jpeg"],
    },
    {
      img: "/Newzr12.jpeg",
      description: "MSME SUMMIT",
      hoverImages: ["/Newzr13.jpeg", "/Newzr14.jpeg", "/mediabottom-1c.jpg"],
    },
    {
      img: "/mediabottom-8.jpeg",
      description: "MSME SUMMIT, Kanpur - Chief Guest - Hon'ble Mr. Dheeraj Khullar",
      hoverImages: ["/mediabottom-8-1.jpeg", "/mediabottom-8-2.jpeg", "/mediabottom-8-3.jpeg"],
    },
    {
      img: "/mediabottom-9.jpeg",
      description: "Regional Level GEM Workshop, Jhansi Region",
      hoverImages: ["/mediabottom-9a.jpeg", "/mediabottom-9b.jpeg", "/mediabottom-9c.jpeg"],
    },
  ];

  const [expanded, setExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
 const [hoveredImageIndices, setHoveredImageIndices] = useState(
  Array(media.length).fill(0)
);
const [intervalIds, setIntervalIds] = useState(Array(media.length).fill(null));

  // Handle hover to cycle images
const handleMouseEnter = (index) => {
  // Clear previous interval if exists
  if (intervalIds[index]) clearInterval(intervalIds[index]);

  let i = hoveredImageIndices[index]; // start from current index
  const interval = setInterval(() => {
    i = (i + 1) % media[index].hoverImages.length;
    setHoveredImageIndices((prev) => {
      const copy = [...prev];
      copy[index] = i;
      return copy;
    });
  }, 2000); // 2 seconds per image

  setIntervalIds((prev) => {
    const copy = [...prev];
    copy[index] = interval;
    return copy;
  });
};

const handleMouseLeave = (index) => {
  clearInterval(intervalIds[index]);
  setIntervalIds((prev) => {
    const copy = [...prev];
    copy[index] = null;
    return copy;
  });
  setHoveredImageIndices((prev) => {
    const copy = [...prev];
    copy[index] = 0;
    return copy;
  });
};


  return (
    <div>
      <Nav />

      {/* Heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center md:mt-10 mt-45"
      >
        <h1 className="inline-block text-4xl font-extrabold text-orange-500 mb-10 after:content-[''] after:block after:h-[5px] after:w-[60%] after:bg-orange-500 after:mx-auto after:mt-0 after:rounded-full">
          Media
        </h1>
      </motion.div>

      {/* Top Static Row */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 px-4 md:mt-10 mb-10">
        <div className="flex flex-col md:flex-row items-center bg-white p-0 rounded-2xl shadow-xl max-w-3xl w-full md:w-auto h-auto md:h-[258px]">
          <Image
            src="/Newz1.png"
            alt="Event"
            width={400}
            height={200}
            className="rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none w-full md:h-[258px] md:w-auto object-cover"
          />
          <div className="p-4 text-left">
            <h2 className="text-xl font-semibold mb-5 text-black">MSME Summit</h2>
            <p className="text-sm text-gray-600">
              The Bundelkhand Chamber of Commerce and Industry successfully organized the MSME Summit on 15th February 2023 at Jhansi. The event brought together entrepreneurs, policymakers, bankers, and industry experts to discuss the growth potential of Micro, Small, and Medium Enterprises in the Bundelkhand region.
            </p>
            <p className="text-xs text-gray-500 mt-2 text-right">February 15, 2023</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full md:w-[300px] h-[300px]">
          <Image
            src="/mediabottom-7.jpg"
            alt="Collaboration"
            width={300}
            height={200}
            className="object-cover w-full h-[70%]"
          />
          <div className="bg-orange-500 text-white p-2 text-center font-medium h-[30%] flex items-center justify-center">
            Hop & hop off Buses
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-1 md:px-0">
      <motion.div
        initial={{ height: 390 }}
        animate={{ height: expanded ? "auto" : 390 }}
        transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
        className="relative md:px-20 w-full mt-20 mb-20 lg:mb-0 overflow-hidden no-scrollbar"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`${
            expanded
              ? "lg:flex lg:flex-row lg:flex-wrap lg:justify-center  flex justify-between flex-wrap gap-y-2 md:gap-y-5 md:gap-15"
              : "animate-marquee whitespace-nowrap flex gap-4 sm:gap-8 h-fit"
          }`}
        >
          {media.map((card, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="bg-white flex-shrink-0 hover:bg-orange-400 hover:cursor-pointer text-black hover:text-white rounded-2xl shadow-lg w-[170px] sm:w-[280px] md:w-[300px] h-[230px] md:h-[260px] hover:scale-105 mt-4 flex flex-col justify-center items-center overflow-hidden transition-transform duration-300 ease-in-out group"
            >
              <div className="relative h-[75%] w-full p-2 group-hover:p-3 overflow-hidden">
                <AnimatePresence mode="wait">
                  {hoveredImageIndices[index] !== 0 || hoveredIndex === index ? (
                    <motion.div
                      key={hoveredImageIndices[index]}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={card.hoverImages[hoveredImageIndices[index]]}
                        alt={`Media ${index + 1}`}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </motion.div>
                  ) : (
                    <Image
                      src={card.img}
                      alt={`Media ${index + 1}`}
                      fill
                      className="object-cover rounded-xl"
                    />
                  )}
                </AnimatePresence>
              </div>
          
              <div className="h-[25%] md:px-4 px-1 text-center flex items-center justify-center text-[10px] md:text-sm md:font-medium text-wrap">
                {card.description}
              </div>
            </motion.div>
          ))}

        </motion.div>

        {/* Toggle Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center items-center mt-6 mb-10"
        >
          <button
            onClick={() => {
              if (expanded) {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => setExpanded(false), 300);
              } else {
                setExpanded(true);
              }
            }}
            className="bg-orange-500 hover:cursor-pointer hover:bg-orange-600 transition-all duration-300 text-white text-lg md:text-xl font-semibold rounded-full px-6 py-2 mt-6 shadow-md"
          >
            {expanded ? "Show Less" : "View All"}
          </button>
        </motion.div>
      </motion.div>
      </div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Footer />
      </motion.div>
    </div>
  );
}

export default Page;
