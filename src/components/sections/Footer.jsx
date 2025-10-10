import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { Mail } from 'lucide-react';

function Footer() {
  return (
    <div className="relative w-full min-h-fit flex flex-col overflow-hidden">
      
      {/* Left banner */}
      <div className="hidden flex-1 lg:flex justify-center">
          <img
            src="/nav1.png"
            alt="nav1"
            className="w-[60%] h-full absolute xl:top-[-2.3rem] xl:left-[10rem] xl:w-[65%] lg:top-[-0.8rem] lg:left-[6rem] lg:w-[65%] z-0 object-contain"
          />
        </div>
  
        {/* Providing extra height to footer */}
        <div className="hidden md:block w-[80px] sm:w-[100px] md:w-[130px] lg:w-[360px] opacity-0">
          <img src="/statue.png" alt="statue" className="w-full h-full object-contain" />
        </div>


        {/* Right Statue */}
        <div className="hidden lg:block w-[90px] sm:w-[100px] md:w-[130px] xl:w-[290px] xl:right-[6.5rem] xl:top-[8rem] lg:w-[200px] lg:right-[5rem] lg:top-[14.3rem] absolute ">
          <img src="/statue.png" alt="statue" className="w-full h-full object-contain" />
        </div>

      
      {/* Desktop Background Images */}
      <div className="hidden lg:flex w-full justify-center items-center bg-white pt-12 pb-6">
        <div className="w-[90%] rounded-3xl bg-orange-500 px-16 py-12 text-white relative">
          <div className="flex justify-between flex-wrap gap-10">
      
            {/* Left: Logo & Tagline */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Image src="/logo.png" alt="BCCI Logo" width={60} height={60} />
                <h1 className="text-5xl font-extrabold">BCCI</h1>
              </div>
              <p className="text-lg font-medium">Drive Your Business To<br /> Success With Us</p>
            </div>
      
            {/* Middle: Location */}
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold mb-5">How To Find Us</h2>
              <p className="text-lg">Hankul Packwell Pvt Ltd.</p>
              <p className="text-lg">Pal colony lane.</p>
              <p className="text-lg">Gwalior Road, Jhansi 284003.</p>
            </div>
      
            {/* Middle: Chamber Links */}
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">Chamber</h2>
              <ul className="flex flex-col gap-1 text-lg">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/about" className="hover:underline">About Us</Link>
                <Link href="/services" className="hover:underline">Services</Link>
                <Link href="/" className="hover:underline">Contact Us</Link>
              </ul>
            </div>
      
            {/* Right: Social Links */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Social Links</h2>
              <div className="flex gap-4">
                 <Link href="https://x.com/Bundelkhan85128?t=Fmh9L5FbnKQc2rJ1Z4IaCw&s=09"><FaTwitter size={30} /></Link>
                 <Link href="https://www.instagram.com/bundelkhand.chamberofcommerce?igsh=MWI4YjIzenpnd2lwcw=="><FaInstagram size={30} /></Link>
                 <Link href="https://youtube.com/@bundelkhandchamberofcommerce?si=eICTBzQNq0XHK6Qz"><FaYoutube size={30} /></Link>
              </div>
                  
             <a
               href="tel:+91 98765 43210" 
               className="flex items-center gap-2 text-lg">
               <FiPhone className="text-white" />
               <span >+91 98765 43210</span>
             </a>
             <a
               href="bccijhansi@gmail.com"  
               className="flex items-center gap-2 text-lg">
               <Mail className="text-white" />
               <span >bccijhansi@gmail.com</span>
             </a>
            </div>
          </div>
      
          {/* White Bar with Copyright */}
          <div className="w-[90%] mx-auto mt-12 h-[40px] bg-white text-black rounded-full flex items-center justify-center text-sm font-semibold">
            Copyright © 2025 Bundelkhand Chamber Of Commerce And Industry
          </div>
        </div>
      </div>


      {/* Fallback background color for mobile/tablet */}


      {/* <div className="lg:hidden w-full h-[200px] bg-[#1a1a1a] mb-10"></div> */}

      {/* Footer Content */}
      <div className="w-full px-5 lg:px-20 py-10 lg:absolute mb-[-0.3rem] lg:top-[30rem] grid grid-cols-1 md:grid-cols-2 lg:hidden items-center justify-between gap-12 bg-[#1a1a1a]">
        {/* Logo and tagline */}
        <div className="flex flex-col items-center lg:items-start gap-6 text-white mt-7">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="BCCI Logo"
              width={60}
              height={60}
              className="object-contain"
            />
            <h1 className="text-4xl lg:text-6xl font-extrabold">BCCI</h1>
          </div>
          <h5 className="text-center lg:text-left text-md lg:text-lg">
            Drive your business to <br /> success with us
          </h5>
        </div>

        {/* Location */}
        <div className="flex flex-col items-center lg:items-start text-white ">
          <h2 className="text-xl font-semibold mb-3">How To Find Us</h2>
          <p className="text-lg">Hankhul Packwell Pvt Ltd.</p>
          <p className="text-lg">Pal colony lane.</p>
          <p className="text-lg">Gwalior Road.</p>
          <p className="text-lg"> Jhansi 284003.</p>
        </div>


        {/* Navigation Links */}
        <div className="flex flex-col items-center lg:items-start text-white gap-3">
          <h1 className="text-xl font-semibold">Chamber</h1>
          <ul className="flex flex-col gap-1 items-center">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About Us</Link>
            <Link href="/servicesPage" className="hover:underline">Services</Link>
            <Link href="/" className="hover:underline">Contact Us</Link>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center lg:items-start text-white gap-3">
          <h1 className="text-xl font-semibold">Social Links</h1>
          <div className="flex gap-4">
            <Link href="https://x.com/Bundelkhan85128?t=Fmh9L5FbnKQc2rJ1Z4IaCw&s=09"><FaTwitter size={30} /></Link>
            <Link href="https://www.instagram.com/bundelkhand.chamberofcommerce?igsh=MWI4YjIzenpnd2lwcw=="><FaInstagram size={30} /></Link>
            <Link href="https://youtube.com/@bundelkhandchamberofcommerce?si=eICTBzQNq0XHK6Qz"><FaYoutube size={30} /></Link>
          </div>
          <a
            href="tel:+91 98765 43210" 
            className="flex items-center gap-2 text-lg">
            <FiPhone className="text-white" />
            <span >+91 98765 43210</span>
          </a>
          <a
            href="bccijhansi@gmail.com"  
            className="flex items-center gap-2 text-lg">
            <Mail className="text-white" />
            <span >bccijhansi@gmail.com</span>
          </a>
        </div>
      </div>
      {/* Copyright */}
      <div className="block lg:hidden w-full bg-black text-white text-xs text-center mb-[-0.3rem] py-4">
        © 2025 Bundelkhand Chamber of Commerce and Industry
      </div>

    </div>
  );
}

export default Footer;
