import Image from "next/image";
import { Subtitle } from "./subtitle";

const partners = [
  { name: "בריא", logo: "/bria.png" },
  { name: "האגודה", logo: "/haaguda.png" },
];

export function PartnersSection() {
  return (
    <section className="flex flex-col gap-10 items-center py-20 px-4 md:px-20 border-b border-border">
      <Subtitle text="שותפים" />

      <div className="flex flex-wrap items-center justify-center gap-16">
        {partners.map((partner) => (
          <div key={partner.name} className="relative h-20 w-48">
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
