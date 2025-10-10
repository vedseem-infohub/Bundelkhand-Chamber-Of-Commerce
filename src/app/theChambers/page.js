"use client";
import Image from "next/image";
import Nav from "@/components/sections/Nav";
import React from "react";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion"; 
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";


function Page() {
  const executiveRef = useRef(null); 
  const nominatedRef = useRef(null);
  
  // Returns a scroll amount depending on viewport width. On mobile (<=640px) use 100, else 500.
  const getScrollAmount = () => {
    if (typeof window === "undefined") return 500;
    try {
      return window.innerWidth <= 640 ? 150 : 500;
    } catch (e) {
      return 500;
    }
  };

  // Loading states for carousels
  const [executiveLoading, setExecutiveLoading] = useState(false);
  const [nominatedLoading, setNominatedLoading] = useState(false);

  // Ensure spinner shows for at least this many milliseconds
  const MIN_SPINNER_MS = 5000;

  const triggerScrollWithSpinner = (ref, amount, setLoading) => {
    if (!ref?.current) return;
    // If already loading, ignore additional clicks
    if (setLoading === undefined) return;
    setLoading(true);
    const start = Date.now();
    try {
      ref.current.scrollBy({ left: amount, behavior: "smooth" });
    } catch (e) {
      // ignore
    }
    const elapsed = Date.now() - start;
    const remaining = Math.max(0, MIN_SPINNER_MS - elapsed);
    setTimeout(() => setLoading(false), remaining);
  };
  
  const members = [
    {
      name: (
        <>
          Dheeraj Khullar (धीरज खुल्लर) <br />
          <hr className="my-1 border-white" />
          President Managing Director <br /> Hankhul Packwell Pvt Ltd
        </>
      ),
      img: "/obdheeraj.png",
    },
    {
      name: (
        <>
          Pawan Saraogi (पवन सरावगी) <br />
          <hr className="my-1 border-white" />
          General Secretary Jhansi<br /> Granite Stone Product Pvt Ltd
        </>
      ),
      img: "/ob2pawan.png",
    },
    {
      name: (
        <>
          Amit Singh (अमित सिंह) <br />
          <hr className="my-1 border-white" />
          Joint Secretary <br /> MD Pitambra Industries
        </>
      ),
      img: "/ob3amit.png",
    },
    {
      name: (
        <>
          CA Kapil Khanna (कपिल खन्ना) <br />
          <hr className="my-1 border-white" />
          Treasurer <br /> Kapil Khanna & Associates
        </>
      ),
      img: "/ob4kapil.png",
    },
  ];

  const executive = [
    { name: <>Dheeraj Khullar</>, img: "/obdheeraj.png" },
    { name: <>Pawan Saravgi</>, img: "/ob2pawan.png" },
    { name: <>CA Kapil Khanna</>, img: "/ob4kapil.png" },
    { name: <>Atul Sharma</>, img: "/Atul.png" },
    { name: <>Ajay Sijaria</>, img: "/Ajay.png" },
    { name: <>Shiva Likdhari</>, img: "/shiva.png" },
    { name: <>Atul Agarwal</>, img: "/Atul-Agarwal.png" },
    { name: <>Raju Parwar</>, img: "/Raju.png" },
    { name: <>Gaurav Gupta</>, img: "/Gaurav.png" },
    { name: <>Rajeev Mehta</>, img: "/Rajeev-Mehta.png" },
    { name: <>Sushil Parich</>, img: "/Sushil.png" },
    { name: <>Rajeev Khandelwal</>, img: "/Rajeev.png" },
    { name: <>Vijay Gupta</>, img: "/Vijay.png" },
    { name: <>Apurv Gupta</>, img: "/Apoorv.png" },
    { name: <>Sanjay Arora</>, img: "/Sanjay.png" },
    { name: <>Manish Niwalkar</>, img: "/Manish.png" },
    { name: <>Naresh Gupta</>, img: "/Naresh.jpeg" },
    { name: <>Sanjay Rai</>, img: "/Sanjay.jpeg" },
    { name: <>Vivek Jain</>, img: "/vivek.jpg" },
    { name: <>Ratnesh Baghel</>, img: "/Ratnesh.png" },
    { name: <>Saurabh Gaida</>, img: "/Saurabh.jpeg" },
  ];
  
  const nominated = [
    { name: <>Amit Singh</>, img: "/ob3amit.png" },
    { name: <> Lakhan Lal </>, img: "/photo8.png" },
    { name: <>Rakesh Baghel</>, img: "/rakesh.jpg" },
    { name: <>Bishan Singh</>, img: "/bishan.jpg" },
    { name: <> Ashok Anandani </>, img: "/photo3.png" },
    { name: <>Nikhil Bansal </>, img: "/nikhil_bansal.jpg" },
    { name: <> Vivek Bansal </>, img: "/vivek_nom.jpg" },
    { name: <>Rahul Richariya</>, img: "/rahul.jpg" },
    { name: <>Rajeev Babbar</>, img: "/rajeev.jpg" },
    { name: <> Atul Agarwal </>, img: "/atul_nom.jpg" },
    { name: <>CA Raman </>, img: "/raman.jpg" },
    { name: <>Mahesh Agarwal</>, img: "/mahesh.jpg" },
    { name: <>Alok Kankane</>, img: "/alok.jpg" },
    { name: <> Sunil Kumar Agarwal </>, img: "/sunil_nom.jpg" },
    { name: <>CA Jayant Mani</>, img: "/jayant.jpg" },
    { name: <>Vibhor Gupta</>, img: "/vibhor.jpg" },
    { name: <>Santosh Suri </>, img: "/photo10.png" },
    { name: <>Pavitra Khanna </>, img: "/pavitra_nom.jpg" },
    { name: <> Mukul Kalani </>, img: "/mukul.jpg" },
    { name: <> Shantanu Agarwal </>, img: "/shantanu.jpg" },
    // { name: <>Sh Brijesh<br/>Kumar Tripathi</>, img: "/brijesh.png" },
    // { name: <>Hari Mohan <br/>Bansal</>, img: "/harimohan.jpg" },
   
  ];

  const fadeInProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true },
  };

  return (
    <div className="h-fit overflow-hidden">
      <div>
        <Nav />
      </div>

      {/* Hero Section */}
      <motion.div className="px-10">
        <div
          className="hidden w-full min-h-[400px] lg:flex flex-col rounded-2xl items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/theChamber.png')" }}
        />
      </motion.div>

      {/* Side Label */}
      <div className="hidden xl:flex absolute left-0 w-full">
        <div className="absolute left-[-6.5rem] top-[9.5rem] text-black rotate-270 text-3xl tracking-wide">
          Connect with us
        </div>
        <div className="h-[20rem] w-1 rounded-4xl bg-black absolute left-10"></div>
      </div>

      {/* Title */}
      <h1 className="hidden md:block text-7xl text-center mt-10 text-orange-500 font-extrabold animate-bounce">
        The Chambers
      </h1>

      {/* Watermark */}
      <div className="relative">
        <div className="block absolute lg:left-[-5rem] md:top-[3rem] top-[15rem] left-[-7rem] opacity-50 z-0 pointer-events-none rotate-[250deg]">
          <Image
            src="/bg.png"
            alt="Background Watermark"
            width={800}
            height={500}
            className="object-contain"
            priority
          />
        </div>

        {/* Office Bearers */}
        <motion.h1
          {...fadeInProps}
          className="inline-block md:text-4xl text-2xl w-full font-bold md:font-extrabold text-orange-500 text-center mt-30 md:mb-10 mb-10 after:content-[''] after:block after:h-[5px] after:w-[30%] md:after:w-[15%] after:bg-orange-500 after:mx-auto after:mt-0 md:after:mt-1 after:rounded-full"
        >
          BCCI Office Bearers
        </motion.h1>


        {/* Members Zigzag */}
        <div className="relative w-full lg:px-40 lg:mt-10 mb-22 lg:space-y-[-80px] space-y-8">
          {members.map((member, index) => (
            <div
              key={index}
              className={`flex md:flex-row flex-col justify-center lg:items-center ${
                index % 2 === 0
                  ? "lg:justify-start items-start"
                  : "lg:justify-end items-end"
              }`}
            >
              {index % 2 === 0 ? (
                <div className="flex items-center space-x-4 ml-5 hover:scale-125 duration-300">
                  <div className="relative lg:w-62 w-40 lg:h-62 h-40">
                    <Image
                      src={member.img}
                      alt="member"
                      fill
                      className="rounded-full object-fit border-4 border-white bg-orange-200 shadow-lg"
                    />
                  </div>
                  <div className="relative bg-orange-500 text-white lg:px-6 px-3 py-2 lg:py-4 rounded-lg lg:max-w-[400px] max-w-[150px]">
                    <div className="lg:text-md text-xs font-semibold">
                      {member.name}
                    </div>
                    <div className="absolute top-1/2 left-[-10px] transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-r-orange-500 border-t-transparent border-b-transparent"></div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4 flex-row-reverse hover:scale-125 duration-300">
                  <div className="relative lg:w-62 w-40 lg:h-62 h-40">
                    <Image
                      src={member.img}
                      alt="member"
                      fill
                      className="rounded-full object-cover border-4 bg-orange-200 border-white shadow-lg"
                    />
                  </div>
                  <div className="relative bg-orange-500 text-white lg:px-6 px-3 py-2 m-5 lg:py-4 rounded-lg lg:max-w-[400px] max-w-[150px]">
                    <div className="lg:text-md text-xs font-semibold">
                      {member.name}
                    </div>
                    <div className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-l-orange-500 border-t-transparent border-b-transparent"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Executive Section with Scroll Arrows */}
      <div className="relative md:mt-0 -mt-52 mb-20 md:mb-0">
        <motion.h1
          {...fadeInProps}
          className="inline-block md:text-4xl text-2xl w-full font-bold md:font-extrabold text-orange-500 text-center mt-40 md:mb-10 mb-10 after:content-[''] after:block after:h-[5px] after:w-[30%] md:after:w-[15%] after:bg-orange-500 after:mx-auto after:mt-0 md:after:mt-1 after:rounded-full"
        >
          BCCI Elected Board
        </motion.h1>
      
        <div className="relative w-full md:px-20">
          <button
            onClick={() =>
              triggerScrollWithSpinner(executiveRef, -getScrollAmount(), setExecutiveLoading)
            }
            className="absolute z-10 top-1/2 left-5 transform -translate-y-1/2 bg-gray-500 p-2 rounded-full shadow-md hover:scale-110 transition"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() =>
              triggerScrollWithSpinner(executiveRef, getScrollAmount(), setExecutiveLoading)
            }
            className="absolute z-10 top-1/2 right-5 transform -translate-y-1/2 bg-gray-500 p-2 rounded-full shadow-md hover:scale-110 transition"
          >
            <ChevronRight />
          </button>

          {executiveLoading && (
            <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center bg-black/20 z-50">
              <LoadingSpinner />
            </div>
          )}

          <div
            ref={executiveRef}
            className="flex overflow-x-auto space-x-6 px-6 no-scrollbar scroll-smooth"
          >
            {executive.map((member, index) => (
             <div
               key={index}
               className="flex-shrink-0 group"
             >
               <div className="relative lg:w-64 w-32 lg:h-64 h-32 md:mt-10 mt-0 rounded-full overflow-hidden">
                 <Image
                   src={member.img}
                   alt="executive"
                   fill
                   className="object-fill transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                 />
                 {/* Overlay on hover */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               </div>
               <h1 className="text-nowrap text-center text-black mt-3 transition-colors duration-300 group-hover:text-orange-600">
                 {member.name}
               </h1>
             </div>
            ))}
          </div>
        </div>
      </div>



      <div className="relative md:mt-0 -mt-30 mb-20 md:mb-0">
        <motion.h1
          {...fadeInProps}
          className="inline-block md:text-4xl text-2xl w-full font-bold md:font-extrabold text-orange-500 text-center mt-40 md:mb-10 mb-10 after:content-[''] after:block after:h-[5px] after:w-[30%] md:after:w-[15%] after:bg-orange-500 after:mx-auto after:mt-0 md:after:mt-1 after:rounded-full"
        >
          BCCI Nominated Board
        </motion.h1>
      
        <div className="relative w-full md:px-20">
          {/* Scroll Buttons */}
          <button
            onClick={() =>
              triggerScrollWithSpinner(nominatedRef, -getScrollAmount(), setNominatedLoading)
            }
            className="absolute z-10 top-1/2 left-5 transform -translate-y-1/2 bg-gray-500 p-2 rounded-full shadow-md hover:scale-110 transition"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() =>
              triggerScrollWithSpinner(nominatedRef, getScrollAmount(), setNominatedLoading)
            }
            className="absolute z-10 top-1/2 right-5 transform -translate-y-1/2 bg-gray-500 p-2 rounded-full shadow-md hover:scale-110 transition"
          >
            <ChevronRight />
          </button>

          {nominatedLoading && (
            <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center bg-black/20 z-50">
              <LoadingSpinner />
            </div>
          )}
      
          <div
            ref={nominatedRef}
            className="flex overflow-x-auto space-x-6 px-6 no-scrollbar scroll-smooth"
          >
            {nominated.map((member, index) => (
             <div
               key={index}
               className="flex-shrink-0 group"
             >
               <div className="relative lg:w-64 w-32 lg:h-64 h-32 md:mt-10 mt-0 rounded-full overflow-hidden">
                 <Image
                   src={member.img}
                   alt="executive"
                   fill
                   className="object-fill transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                 />
                 {/* Overlay on hover */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               </div>
               <h1 className="text-nowrap text-center text-black mt-3 transition-colors duration-300 group-hover:text-orange-600">
                 {member.name}
               </h1>
             </div>
            ))}
          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
}

export default Page;
