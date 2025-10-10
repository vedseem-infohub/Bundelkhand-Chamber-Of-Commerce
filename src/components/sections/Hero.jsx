"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "./Nav";
import Link from "next/link"; // ✅ Step 1: Import Link
import LoadingSpinner from "../ui/LoadingSpinner";

const images = [
  {
    src: "/hero2.jpeg",
    heading: (
      <>
        Bundelkhand Means <br /> Business
      </>
    ),
    button: "Become a Member",
    link: "/join-us",
  },
  {
    src: "/hero3.jpeg",
    heading: (
      <>
        Where Business Meets  <br />  Opportunity.
      </>
    ),
    button: "Explore Services",
    link: "/services",
  },
  {
    src: "/hero1.jpg",
    heading: (
      <>
        Bundelkhand Your Gateway <br /> to Growth
      </>
    ),
    button: "Join Us Today",
    link: "/membership", 
  },
  {
    src: "/hero4.jpeg",
    heading: (
      <>
        Empowering Businesses <br /> in Bundelkhand
      </>
    ),
    button: "Join Growth Movement",
    link: "/membership",
  },
  {
    src: "/hero5.jpeg",
    heading: (
      <>
        Networking for Growth <br /> & Innovation
      </>
    ),
    button: "Connect & Innovate",
    link: "/join-us",
  },

];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      // already loaded
      setLoading(false);
      return;
    }

    window.addEventListener("load", handleLoad);
    // Fallback timeout in case 'load' doesn't fire quickly
    const t = setTimeout(() => setLoading(false), 1500);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-[100vh]">
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white h-screen w-screen pointer-events-auto">
          <LoadingSpinner />
        </div>
      )}
      {/* ✅ Keep Nav on top */}
      <Nav />


      {/* ✅ Mobile Heading separate (can also move inside flex-grow) */}
      <h1 className="md:hidden mt-35 text-4xl font-bold text-black text-left z-20 px-5">
        For<br />business.<br />For you.
      </h1>


      {/* ✅ Hero wrapper with flex-grow */}
      <div className="flex-grow flex items-center justify-center">
        <div className="lg:px-20 md:px-10 px-5 w-full">
          <div className="relative w-full md:h-[400px] lg:h-[450px] xl:h-[470px] h-[400px] overflow-hidden md:rounded-3xl rounded-sm">
            <AnimatePresence mode="wait">
              <motion.img
                key={images[index].src}
                src={images[index].src}
                alt={`Hero ${index}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>

            {/* Overlay Content */}
            <div className="absolute inset-0 hidden md:flex flex-col justify-between p-8 text-white z-10">
              <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
                {images[index].heading}
              </h1>
              <Link href={images[index].link}>
                <button className="bg-orange-500 px-6 py-3 rounded shadow hover:bg-orange-600 w-fit">
                  {images[index].button}
                </button>
              </Link>
            </div>

            {/* Dots */}
            <div className="absolute bottom-5 w-full flex justify-center gap-2 z-20">
              {images.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`md:h-3 md:w-3 w-2 h-2 rounded-full cursor-pointer ${
                    i === index ? "bg-orange-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
