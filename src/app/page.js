"use client";

import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Newz from "@/components/sections/News";
import HowWeWork from "@/components/sections/HowWeWork";
import Sectors from "@/components/sections/Sectors";
import Services from "@/components/sections/Services";
import Footer from "@/components/sections/Footer";
import OfficeBariers from "@/components/sections/OfficeBariers";
import ContactPage from "./contact/page";
import OurVision from "@/components/sections/OurVision";

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Require both: the page has fired 'load' and a minimum display time has elapsed.
    const MIN_MS = 2000;
    let minTimer = null;
    let loadListenerAdded = false;
    const isLoadedRef = { current: false };
    const minElapsedRef = { current: false };

    const tryHide = () => {
      if (isLoadedRef.current && minElapsedRef.current) {
        setLoading(false);
      }
    };

    const onLoad = () => {
      isLoadedRef.current = true;
      tryHide();
    };

    // If document already loaded, mark as loaded but still wait for min timer
    if (document.readyState === "complete") {
      isLoadedRef.current = true;
    } else {
      window.addEventListener("load", onLoad);
      loadListenerAdded = true;
    }

    minTimer = setTimeout(() => {
      minElapsedRef.current = true;
      tryHide();
    }, MIN_MS);

    return () => {
      if (loadListenerAdded) window.removeEventListener("load", onLoad);
      if (minTimer) clearTimeout(minTimer);
    };
  }, []);

  return (
    <div className="bg-white relative">
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white h-screen w-screen">
          <LoadingSpinner />
        </div>
      )}

      <Hero />
      <Newz />
      <About />
      <OurVision />
      <HowWeWork />
      <Sectors />
      <Services />
      <OfficeBariers />
      <ContactPage />
      <Footer />
    </div>
  );
}










































































//DEVELOPED BY - ARPIT SHUKLA, PALLAVI PATEL