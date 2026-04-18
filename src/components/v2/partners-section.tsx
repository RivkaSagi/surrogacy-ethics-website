import Image from "next/image";
import { Subtitle } from "./subtitle";

const partners = [
  { name: "בריא", logo: "/bria.png" },
  { name: "האגודה", logo: "/haaguda.png" },
];

export function PartnersSection() {
  return (
    <section className="flex flex-col gap-8 md:gap-10 items-center py-12 md:py-20 px-5 md:px-20 border-b border-border">
      <Subtitle text="שותפים" />

      {/* Grid on mobile (2 columns), flex on desktop */}
      <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-8 md:gap-16">
        {partners.map((partner) => (
          <div key={partner.name} className="relative h-16 w-36 md:h-20 md:w-48 mx-auto">
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
