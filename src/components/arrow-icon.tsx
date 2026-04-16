interface ArrowIconProps {
  className?: string;
}

export function ArrowIcon({ className = "" }: ArrowIconProps) {
  // North-east arrow from Figma, flipped for RTL (points upper-left)
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: "rotate(180deg) scaleY(-1)" }}
    >
      <path
        d="M5.4 20L4 18.6L15.6 7H9V5H19V15H17V8.4L5.4 20Z"
        fill="currentColor"
      />
    </svg>
  );
}
