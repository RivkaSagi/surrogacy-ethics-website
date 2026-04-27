export function BGHalfCircle() {
  // Large circle background - only the TOP HALF is displayed
  // Requirements:
  // 1. Top of arc sticky at 15vh from top
  // 2. Bottom of arc aligned with bottom of viewport (100vh)
  // 3. Stops stickiness when bottom of circle reaches footer
  // 4. Works on all screen sizes including mobile
  // Uses the exact color from Figma design: #FCE5DD

  return (
    <div
      className="absolute pointer-events-none z-0 left-0 right-0 flex justify-center"
      style={{
        top: "200px", // Positioned 200px from top per design specs
        bottom: "300px", // Stop exactly at top of footer
      }}
    >
      <div
        className="sticky overflow-hidden flex justify-center"
        style={{
          top: "15vh", // Sticky position - top of arc
          height: "85vh", // Bottom of arc at 100vh (15vh + 85vh)
          width: "100vw",
        }}
      >
        {/*
          The half-circle needs width = 2 * height to form a proper semicircle
          Height is 85vh, so width should be 170vh
          We use a container that's 100vw and center the SVG
        */}
        <svg
          viewBox="0 0 100 50"
          className="h-full"
          style={{
            width: "170vh", // 2x height for proper semicircle proportions
            minWidth: "100vw", // Never narrower than viewport
          }}
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
