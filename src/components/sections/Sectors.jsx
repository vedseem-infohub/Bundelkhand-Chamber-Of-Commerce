'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from "react-intersection-observer";


const sectorsData = [
  {
    id: 1,
    title: 'Infrastructure',
    image: '/sectors1.jpeg',
    hoverTitle: 'Infrastructure Details',
    hoverImage: '/sectors1hov.jpeg',
  },
  {
    id: 2,
    title: 'Agro-Food-&-Processing',
    image: '/agro-food-processing.jpg',
    hoverTitle: 'Agro Expanded',
    hoverImage: '/sectors2hov.jpeg',
  },
  {
    id: 3,
    title: 'Corporate Governance',
    image: '/sectors2.jpeg',
    hoverTitle: 'Corporate Deep Dive',
    hoverImage: '/services3.jpeg',
  },
  {
    id: 4,
    title: 'Startup & Entrepreneurship',
    image: '/services1.jpeg',
    hoverTitle: 'Startup Growth',
    hoverImage: '/sectors4hov.jpeg',
  },
];

export default function Sectors() {
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
  <section className="w-full min-h-fit bg-white px-4 md:px-16 py-0 mb-[-2rem] md:mb-[-5rem] relative overflow-hidden">
    <motion.h1
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="inline-block text-4xl w-full mt-18 font-extrabold text-orange-500 text-center after:content-[''] after:block after:h-[5px] after:w-[26%] md:after:w-[6%] after:bg-orange-500 after:mx-auto after:mt-0 after:rounded-full"
    >
      Sectors
    </motion.h1>

  <div className="absolute right-[-58rem] inset-0 opacity-20 z-0 pointer-events-none">
    <Image
      src="/bg.png"
      alt="Background Watermark"
      fill
      className="object-contain"
      priority
      unoptimized
    />
  </div>
  <div className="absolute left-[-5rem] top-[1rem] opacity-50 z-0 pointer-events-none rotate-[250deg]">
    <Image
      src="/bg.png"
      alt="Background Watermark"
      width={600}   // set custom width
      height={300}  // set custom height
      className="object-contain"
      priority
      unoptimized
    />
  </div>

  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-20 md:mt-30 md:grid-cols-4 justify-items-center">
    {sectorsData.map((sector, index) => (
      <SectorCard key={sector.id} sector={sector} index={index} />
    ))}
  </div>
</section>

  );
}

function SectorCard({ sector, index }) {
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
  }, []);

  const isImageTopInitially = index % 2 === 0; // zig-zag

  // Determine current content types
  const topIsImage = hovered ? !isImageTopInitially : isImageTopInitially;

  // Heights based on content type
  const topHeight = topIsImage ? '68%' : '30%';
  const bottomHeight = topIsImage ? '30%' : '68%';

  const toggleHover = () => {
    if (isTouch) setHovered((prev) => !prev);
  };

  return (
    <motion.div
      className="w-full md:mb-20 mb-10 bg-transparent lg:max-w-[250px] sm:max-w-[160px] md:max-w-[180px] lg:h-[500px] h-[300px] md:h-[350px] rounded-xl overflow-hidden cursor-pointer flex flex-col"
      onMouseEnter={!isTouch ? () => setHovered(true) : undefined}
      onMouseLeave={!isTouch ? () => setHovered(false) : undefined}
      onClick={toggleHover}
      layout
      transition={{ duration: 0.4 }}
    >
      

      {/* TOP */}
      <motion.div
        layout
        animate={{ height: topHeight }}
        transition={{ duration: 0.4 }}
        className={`relative overflow-hidden flex items-center justify-center md:mb-3 mb-2 rounded-xl ${
          topIsImage ? 'bg-transparent' : 'bg-orange-500'
        }`}
      >
        <AnimatePresence mode="wait">
          {topIsImage ? (
            <motion.div
              key={hovered ? 'hoverImageTop' : 'initialImageTop'}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Image
                src={hovered ? sector.hoverImage : sector.image}
                alt={sector.title}
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
          ) : (
            <motion.p
              key={hovered ? 'hoverHeadingTop' : 'initialHeadingTop'}
              className="text-white font-semibold text-center px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {hovered ? sector.hoverTitle : sector.title}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* BOTTOM */}
      <motion.div
        layout
        animate={{ height: bottomHeight }}
        transition={{ duration: 0.4 }}
        className={`relative overflow-hidden flex items-center justify-center rounded-xl ${
          topIsImage ? 'bg-orange-500' : 'bg-transparent'
        }`}
      >
        <AnimatePresence mode="wait">
          {!topIsImage ? (
            <motion.div
              key={hovered ? 'hoverImageBottom' : 'initialImageBottom'}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Image
                src={hovered ? sector.hoverImage : sector.image}
                alt={sector.title}
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
          ) : (
            <motion.p
              key={hovered ? 'hoverHeadingBottom' : 'initialHeadingBottom'}
              className="text-white font-semibold text-center px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {hovered ? sector.hoverTitle : sector.title}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
