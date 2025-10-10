"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";

const benefits = [
  { title: "Promotion and Protection of Trade & Industry", desc: "To advance, safeguard, and represent the interests of trade, industry, and services in Bundelkhand; and to provide advisory services to members and the business community on related matters." },
  { title: "Fostering Collaboration", desc: "To encourage and strengthen cooperation, networking, and unity among industrial, service, and business sectors." },
  { title: "Policy Advocacy", desc: "Represents commercial interests before judicial bodies, local authorities, and government departments; submits proposals to the Uttar Pradesh and Indian governments for reforms benefiting the public and regional trade; and safeguards members’ rights." },
  { title: "Research & Information Dissemination", desc: "To collect, analyze, and distribute relevant market, industry, and trade data for the benefit of members and stakeholders." },
  { title: "Market Development", desc: "To improve and modernize market infrastructure in Bundelkhand and work towards their sustainable growth." },
  { title: "Trade & Economic Studies", desc: "To assess import-export trends at regional and national levels and provide strategic recommendations." },
  { title: "Capacity Building", desc: "To organize seminars, workshops, and business lectures for professional and skill development." },
  { title: "Dispute Resolution", desc: "To mediate and resolve commercial disputes among members and stakeholders." },
  { title: "Fair Taxation", desc: "To review taxes imposed by government and local bodies, and address any unjust or unreasonable levies through appropriate representation." },
  { title: "Business Networking & Recreation", desc: "To establish and manage business clubs for networking, collaboration, and member engagement." },
  { title: "Industrial Promotion", desc: "To facilitate exhibitions, fairs, and displays of Bundelkhand’s industrial and commercial products." },
  { title: "Institutional Collaboration", desc: "To develop partnerships and alliances with organizations having similar objectives." },
  { title: "Quality & Productivity Enhancement", desc: "To promote industrial growth, improve product quality, and support innovation." },
  { title: "Representation in Public Bodies", desc: "To secure representation for the Chamber in government, semi-government, municipal, and other committees, boards, and commissions; and to ensure active participation through elected representatives." },
  { title: "Strategic Elections Participation", desc: "To support and promote candidates representing Chamber interests in public or industry elections." },
  { title: "Knowledge Resources", desc: "To build and maintain a commercial library containing laws, rules, reports, publications, and trade-related literature." },
  { title: "External Representation", desc: "To protect and promote the Chamber’s interests outside Bundelkhand through advocacy and strategic engagement." },
  { title: "Business Practice Advisory", desc: "To provide guidance on commercial procedures, enhance ease of doing business, and affiliate with relevant trade-support institutions." },
  { title: "Asset Acquisition & Management", desc: "To acquire, lease, or rent movable and immovable assets for the Chamber’s use; to construct, modify, or lease such assets for revenue generation." },
  { title: "Industry-Specific Problem Solving", desc: "To conduct targeted studies and interventions addressing challenges faced by specific industries or trades." },
  { title: "Revenue Growth", desc: "To enhance the Chamber’s financial sustainability through membership fees, entry fees, and other innovative revenue streams." },
  { title: "Support to Other Organizations", desc: "To offer administrative and logistical support to other trade associations upon request, including hosting conferences and events." },
  { title: "Regional Conferences", desc: "To organize industrial and commercial conferences in Bundelkhand, present resolutions to the government, and seek their approval." },
  { title: "General Trade Development", desc: "To undertake all initiatives necessary for the growth of trade, industry, and commerce in alignment with the Chamber’s objectives." },
  { title: "Social Responsibility", desc: "To implement and manage social, charitable, and ethical initiatives for the welfare of citizens at both state and national levels." }
];

export default function OurVision() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  const chunkArray = (arr, size) => {
    let result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 640) {
        setSlides(chunkArray(benefits, 4)); // mobile: 2x2
      } else {
        setSlides(chunkArray(benefits, 8)); // desktop: 4x2
      }
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="w-full my-10 bg-white max-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-block text-2xl md:text-4xl w-full font-extrabold text-orange-500 text-center after:content-[''] after:block md:after:h-[5px] after:h-[3px] after:w-[50%] md:after:w-[20%] after:bg-orange-500 after:mx-auto after:mt-0 after:rounded-full"
        >
          Our Vision & Mission
        </motion.h1>

        {/* Slider */}
        <div className="relative mt-8" {...swipeHandlers}>
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow hover:bg-orange-600 z-10"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Slides */}
          <div className="overflow-y-hidden overflow-x-auto no-scrollbar">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((group, index) => (
                <div
                  key={index}
                  className="min-w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-2 p-1 lg:p-4 items-stretch"
                >
                  {group.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className="bg-orange-50 rounded-lg lg:p-5 p-3 border border-orange-200 shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col h-56 sm:h-64"
                    >
                      <h3 className="lg:text-lg text-[13px] font-semibold font-sans md:mt-3 mt-1 text-orange-700">
                        {item.title}
                      </h3>
                      <p className="lg:text-sm text-[10px] mt-2 text-orange-800">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow hover:bg-orange-600 z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}