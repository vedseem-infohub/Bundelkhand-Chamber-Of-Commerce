"use client";
import React, { useState, useEffect } from "react";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL, ENDPOINTS } from "@/config/api";
import { X, Calendar, Image as ImageIcon, ChevronRight } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const defaultMedia = [
  {
    id: "default-1",
    img: "/mediabottom-1.jpg",
    description: "Meeting with minister of state",
    hoverImages: ["/mediabottom-1a.jpeg", "/mediabottom-1b.jpg", "/mediabottom-1c.jpg"],
    allImages: [
      { url: "/mediabottom-1.jpg", caption: "Meeting with minister of state" },
      { url: "/mediabottom-1a.jpeg", caption: "Discussion on industrial development" },
      { url: "/mediabottom-1b.jpg", caption: "Key delegates" },
      { url: "/mediabottom-1c.jpg", caption: "MOU signing" }
    ]
  },
  {
    id: "default-2",
    img: "/mediabottom-2.jpg",
    description: "Industrial area visit by senior office",
    hoverImages: ["/mediabottom-2.jpg", "/mediabottom-2a.jpeg"],
    allImages: [
      { url: "/mediabottom-2.jpg", caption: "Industrial area inspection" },
      { url: "/mediabottom-2a.jpeg", caption: "Site briefing" }
    ]
  },
  {
    id: "default-3",
    img: "/mediabottom-3.jpg",
    description: "Business summit in presence of Uma Bharti & Satish Mahana",
    hoverImages: ["/mediabottom-3a.jpeg", "/mediabottom-3b.jpeg", "/mediabottom-3c.jpeg", "/mediabottom-3d.jpeg"],
    allImages: [
      { url: "/mediabottom-3.jpg", caption: "Business summit" },
      { url: "/mediabottom-3a.jpeg", caption: "Address by dignitaries" }
    ]
  },
  {
    id: "default-4",
    img: "/mediabottom-4.jpg",
    description: "Excellence award by Bundelkhand Chamber Of Commerce to various industrialist",
    hoverImages: ["/mediabottom-4a.jpeg", "/mediabottom-4b.jpeg", "/mediabottom-4c.jpeg"],
    allImages: [
      { url: "/mediabottom-4.jpg", caption: "Excellence award ceremony" }
    ]
  },
  {
    id: "default-5",
    img: "/mediabottom-5.jpg",
    description: "Clean jhansi green jhansi campaign",
    hoverImages: ["/mediabottom-5a.jpeg", "/mediabottom-5b.jpeg"],
    allImages: [
      { url: "/mediabottom-5.jpg", caption: "Clean Jhansi Green Jhansi Campaign" }
    ]
  },
  {
    id: "default-6",
    img: "/mediabottom-6.jpg",
    description: "Agro summit",
    hoverImages: ["/mediabottom-6.jpg"],
    allImages: [
      { url: "/mediabottom-6.jpg", caption: "Agro summit discussions" }
    ]
  },
  {
    id: "default-7",
    img: "/Newzr11.jpeg",
    description: "MSME Gathering",
    hoverImages: ["/Newzr11.jpeg", "/Newzr11-a.jpeg", "/Newzr11-c.jpeg"],
    allImages: [
      { url: "/Newzr11.jpeg", caption: "MSME Gathering" }
    ]
  },
  {
    id: "default-8",
    img: "/Newzr12.jpeg",
    description: "MSME SUMMIT",
    hoverImages: ["/Newzr13.jpeg", "/Newzr14.jpeg", "/mediabottom-1c.jpg"],
    allImages: [
      { url: "/Newzr12.jpeg", caption: "MSME SUMMIT" }
    ]
  },
  {
    id: "default-9",
    img: "/mediabottom-8.jpeg",
    description: "MSME SUMMIT, Kanpur - Chief Guest - Hon'ble Mr. Dheeraj Khullar",
    hoverImages: ["/mediabottom-8-1.jpeg", "/mediabottom-8-2.jpeg", "/mediabottom-8-3.jpeg"],
    allImages: [
      { url: "/mediabottom-8.jpeg", caption: "MSME SUMMIT Kanpur" }
    ]
  },
  {
    id: "default-10",
    img: "/mediabottom-9.jpeg",
    description: "Regional Level GEM Workshop, Jhansi Region",
    hoverImages: ["/mediabottom-9a.jpeg", "/mediabottom-9b.jpeg", "/mediabottom-9c.jpeg"],
    allImages: [
      { url: "/mediabottom-9.jpeg", caption: "GEM Workshop Jhansi" }
    ]
  }
];

function resolveImageUrl(url) {
  if (!url) return "/mediabottom-1.jpg";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  if (url.startsWith("/uploads/")) {
    return `${BACKEND_URL}${url}`;
  }
  return url;
}

function Page() {
  const [mediaList, setMediaList] = useState(defaultMedia);
  const [featuredPastEvent, setFeaturedPastEvent] = useState(null);
  const [selectedGalleryEvent, setSelectedGalleryEvent] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const [hoveredImageIndices, setHoveredImageIndices] = useState([]);
  const [intervalIds, setIntervalIds] = useState([]);

  // Fetch past events from backend API
  useEffect(() => {
    let isMounted = true;

    async function loadPastEvents() {
      try {
        const res = await fetch(`${BASE_URL}${ENDPOINTS.EVENTS_PAST}`);
        if (!res.ok) return;
        const result = await res.json();

        if (result.success && Array.isArray(result.data) && result.data.length > 0 && isMounted) {
          const pastEvents = result.data;

          // Featured past event for top static section
          if (pastEvents.length > 0) {
            setFeaturedPastEvent(pastEvents[0]);
          }

          // Format past events into media items
          const eventMediaItems = pastEvents.map((ev) => {
            const allImages = [];
            if (ev.highlightImage?.url) {
              allImages.push({
                url: resolveImageUrl(ev.highlightImage.url),
                caption: ev.highlightImage.caption || `${ev.title} (Highlight)`
              });
            }
            if (Array.isArray(ev.leftImages)) {
              ev.leftImages.forEach((img, idx) => {
                if (img?.url) {
                  allImages.push({
                    url: resolveImageUrl(img.url),
                    caption: img.caption || `${ev.title} - Left #${idx + 1}`
                  });
                }
              });
            }
            if (Array.isArray(ev.rightImages)) {
              ev.rightImages.forEach((img, idx) => {
                if (img?.url) {
                  allImages.push({
                    url: resolveImageUrl(img.url),
                    caption: img.caption || `${ev.title} - Right #${idx + 1}`
                  });
                }
              });
            }

            const primaryImg = allImages[0]?.url || "/mediabottom-1.jpg";
            const hoverUrls = allImages.length > 1
              ? allImages.slice(1).map(i => i.url)
              : [primaryImg];

            return {
              id: ev.id || ev._id,
              isEvent: true,
              eventData: ev,
              img: primaryImg,
              description: ev.title,
              date: ev.date ? new Date(ev.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
              hoverImages: hoverUrls,
              allImages
            };
          });

          // Combine with default media
          const combined = [...eventMediaItems, ...defaultMedia];
          setMediaList(combined);
          setHoveredImageIndices(Array(combined.length).fill(0));
          setIntervalIds(Array(combined.length).fill(null));
        } else {
          setHoveredImageIndices(Array(defaultMedia.length).fill(0));
          setIntervalIds(Array(defaultMedia.length).fill(null));
        }
      } catch (err) {
        console.warn("Could not load past events for media page:", err);
        setHoveredImageIndices(Array(defaultMedia.length).fill(0));
        setIntervalIds(Array(defaultMedia.length).fill(null));
      }
    }

    loadPastEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle hover to cycle images
  const handleMouseEnter = (index) => {
    if (!mediaList[index] || !mediaList[index].hoverImages || mediaList[index].hoverImages.length <= 1) return;
    if (intervalIds[index]) clearInterval(intervalIds[index]);

    let i = hoveredImageIndices[index] || 0;
    const interval = setInterval(() => {
      if (!mediaList[index]?.hoverImages) return;
      i = (i + 1) % mediaList[index].hoverImages.length;
      setHoveredImageIndices((prev) => {
        const copy = [...prev];
        copy[index] = i;
        return copy;
      });
    }, 2000);

    setIntervalIds((prev) => {
      const copy = [...prev];
      copy[index] = interval;
      return copy;
    });
  };

  const handleMouseLeave = (index) => {
    if (intervalIds[index]) {
      clearInterval(intervalIds[index]);
    }
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
    <div className="min-h-screen bg-slate-50">
      <Nav />

      {/* Heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center md:mt-10 mt-36"
      >
        <h1 className="inline-block text-4xl font-extrabold text-orange-500 mb-10 after:content-[''] after:block after:h-[5px] after:w-[60%] after:bg-orange-500 after:mx-auto after:mt-1 after:rounded-full">
          Media & Past Events
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto px-4 -mt-6 mb-8 text-sm md:text-base">
          Archive of memorable BCCI events, past summits, conferences, and industrial delegations.
        </p>
      </motion.div>

      {/* Top Static Row - Displays Featured Past Event if available */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-4 md:mt-4 mb-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center bg-white p-0 rounded-2xl shadow-xl max-w-3xl w-full border border-orange-100 overflow-hidden">
          <img
            src={
              featuredPastEvent
                ? resolveImageUrl(featuredPastEvent.highlightImage?.url || featuredPastEvent.leftImages?.[0]?.url || "/Newz1.png")
                : "/Newz1.png"
            }
            alt={featuredPastEvent?.title || "Event"}
            className="w-full md:w-[380px] h-[240px] md:h-[260px] object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none flex-shrink-0"
          />
          <div className="p-6 text-left flex flex-col justify-between h-full">
            <div>
              <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">
                {featuredPastEvent ? "Archived Event" : "Past Highlight"}
              </span>
              <h2 className="text-xl font-bold mb-3 text-black">
                {featuredPastEvent?.title || "MSME Summit & Industrial Exhibition"}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed">
                {featuredPastEvent?.description ||
                  "The Bundelkhand Chamber of Commerce and Industry successfully organized the MSME Summit at Jhansi. The event brought together entrepreneurs, policymakers, bankers, and industry experts to discuss the growth potential of Micro, Small, and Medium Enterprises in the Bundelkhand region."}
              </p>
            </div>
            {featuredPastEvent && (
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  {new Date(featuredPastEvent.date || featuredPastEvent.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
                <button
                  onClick={() => {
                    const allImages = [];
                    if (featuredPastEvent.highlightImage?.url) {
                      allImages.push({
                        url: resolveImageUrl(featuredPastEvent.highlightImage.url),
                        caption: featuredPastEvent.highlightImage.caption || `${featuredPastEvent.title} (Highlight)`
                      });
                    }
                    (featuredPastEvent.leftImages || []).forEach(img => {
                      if (img.url) allImages.push({ url: resolveImageUrl(img.url), caption: img.caption || 'Left Slot' });
                    });
                    (featuredPastEvent.rightImages || []).forEach(img => {
                      if (img.url) allImages.push({ url: resolveImageUrl(img.url), caption: img.caption || 'Right Slot' });
                    });
                    setSelectedGalleryEvent({
                      title: featuredPastEvent.title,
                      description: featuredPastEvent.description,
                      date: featuredPastEvent.date,
                      allImages
                    });
                  }}
                  className="text-orange-600 font-semibold hover:underline flex items-center gap-0.5"
                >
                  View Event Images <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full md:w-[300px] h-[260px] border border-orange-100 flex flex-col">
          <img
            src="/mediabottom-7.jpg"
            alt="Collaboration"
            className="object-cover w-full h-[70%]"
          />
          <div className="bg-orange-500 text-white p-3 text-center font-medium h-[30%] flex items-center justify-center text-sm md:text-base">
            BCCI Industrial Development Initiatives
          </div>
        </div>
      </div>

      {/* Gallery Section Header */}
      <div className="max-w-6xl mx-auto px-4 mt-16 mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Event Archives & Galleries</h2>
          <p className="text-sm text-gray-500">Hover over cards to cycle photos, or click to open full album</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
          {mediaList.length} Collections
        </span>
      </div>

      {/* Bottom Section */}
      <div className="px-2 md:px-0 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ height: 390 }}
          animate={{ height: expanded ? "auto" : 390 }}
          transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
          className="relative md:px-12 w-full mb-12 overflow-hidden no-scrollbar"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`${
              expanded
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 justify-center"
                : "animate-marquee whitespace-nowrap flex gap-4 sm:gap-6 h-fit"
            }`}
          >
            {mediaList.map((card, index) => {
              const currentHoverIdx = hoveredImageIndices[index] || 0;
              const hasMultiple = card.hoverImages && card.hoverImages.length > 0;
              const currentImg =
                hasMultiple && card.hoverImages[currentHoverIdx]
                  ? card.hoverImages[currentHoverIdx]
                  : card.img;

              return (
                <motion.div
                  key={card.id || index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  onClick={() => {
                    setSelectedGalleryEvent({
                      title: card.description,
                      description: card.eventData?.description || card.description,
                      date: card.date || card.eventData?.date,
                      allImages: card.allImages || [{ url: card.img, caption: card.description }]
                    });
                  }}
                  className="bg-white flex-shrink-0 hover:bg-orange-500 hover:cursor-pointer text-black hover:text-white rounded-2xl shadow-md hover:shadow-xl w-[170px] sm:w-[260px] md:w-[280px] h-[240px] md:h-[270px] hover:scale-105 mt-4 flex flex-col justify-between overflow-hidden transition-all duration-300 border border-gray-100 group"
                >
                  <div className="relative h-[72%] w-full p-2 group-hover:p-3 overflow-hidden">
                    <img
                      src={currentImg}
                      alt={card.description}
                      className="w-full h-full object-cover rounded-xl transition-all duration-500"
                    />
                    {card.isEvent && (
                      <span className="absolute top-4 left-4 bg-orange-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                        Past Event
                      </span>
                    )}
                    {card.allImages && card.allImages.length > 1 && (
                      <span className="absolute bottom-4 right-4 bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-1 shadow">
                        <ImageIcon size={10} /> {card.allImages.length}
                      </span>
                    )}
                  </div>

                  <div className="h-[28%] px-3 pb-2 text-center flex flex-col items-center justify-center">
                    <p className="text-[12px] md:text-sm font-semibold line-clamp-2 leading-tight">
                      {card.description}
                    </p>
                    {card.date && (
                      <span className="text-[10px] text-gray-500 group-hover:text-orange-100 mt-1">
                        {card.date}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Toggle Button */}
          <div className="flex justify-center items-center mt-6 mb-10">
            <button
              onClick={() => {
                if (expanded) {
                  window.scrollTo({ top: 300, behavior: "smooth" });
                  setTimeout(() => setExpanded(false), 300);
                } else {
                  setExpanded(true);
                }
              }}
              className="bg-orange-500 hover:cursor-pointer hover:bg-orange-600 transition-all duration-300 text-white text-base md:text-lg font-semibold rounded-full px-8 py-2.5 shadow-md flex items-center gap-2"
            >
              {expanded ? "Show Less" : "View All Events & Media"}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Interactive Event Gallery Modal */}
      {selectedGalleryEvent && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-orange-50">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  Event Album
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {selectedGalleryEvent.title}
                </h3>
                {selectedGalleryEvent.description && selectedGalleryEvent.description !== selectedGalleryEvent.title && (
                  <p className="text-xs md:text-sm text-gray-600 mt-2 max-w-2xl leading-relaxed">
                    {selectedGalleryEvent.description}
                  </p>
                )}
                {selectedGalleryEvent.date && (
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Calendar size={12} /> {selectedGalleryEvent.date}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedGalleryEvent(null)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 rounded-full transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Image Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedGalleryEvent.allImages?.map((img, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col">
                  <div className="h-48 overflow-hidden bg-black/5">
                    <img
                      src={img.url}
                      alt={img.caption || `Image ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {img.caption && (
                    <div className="p-2.5 text-xs text-gray-700 bg-white border-t border-gray-100 leading-snug">
                      {img.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
              <button
                onClick={() => setSelectedGalleryEvent(null)}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Page;
