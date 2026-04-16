interface BulletItemProps {
  title: string;
  description: React.ReactNode;
}

export function BulletItem({ title, description }: BulletItemProps) {
  return (
    <div className="relative flex flex-col gap-2 items-end max-w-[620px] w-full">
      {/* Decorative circle - peachy/salmon color #FFC5B2 */}
      <div className="absolute -right-5 -top-3 w-14 h-14 rounded-full bg-[#FFC5B2]" />

      {/* Title */}
      <h2 className="relative text-4xl text-text text-right w-full" style={{ fontSize: "36px" }}>
        {title}
      </h2>

      {/* Description */}
      <p className="relative text-lg text-text text-right w-full leading-relaxed" style={{ fontSize: "18px" }}>
        {description}
      </p>
    </div>
  );
}
