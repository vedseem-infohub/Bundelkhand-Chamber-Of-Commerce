"use client";
import React, { useEffect, useState } from "react";
import "./news.css";
import { BASE_URL, ENDPOINTS } from "@/config/api";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const defaultNewsItems = [
  { src: "/Newz1.png", desc: "Honourable Minister of State for Industry Respected Shri Bhanu Pratap Verma Ji" },
  { src: "/Newz2.png", desc: "Ground Breaking Ceremony of Invest in UP" },
  { src: "/Newz3.png", desc: "Honouring our Divisional Commissioner for his contribution towards development of Bundelkhand" },
  { src: "/Newz4.png", desc: "Corona Vaccination Drive at Bijauli, Jhansi" },
  { src: "/Newzr1.jpg", desc: "Business meet to discuss wellfare of Bundelkhand" },
  { src: "/Newzr2.jpg", desc: "MLA Ravi Sharma came to discuss their ideas for development of Bundelkhand" },
  { src: "/Newzr3.jpg", desc: "All businessmen comes together to support the development of Bundelkhand" },
  { src: "/Newzr4.jpg", desc: "MLA Anurag Sharma showed us the right path for development of Bundelkhand" },
  { src: "/Newzr5.jpeg", desc: "Showcasing Presentation Of BIDA" },
  { src: "/Newzr6.jpeg", desc: "Discussion Over BIDA Project" }
];

function resolveImageUrl(url) {
  if (!url) return "/Newz5.jpeg";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  if (url.startsWith("/uploads/")) {
    return `${BACKEND_URL}${url}`;
  }
  return url;
}

export default function News() {
  const [eventData, setEventData] = useState(null);
  const [leftImages, setLeftImages] = useState(defaultNewsItems.slice(0, 5));
  const [rightImages, setRightImages] = useState(defaultNewsItems.slice(5, 10));
  const [middleHighlight, setMiddleHighlight] = useState({
    src: "/Newz5.jpeg",
    title: "MSME for Bharat",
    desc: "At the MSME for Bharat Conclave, BCCI President Mr. Dheeraj Khullar highlighted the key challenges faced by traders and small businesses. He emphasized the need for better access to credit, simplified regulatory processes, and stronger market linkages to empower entrepreneurs across the country."
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchLatestEvent() {
      try {
        const res = await fetch(`${BASE_URL}${ENDPOINTS.EVENTS_LATEST}`);
        if (!res.ok) return;
        const result = await res.json();

        if (result.success && result.data && isMounted) {
          const ev = result.data;
          setEventData(ev);

          // 1 Middle Highlight Image
          const highlightUrl = ev.highlightImage?.url || "/Newz5.jpeg";
          setMiddleHighlight({
            src: resolveImageUrl(highlightUrl),
            title: ev.title || "MSME for Bharat",
            desc: ev.description || ev.highlightImage?.caption || ""
          });

          // Left Images (up to 5)
          if (ev.leftImages && ev.leftImages.length > 0) {
            setLeftImages(
              ev.leftImages.slice(0, 5).map(img => ({
                src: resolveImageUrl(img.url),
                desc: img.caption || ev.title
              }))
            );
          }

          // Right Images (up to 5)
          if (ev.rightImages && ev.rightImages.length > 0) {
            setRightImages(
              ev.rightImages.slice(0, 5).map(img => ({
                src: resolveImageUrl(img.url),
                desc: img.caption || ev.title
              }))
            );
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest event for news section, using fallback:", err);
      }
    }

    fetchLatestEvent();

    return () => {
      isMounted = false;
    };
  }, []);

  // Duplicate items for continuous smooth ticker animation
  const buildScrollList = (items) => {
    if (!items || items.length === 0) return [];
    if (items.length === 1) return [...items, ...items, ...items, ...items];
    if (items.length <= 3) return [...items, ...items, ...items];
    return [...items, ...items];
  };

  const scrollLeftItems = buildScrollList(leftImages);
  const scrollRightItems = buildScrollList(rightImages);

  return (
    <section className="max-w-[1400px] mt-20 mx-auto px-4 sm:px-6 overflow-hidden">
      {/* Heading */}
      <div className="flex justify-center mt-4 mb-4">
        <div className="md:bg-orange-500 md:text-white inline-block text-orange-400 mt-5 font-extrabold text-2xl sm:text-xl py-2 px-6 sm:px-7 md:rounded after:content-[''] after:block after:h-[4px] after:w-[70%] after:bg-orange-500 after:mx-auto after:mt-0 after:rounded-full">
          News
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col gap-6 lg:hidden">
        {leftImages.map((item, i) => (
          <NewsCard key={`mobile-left-${i}`} img={item.src} desc={item.desc} />
        ))}

        {/* Main News - Middle Highlight */}
        <div className="text-center px-1 my-2 bg-orange-50/40 p-4 rounded-2xl border border-orange-200">
          <div className="relative overflow-hidden rounded-xl mb-3 shadow-md">
            <img
              src={middleHighlight.src}
              alt={middleHighlight.title}
              className="w-full max-h-[350px] object-cover rounded-xl border border-gray-200"
            />
            <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
              Latest Event
            </span>
          </div>
          <h2 className="text-[20px] font-extrabold text-black mb-2">
            {middleHighlight.title}
          </h2>
          <p className="text-[14px] text-gray-700 leading-relaxed">
            {middleHighlight.desc}
          </p>
        </div>

        {rightImages.map((item, i) => (
          <NewsCard key={`mobile-right-${i}`} img={item.src} desc={item.desc} />
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-row gap-6 h-[90vh] overflow-hidden">
        {/* Left Scroll (up to 5 images) */}
        <div className="w-1/4 overflow-hidden h-full">
          <div className="scroll-container h-full">
            <div className="scroll-content">
              {scrollLeftItems.map((item, i) => (
                <NewsCard key={`desk-left-${i}`} img={item.src} desc={item.desc} />
              ))}
            </div>
          </div>
        </div>

        {/* Middle Highlight - 1 Image */}
        <div className="w-1/2 text-center border-x-4 flex flex-col justify-center items-center border-orange-500/80 px-8 py-8 overflow-y-auto no-scrollbar bg-gradient-to-b from-white via-orange-50/30 to-white">
          <div className="relative w-full overflow-hidden rounded-xl mb-4 shadow-lg group">
            <img
              src={middleHighlight.src}
              alt={middleHighlight.title}
              className="w-full max-h-[420px] object-cover rounded-xl border-2 border-gray-200 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow">
              Latest Highlight
            </div>
          </div>
          <h2 className="text-[24px] font-extrabold text-black mb-3">
            {middleHighlight.title}
          </h2>
          <p className="text-[14px] text-gray-700 leading-relaxed max-w-xl">
            {middleHighlight.desc}
          </p>
          <style jsx>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>

        {/* Right Scroll (up to 5 images) */}
        <div className="w-1/4 overflow-hidden h-full">
          <div className="scroll-container h-full">
            <div className="scroll-content">
              {scrollRightItems.map((item, i) => (
                <NewsCard key={`desk-right-${i}`} img={item.src} desc={item.desc} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsCard({ img, desc }) {
  return (
    <div className="text-left mb-4 sm:mb-6 px-1 group">
      <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-sm mb-2">
        <img
          src={img}
          alt="news"
          className="w-full h-60 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="text-[13px] md:text-[14px] text-gray-700 leading-snug line-clamp-3">
        {desc}
      </p>
    </div>
  );
}
