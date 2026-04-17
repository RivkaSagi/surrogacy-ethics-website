interface BulletItemProps {
  title: string;
  description: React.ReactNode;
}

export function BulletItem({ title, description }: BulletItemProps) {
  return (
    <div className="relative flex flex-col gap-2 items-end max-w-[620px] w-full">
      {/* Decorative circle - peachy/salmon color #FFC5B2 */}
      <div className="absolute -right-3 md:-right-5 -top-2 md:-top-3 w-10 md:w-14 h-10 md:h-14 rounded-full bg-[#FFC5B2]" />

      {/* Title */}
      <h2 className="relative text-2xl md:text-4xl text-text text-right w-full">
        {title}
      </h2>

      {/* Description */}
      <p className="relative text-base md:text-lg text-text text-right w-full leading-relaxed">
        {description}
      </p>
    </div>
  );
}
