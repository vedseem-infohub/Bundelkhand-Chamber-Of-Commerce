"use client";
import React from "react";
import "./news.css";

const newsItems = [
  { src: "/Newz1.png", desc: "Honourable Minister of State for Industry Respected Shri Bhanu Pratap Verma Ji" },
  { src: "/Newz2.png", desc: "Ground Breaking Ceremony of Invest in UP" },
  { src: "/Newz3.png", desc: "Honouring our Divisional Commissioner for his contribution towards development of Bundelkhand" },
  { src: "/Newz4.png", desc: "Corona Vaccination Drive at Bijauli, Jhansi" },
  { src: "/Newzr1.jpg", desc: "Business meet to discuss wellfare of Bundelkhand" },
  { src: "/Newzr2.jpg", desc: "MLA Ravi Sharma came to discuss their ideas for development of Bundelkhand" },
  { src: "/Newzr3.jpg", desc: "All businessmen comes together to support the development of Bundelkhand" },
  { src: "/Newzr4.jpg", desc: "MLA Anurag Sharma showed us the right path for development of Bundelkhand" },
  { src: "/Newzr5.jpeg", desc:"Showcasing Presentation Of BIDA"},
  { src: "/Newzr6.jpeg", desc:"Discussion Over BIDA Project"},
  { src: "/Newzr7.jpeg", desc:"Opening of Bundelkhand Chamber Of Commerce Website"},
  { src: "/Newzr8.jpeg", desc:"Honouring To Mr. Anuraj Sharma Ji By Bundelkhand Chamber Of Commerce"},
  { src: "/Newzr9.jpeg", desc:"Discussion On Budget Of Bundelkhand Chamber Of Commerce"},
  { src: "/Newzr10.jpeg", desc:"Estimated Budget Of Bundelkhand Chamber Of Commerce 2025-26"},  
  { src: "/Newzr11.jpeg", desc:"MSME Gathering"},  
  { src: "/Newzr12.jpeg", desc:"MSME SUMMIT"},  
  { src: "/Newzr13.jpeg", desc:"MSME SUMMIT"},  
  { src: "/Newzr14.jpeg", desc:"MSME SUMMIT"},  
  { src: "/Newz6.jpeg", desc: "Felicitating GBC Ready Investors at Jhansi" },
  { src: "/Newz7.jpeg", desc: "Felicitating GBC Ready Investors at Jhansi" },
  { src: "/Newz8.jpeg", desc: "Bundelkhand Investor Summit at Jhansi" },
  { src: "/Newz9.jpeg", desc: "Bundelkhand Investor Summit at Jhansi" },
];

export default function News() {
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
        {newsItems.slice(0, 11).map((item, i) => (
          <NewsCard key={i} img={item.src} desc={item.desc} />
        ))}

        {/* Main News */}
        <div className="text-center px-1">
          <img
            src="/Newz5.png"
            alt="Main"
            className="w-full rounded-xl border-2 border-gray-300 mb-3"
          />
          <h2 className="hidden text-[22px] font-extrabold text-black mb-2">
            Industrial Development Meet at Jhansi - Honourable Member of Parliament Shri Anurag Sharma Ji
          </h2>
          <p className="text-[14px] text-gray-700 leading-relaxed">
            An industrial development meet organized by Bundelkhand Chamber Of Commerce and Industry was held at Jhansi. The meet was attended by Honourable Member of Parliament Shri Anurag Sharma Ji.
          </p>
        </div>

        {newsItems.slice(11).map((item, i) => (
          <NewsCard key={i + 4} img={item.src} desc={item.desc} />
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-row gap-6 h-[90vh] overflow-hidden">
        {/* Left Scroll */}
        <div className="w-1/4 overflow-hidden h-full">
          <div className="scroll-container h-full">
            <div className="scroll-content">
              {[...newsItems.slice(0, 11), ...newsItems.slice(0, 11)].map((item, i) => (
                <NewsCard key={i} img={item.src} desc={item.desc} />
              ))}
            </div>
          </div>
        </div>

        {/* Main News */}
        <div className="w-1/2 text-center border-x-4 flex flex-col justify-center items-center border-black px-8 py-8 overflow-y-hidden no-scrollbar">
          <img
            src="/Newz5.jpeg"
            alt="Main"
            className="w-full rounded-xl border-2 border-gray-300 mb-4"
          />
          <h2 className="text-[22px] font-extrabold text-black mb-2">
            MSME for Bharat
          </h2>
          <p className="text-[14px] text-gray-700 leading-relaxed">
             At the MSME for Bharat Conclave, BCCI President Mr. Dheeraj Khullar 
             highlighted the key challenges faced by traders and small businesses. 
             He emphasized the need for better access to credit, simplified 
             regulatory processes, and stronger market linkages to empower 
             entrepreneurs across the country.
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

        {/* Right Scroll */}
        <div className="w-1/4 overflow-hidden h-full">
          <div className="scroll-container h-full">
            <div className="scroll-content">
              {[...newsItems.slice(11), ...newsItems.slice(11)].map((item, i) => (
                <NewsCard key={i + 8} img={item.src} desc={item.desc} />
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
    <div className="text-left mb-4 sm:mb-6 px-1">
      <img
        src={img}
        alt="news"
        className="w-full h-60 object-cover rounded-xl border-2 border-gray-300 mb-2"
      />
      <p className="text-[14px] md:text-[14px] text-gray-700 leading-snug">
        {desc}
      </p>
    </div>
  );
}
