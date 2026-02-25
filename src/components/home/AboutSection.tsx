'use client';

export function AboutSection() {
  return (
    <section
      className="relative bg-secondary bg-cover bg-center min-h-[500px] flex items-center"
      style={{ backgroundImage: "url('/images/aboutbg.png')" }}
    >
      {/* #E4F3FF overlay */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: '#E4F3FF', opacity: 0.85 }} />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 sm:py-16 lg:py-24">
        <div className="text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-slate-800 tracking-tight mb-7">
            About us
          </h2>

          <p className="font-serif text-base sm:text-lg text-slate-600 leading-loose text-justify [text-align-last:center]">
            Lorem ipsum dolor sit amet consectetur. Aliquam pellentesque urna et sed ultricies est
            dolor varius. Elementum aliquam tristique nunc condimentum mauris. Nec leo molestie
            gravida viverra sed posuere hendrerit vestibulum in. Eu nulla duis tortor urna volutpat
            enim magna sed. Vestibulum mattis praesent pharetra euismod in. Ac tellus donec in porta
            pretium. Nascetur semper enim urna sapien vel est nam posuere. Dignissim enim nam
            phasellus purus ut consequat suspendisse. Vitae ac ac urna et tortor libero donec. Eget
            sit bibendum pulvinar tellus nunc volutpat nunc. Urna consequat elit aliquam interdum
            feugiat.
          </p>
        </div>
      </div>
    </section>
  );
}