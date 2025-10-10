"use client"; // only if using app router

import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import React from "react";
import { motion } from "framer-motion"; 

export default function About() {
  return (
    <div>
      <div><Nav /></div>

      {/* ✅ Animated Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full h-screen flex items-start justify-center bg-cover bg-center bg-no-repeat mx-auto p-5 md:p-14 md:mt-10"
        style={{ backgroundImage: "url('/about.jpeg')" }}
      >
        <div className="max-w-full w-full px-6 z-2">
          <h2 className="md:text-5xl text-4xl font-extrabold text-orange-600 border-b-4 border-orange-600 inline-block mb-5">
            About Us
          </h2>
          <h1 className="md:text-5xl text-2xl font-extrabold text-gray-800 mb-6 leading-snug">
            Discover Our Story Of <br /> Success
          </h1>
          <p className="text-xl text-gray-600 leading-7 mb-12">
            From humble beginnings to industry leadership, we’ve taken bold steps
            <br />
            towards excellence. Join us in our ongoing pursuit of innovation.
            Welcome to <br />
            our journey.
          </p>

          <div className="flex flex-wrap justify-between items-center gap-8 ml-5">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="text-center w-64">
                <img src={icon} alt={title} className="mx-auto md:mb-5" />
                <h3 className="text-2xl font-semibold text-orange-600 mb-3">{title}</h3>
                <p
                  className="text-lg font-semibold text-gray-800 mb-2 md:mb-0"
                  dangerouslySetInnerHTML={{ __html: desc }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
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
