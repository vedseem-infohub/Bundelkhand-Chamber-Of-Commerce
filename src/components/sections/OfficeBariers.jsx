'use client';
import React from 'react';
import { motion } from 'framer-motion';import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

const OfficeBearers = () => {
const members = [
  {
    src: '/ob4kapil.png',
    alt: 'Kapil',
    height: '23rem',
    width: '22rem',
    zIndex: 10,
    left: '3rem',
    name: 'Kapil Khanna',
    heading: 'People-Centric Approach ',
    description: "Experience is the true capital — invest it in the right direction, and success will follow.",
    title: 'Treasurer',
    brightness: '50',
    hoverTop: '0rem',
    hoverLeft: '-5rem',
    pointerBottom: '-top-3.5',
    pointerLeft: 'left-1/2',
    pointerTranslate: '-translate-x-1/2',
    pointerRotate: 'rotate-45'
  },
  {
    src: '/ob2pawan.png',
    alt: 'Pawan',
    height: '22rem',
    width: '25rem',
    zIndex: 30,
    name: 'Pawan Saraogi',
    heading: 'Driven By Results',
    description: "Business done with values doesn't just earn profit — it earns respect too.",
    left: '-4.5rem',
    title: 'General Secreatry',
    brightness: '50',
    hoverTop: '-34rem',
    hoverLeft: '-26rem',
    pointerBottom: '-bottom-1.5',
    pointerLeft: '-right-1',
    pointerTranslate: '-translate-x-0',
    pointerRotate: 'rotate-85'
  },
  {
    src: '/obdheeraj.png',
    alt: 'Dheeraj',
    height: '28rem',
    width: '23rem',
    zIndex: 99,
    name: 'Dheeraj Khullar',
    heading: 'Innovative Leader',
    description: "Business is not just about profit, it's a responsibility to society.Every day is a new opportunity — keep moving forward!",
    left: '-4.5rem',
    title: 'President',
    brightness: '50',
    hoverTop: '-40rem',
    hoverLeft: '9rem',
    pointerBottom: '-bottom-1.5',
    pointerLeft: '-left-1',
    pointerTranslate: 'translate-x-0',
    pointerRotate: 'rotate-[94deg]'
  },
  {
    src: '/ob3amit.png',
    alt: 'Amit',
    height: '22rem',
    width: '25rem',
    zIndex: 20,
    name: 'Amit Singh',
    heading: 'Strategic Thinkers',
    description: 'With decades of combined industry experience, our team is focused on long-term growth, smart execution, and continuous improvement.',
    left: '-7.5rem',
    title: 'Joint Secreatry',
    brightness: '50',
    hoverTop: '0rem',
    hoverLeft: '-10rem',
    pointerBottom: '-top-3.5',
    pointerLeft: 'left-1/2',
    pointerTranslate: '-translate-x-1/2',
    pointerRotate: 'rotate-45'
  },
];

const membersMobile = [
  {
    src: '/obdheeraj.png',
    alt: 'Dheeraj',
    height: '28rem',
    width: '23rem',
    zIndex: 99,
    name: 'Dheeraj Khullar',
    left: '-4.5rem',
    title: 'President',
    description:'Managing Director Hankhul Packwell Pvt Ltd'
   
  },
  {
    src: '/ob2pawan.png',
    alt: 'Pawan',
    height: '22rem',
    width: '25rem',
    zIndex: 30,
    name: 'Pawan Saraogi',
    left: '-4.5rem',
    title: 'General Secreatry',
    description: 'Jhansi Granite Stone Products Private Limited'

  },
  {
    src: '/ob3amit.png',
    alt: 'Amit',
    height: '22rem',
    width: '22rem',
    zIndex: 10,
    left: '3rem',
    name: 'Amit Singh',
    title: 'Joint Secreatry',
    description: 'Maa Pitambra Industries'
  
  },
  {
    src: '/ob4kapil.png',
    alt: 'Kapil',
    height: '22rem',
    width: '25rem',
    zIndex: 20,
    name: 'Kapil Khanna',
    left: '-7.5rem',
    title: 'Treasurer',
    description: 'Khanna & Associates'
  },
];

const fadeInProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true },
};

  const scrollRef = useRef(null); // <-- Moved outside to be shared between buttons

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col min-h-screen md:justify-between justify-around items-center px-4 py-2 overflow-hidden">
         <motion.h1
           {...fadeInProps}
           className="inline-block md:text-4xl text-3xl w-full font-bold md:font-extrabold text-orange-500 text-center md:mb-10 after:content-[''] after:block md:after:h-[5px] after:h-[5px] after:w-[40%] md:after:w-[12%] after:bg-orange-500 after:mx-auto after:rounded-full"
         >
           Office Bearers
         </motion.h1>

      {/* Dekstop View */}
      <div className='relative hidden md:flex flex-row justify-center items-end w-full max-w-7xl min-h-[30rem] mt-20 mb-60'>
        {members.map((member, index) => (
          <div
            key={index}
            className={`relative group flex-shrink-0 transition-transform duration-300 w-full max-w-[18rem]`}
          >
            {/* Hover card - above image */}
            <div
              style={{
                top: member.hoverTop,
                left: member.hoverLeft,
              }}
              className="absolute translate-x-4 opacity-0 group-hover:opacity-100 duration-500 transition-opacity bg-orange-400 text-white text-center px-4 py-2 rounded-md w-max shadow-md pointer-events-none z-[99]"
            >
              {/* Pointer */}
              <div
                className={`absolute w-10 h-11 z-10 bg-orange-400 ${member.pointerBottom} ${member.pointerLeft} ${member.pointerTranslate} ${member.pointerRotate}`}
              ></div>
            
              {/* Name and Title */}
              <div className="relative z-50 font-bold text-lg">{member.name}</div>
              <div className="relative z-40 text-sm">{member.title}</div>
            
              {/* Box with description */}
              <div className="bg-orange-500 text-white rounded-xl px-6 py-4 w-fit max-w-md skew-x-[3deg] mt-2 relative z-30">
                <div className="-skew-x-[9deg]">
                  <h3 className="text-lg font-bold">{member.heading}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            </div>


            <div
              style={{
                zIndex: member.zIndex,
                left: member.left,
                width: member.width,
              }}
              className="absolute bottom-0 group-hover:grayscale-0 min-w-[10rem]" // fallback width
            >
              <Image
                src={member.src}
                alt={member.alt}
                width={300}
                height={600}
                className="object-contain grayscale group-hover:grayscale-0 transition duration-300"
                style={{
                  width: member.width,
                }}
              />
            </div>
          </div>
        ))}
        <div className="absolute bottom-0 w-[100vw] left-10 h-24 bg-orange-500 -skew-x-[70deg] origin-top-right z-0" ></div>
      </div>


      {/* Mobile View */}
      <div className="md:hidden relative w-full mt-0">
        {/* Arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/3 -translate-y-1/2 bg-gray-500 text-black p-2 rounded-full z-90 shadow"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/3 -translate-y-1/2 bg-gray-500 text-black p-2 rounded-full z-90 shadow-md"
        >
          <ChevronRight />
        </button>          
        {/* Scrollable List */}
        <div className='w-full relative'>
        <div
          ref={scrollRef}
          className="w-full flex gap-4 overflow-x-auto no-scrollbar px-8 py-0 snap-x snap-mandatory"
        >
          {membersMobile.map((member, index) => (
            <div
              key={index}
              className="min-w-[100%] max-w-[120%] shrink-0 z-10 relative snap-start"
            >
              <Image
                src={member.src}
                alt={member.alt}
                width={800}
                height={500}
                className="rounded-xl w-content h-[45vh] object-fit bg-gray-200 p-2 backdrop-blur-md"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-opacity-50 bg-black/30 text-white p-2 rounded-md text-sm leading-tight">
                <div className="font-semibold text-lg">{member.name}</div>
                <div className="text-md text-orange-500">{member.title}</div>
                <div className="text-md text-orange-500">{member.description}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 w-[120vw] left-40 h-24 bg-orange-500 -skew-x-[70deg] origin-top-right z-0" ></div>
        </div>
        <h1 className='text-4xl text-black my-10 font-extrabold font-serif'>Your Business. <br/> Our Mission.</h1>
      </div>
    </div>
  );
};


export default OfficeBearers;