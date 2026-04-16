import { Subtitle } from "./subtitle";
import { PrimaryButton } from "./primary-button";

export function ContactSection() {
  return (
    <section className="bg-dark py-10 pb-36 px-4 md:px-20" dir="rtl">
      <div className="flex flex-col gap-10 items-start max-w-xl ml-auto">
        {/* Subtitle with light variant */}
        <Subtitle text="צרו קשר" light />

        {/* Content */}
        <div className="flex flex-col gap-2 items-start text-right">
          <h2 className="text-4xl text-highlight" style={{ fontSize: "36px" }}>
            נשמח לשמוע מכם
          </h2>
          <div className="text-white text-lg leading-relaxed">
            <p>לחתימה על הקוד, הערות או יצירת קשר מוזמנים ומוזמנות לפנות:</p>
            <p className="font-bold mt-1" dir="ltr" style={{ textAlign: "right" }}>
              surrogacy.ethics.il@gmail.com
            </p>
          </div>
        </div>

        {/* CTA */}
        <PrimaryButton href="mailto:surrogacy.ethics.il@gmail.com">
          כתבו לנו
        </PrimaryButton>
      </div>
    </section>
  );
}
