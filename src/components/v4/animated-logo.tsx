"use client";

import { useEffect, useState } from "react";

export function AnimatedLogo() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 0.5; // Animation over 50vh

      const progress = Math.min(scrollY / maxScroll, 1);
      const newRotation = -(progress * 35); // 0 to -35 degrees (more rotation)

      setRotation(newRotation);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pivot point - where line crosses the big circle on the right side
  const pivotX = 132;
  const pivotY = 103;

  return (
    <svg
      viewBox="5 25 210 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ overflow: "visible" }}
    >
      {/* Static elements - main circles from v4 Figma */}
      {/* Big circle: center (127, 120), r=60 - same as v2 */}
      <circle cx="92.29" cy="81.74" r="41" stroke="black" strokeWidth="2" />
      {/* Upper circle */}
      <circle cx="122" cy="57" r="27" stroke="black" strokeWidth="2" />
      {/* Filled dot at intersection */}
      <circle cx="110" cy="76" r="5" fill="black" />

      {/* Animated balance scale - from v4 Figma coordinates */}
      <g
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: `${pivotX}px ${pivotY}px`,
        }}
      >
        {/* Line connecting the two small balance circles */}
        <line
          x1="15"
          y1="70"
          x2="215"
          y2="128"
          stroke="black"
          strokeWidth="2"
        />
        {/* Left small circle - near line start */}
        <circle cx="23" cy="61" r="5" stroke="black" strokeWidth="2" />
        {/* Right small circle - near line end */}
        <circle cx="210" cy="115" r="5" stroke="black" strokeWidth="2" />
      </g>
    </svg>
  );
}
