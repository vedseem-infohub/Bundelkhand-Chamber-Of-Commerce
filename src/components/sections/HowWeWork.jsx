"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

export default function HowWeWork3D() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cards = [
    {
      title: "Networking Events",
      image: "/howwework1.png",
      description:
        "We organize events to connect businesses and foster collaboration.",
    },
    {
      title: "Business Promotion",
      image: "/howwework2.png",
      description:
        "We promote local businesses through various channels to increase visibility.",
    },
    {
      title: "Economic Development",
      image: "/howwework3.png",
      description:
        "We work towards the economic development of the Bundelkhand region.",
    },
    {
      title: "Training & Resources",
      image: "/howwework4.png",
      description:
        "We provide training and resources to help businesses grow and succeed.",
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-20 px-4 md:px-8 transition-all duration-500"
      style={{
        background:
          !isMobile && hoveredImage
            ? `url(${hoveredImage}) center/cover no-repeat`
            : "linear-gradient(to bottom, white, #fff7ed, white)",
      }}
    >
      {/* Overlay for dim effect */}
      {!isMobile && hoveredImage && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-800 z-0" />
      )}

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-4xl md:text-5xl font-extrabold text-orange-600 mb-12 relative z-10"
      >
        How We Work
        <span className="block mt-1 h-[6px] w-62 bg-orange-500 mx-auto rounded-full"></span>
      </motion.h1>

      {/* 3D Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-5 max-w-fit mx-auto relative z-10">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => {
              setHoveredImage(card.image);
              setHoveredCard(i);
            }}
            onMouseLeave={() => {
              setHoveredImage(null);
              setHoveredCard(null);
            }}
          >
            <CardContainer containerClassName="">
              <CardBody
                className={`flex flex-col justify-center max-w-7xl items-center rounded-2xl shadow-md border p-6 transition-all duration-300
                  ${
                    hoveredCard === i && hoveredImage
                      ? "bg-white/40 text-black border-orange-400 shadow-lg"
                      : "bg-gradient-to-br from-orange-300/70 to-orange-800/10 backdrop-blur-md border-orange-200"
                  }`}
              >
                {/* Image */}
                <CardItem translateZ={50} className="flex justify-center ">
                  <div className="p-4 rounded-full">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={140}
                      height={140}
                      className="object-contain "
                      unoptimized
                    />
                  </div>
                </CardItem>

                {/* Title */}
                <CardItem translateZ={30} className="mt-6">
                  <h3
                    className={`text-xl font-bold text-center ${
                      hoveredCard === i && hoveredImage
                        ? "text-gray-900"
                        : "text-orange-700"
                    }`}
                  >
                    {card.title}
                  </h3>
                </CardItem>

                {/* Description */}
                <CardItem translateZ={20} className="mt-3">
                  <p
                    className={`text-sm text-center leading-relaxed ${
                      hoveredCard === i && hoveredImage
                        ? "text-gray-700"
                        : "text-orange-800"
                    }`}
                  >
                    {card.description}
                  </p>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
