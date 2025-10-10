"use client";
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingSpinner({ visible, isVisible } = {}) {
  // Accept either prop name to avoid mismatches across pages
  const show = typeof visible === "boolean" ? visible : typeof isVisible === "boolean" ? isVisible : true;

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          role="status"
          aria-label="Loading"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="flex gap-5 justify-center items-center w-96 h-96 rounded-2xl"
        >
          <motion.div
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="flex-shrink-0"
          >
            <Image src="/logo.png" alt="Loading logo" width={120} height={120} priority />
          </motion.div>

          <div className="sm:block ml-2 flex-1 text-nowrap">
            <h1 className="uppercase font-bold text-black text-sm md:text-xl lg:text-2xl md:leading-2 lg:leading-5">
              bundelkhand chamber <br />
              <span className="text-blue-400 text-sm sm:text-base md:text-lg lg:text-xl">of commerce & industry</span>
            </h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
