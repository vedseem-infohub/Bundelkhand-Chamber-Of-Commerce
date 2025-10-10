"use client";

import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import React from 'react';
import sectors from '@/components/data/sectors';
import SectorCard from '@/components/ui/SectorCard';
import { motion } from 'framer-motion';

function page() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const fadeInProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true },
  };

  return (
    <div>
      <div>
        <Nav />
      </div>

      <div className="px-10">
        {/* Hero Section */}
        <div
          className="hidden w-full min-h-[400px] lg:flex flex-col items-center justify-center rounded-tl-2xl rounded-3xl bg-cover bg-center"
          style={{ backgroundImage: "url('/sectorsPage.png')" }}
        ></div>

        <motion.h1
          // {...fadeInProps}
          className="inline-block md:text-8xl text-3xl w-full font-bold md:font-extrabold text-orange-500 text-center md:mb-10 mt-5 after:content-[''] after:block after:h-[5px] md:after:h-[9px] after:w-[21%] md:after:w-[15%] after:bg-orange-500 after:mx-auto after:mt-0 md:after:mt-0 after:rounded-full"
        >
          Sectors
        </motion.h1>
      </div>

      {/* Black line at left */}
      <div className="hidden xl:flex absolute left-0 w-full">
        <div className="absolute left-[-6.5rem] top-[13rem] text-black rotate-270 text-3xl tracking-wide">
          Connect with us
        </div>
        <div className="h-[20rem] w-1 rounded-4xl bg-black absolute left-10 top-[4rem]"></div>
      </div>

      {/* All 36 sectors */}
      <div className="min-h-screen mt-15 lg:px-18 md:px-10 px-3 py-0 md:py-0 bg-white">
        <div className="flex flex-row justify-center items-center gap-2 md:gap-6 px-3">
          
          {/* Column Group 1 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="flex md:flex-row flex-col flex-1 justify-center items-center gap-6 self-start"
          >
            <div className='flex flex-1 flex-col self-start items-start justify-start gap-4'>
              {sectors.map((sector, index) =>
                index <= 8 ? (
<SectorCard 
  key={index} 
  name={sector.name} 
  image={sector.image} 
  description={sector.description} 
/>
                ) : null
              )}
            </div>
            <div className='flex flex-1 flex-col self-start items-start justify-start gap-4'>
              {sectors.map((sector, index) =>
                index > 8 && index <= 17 ? (
<SectorCard 
  key={index} 
  name={sector.name} 
  image={sector.image} 
  description={sector.description} 
/>
                ) : null
              )}
            </div>
          </motion.div>

          {/* Column Group 2 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="flex md:flex-row flex-col flex-1 justify-center items-center gap-6 self-start"
          >
            <div className='flex flex-1 flex-col self-start items-start justify-start gap-4'>
              {sectors.map((sector, index) =>
                index > 17 && index <= 26 ? (
<SectorCard 
  key={index} 
  name={sector.name} 
  image={sector.image} 
  description={sector.description} 
/>
                ) : null
              )}
            </div>
            <div className='flex flex-1 flex-col self-start items-start justify-start gap-4'>
              {sectors.map((sector, index) =>
                index > 26 && index <= 35 ? (
<SectorCard 
  key={index} 
  name={sector.name} 
  image={sector.image} 
  description={sector.description} 
/>
                ) : null
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className='mt-20 lg:mt-0'>
        <Footer />
      </div>
    </div>
  );
}

export default page;
