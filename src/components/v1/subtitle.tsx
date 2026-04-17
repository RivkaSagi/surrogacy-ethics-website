interface SubtitleProps {
  text: string;
  className?: string;
  light?: boolean;
}

export function Subtitle({ text, className = "", light = false }: SubtitleProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`absolute bottom-0 left-0 right-0 h-3 ${
          light ? "bg-primary" : "bg-highlight"
        }`}
      />
      <h3
        className={`relative font-bold text-lg ${
          light ? "text-white" : "text-text"
        }`}
      >
        {text}
      </h3>
    </div>
  );
}
