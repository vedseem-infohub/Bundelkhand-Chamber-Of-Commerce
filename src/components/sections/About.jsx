"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true, // animate only once
    threshold: 0.2,     // trigger when 20% of the section is visible
  });

  return (
    <div>
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full min-h-screen flex items-start justify-center bg-cover bg-center bg-no-repeat mx-auto p-0 md:p-14 md:mt-10"
        style={{ backgroundImage: "url('/about.jpeg')" }}
      >
        <div className="max-w-full w-full px-6 z-2">
          <h2 className="md:text-5xl text-3xl mt-10 font-extrabold text-orange-600 border-b-4 border-orange-600 inline-block mb-5">
            About Us
          </h2>
          <h1 className="md:text-5xl text-2xl font-extrabold text-gray-800 mb-6 leading-snug">
            Discover Our Story Of <br /> Success
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-7 mb-12">
            From humble beginnings to industry leadership, we’ve taken bold steps
            <br />
            towards excellence. Join us in our ongoing pursuit of innovation.
            Welcome to <br />
            our journey.
          </p>

          <div className="flex flex-wrap md:justify-between justify-center items-center gap-8 md:ml-5">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="text-center w-64">
                <img src={icon} alt={title} className="mx-auto md:mb-5" />
                <h3 className="text-xl md:text-2xl font-semibold text-orange-600 mb-1 md:mb-3">{title}</h3>
                <p
                  className="text-md md:text-lg font-semibold text-gray-800 mb-2 md:mb-0"
                  dangerouslySetInnerHTML={{ __html: desc }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

const features = [
  {
    icon: "https://img.icons8.com/ios-filled/64/000000/handshake.png",
    title: "Trusted Business",
    desc: "We Deliver success to your<br/>business.",
  },
  {
    icon: "https://img.icons8.com/ios-filled/64/000000/rocket.png",
    title: "Expertise In Action",
    desc: "We assist our clients to set<br/>right strategy.",
  },
  {
    icon: "https://img.icons8.com/ios-filled/64/000000/prize.png",
    title: "Recognized Excellence",
    desc: "We see challenges as<br/>opportunities.",
  },
  {
    icon: "https://img.icons8.com/ios-filled/64/000000/help.png",
    title: "Always Ready To Help",
    desc: "We Deliver success to your<br/>business.",
  },
];
