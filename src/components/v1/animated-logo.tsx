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

  return (
    <svg
      viewBox="0 0 257 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ overflow: "visible" }}
    >
      {/* Static elements - main circles */}
      <circle cx="129.676" cy="75" r="60" stroke="black" strokeWidth="2" />
      <circle cx="169.676" cy="40" r="39" stroke="black" strokeWidth="2" />
      <circle cx="146.342" cy="63.3346" r="7" fill="black" />

      {/* Animated balance scale */}
      <g
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "146.342px 63.3346px",
          transformBox: "fill-box",
        }}
      >
        <line
          x1="0.258819"
          y1="67.2163"
          x2="251.4"
          y2="134.509"
          stroke="black"
          strokeWidth="2"
        />
        <circle cx="11.1614" cy="53.5732" r="6" stroke="black" strokeWidth="2" />
        <circle cx="248.779" cy="117.243" r="6" stroke="black" strokeWidth="2" />
      </g>
    </svg>
  );
}
