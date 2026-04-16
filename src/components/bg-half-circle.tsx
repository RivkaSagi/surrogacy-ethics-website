export function BGHalfCircle() {
  // Large circle background - only the TOP HALF is displayed
  // Requirements:
  // 1. Top of arc at ~80vh (25vh from top - middle of logo area)
  // 2. Circle sides extend to/beyond viewport edges
  // 3. Sticky - starts lower, ends higher (before footer)
  // Uses the exact color from Figma design: #FCE5DD
  return (
    <div
      className="absolute pointer-events-none z-0 left-0 right-0 flex justify-center"
      style={{
        top: "300px", // Start lower (around middle of logo section)
        bottom: "200px", // End higher (before footer)
      }}
    >
      <div
        className="sticky overflow-hidden"
        style={{
          top: "15vh", // Sticky position - arc top at ~85vh
          width: "110vw",
          height: "55vw",
        }}
      >
        <svg
          viewBox="0 0 100 50"
          className="w-full h-full"
          preserveAspectRatio="xMidYMin slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top half of circle - viewBox only shows top half */}
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="#FCE5DD"
          />
        </svg>
      </div>
    </div>
  );
}
