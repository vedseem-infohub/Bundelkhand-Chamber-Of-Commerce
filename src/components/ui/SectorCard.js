'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function SectorCard({ name, image, description }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`transition-all duration-500 ease-in-out bg-orange-500 rounded-xl shadow-lg overflow-hidden 
        ${hovered ? 'h-[500px]' : 'h-[150px]'} w-full cursor-pointer relative`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <>
          {/* Image block (top 2/3) */}
          <div className="h-2/3 relative bg-white">
            <Image
              src={image}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="rounded-xl bg-white"
            />

            {/* Black overlay with description */}
            <div className="absolute bottom-0 inset-0 flex items-end justify-center">
              <p className="text-white text-sm md:text-base lg:text-md font-medium text-center bg-black/60 rounded-b-lg px-3 py-6">
                {description}
              </p>
            </div>
          </div>

          {/* White separator */}
          <div className="h-[10px] w-full bg-white" />
        </>
      )}

      {/* Text block */}
      <div
        className={`flex flex-col items-center justify-center text-xs p-4 text-white md:font-semibold lg:font-bold text-center 
        ${hovered ? 'h-1/3' : 'h-full'}`}
      >
        <p className="text-sm md:text-lg font-sans font-medium">{name.toUpperCase()}</p>
        {!hovered && <span className="mt-2 text-lg md:text-xl">↑</span>}
      </div>
    </div>
  );
}
