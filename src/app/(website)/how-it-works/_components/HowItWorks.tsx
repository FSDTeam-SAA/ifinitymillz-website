import React from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const HOW_IT_WORKS_STEPS = [
  {
    icon: "/images/how1.png", // replace with your actual asset
    title: "Create your page in four easy steps",
  },
  {
    icon: "/images/how2.png",
    title: "Share it with your world and beyond",
  },
  {
    icon: "/images/how3.png",
    title: "Accept donations with credit/debit cards",
  },
];

const FEATURES = [
  "Crowdfund anything!",
  "Ongoing access to funds",
  "Easy 4 minutes setup",
  "Proven platform millions raised!",
  "Privacy & campaign password protection options",
  "Crowdfund anything!",
];

const SUCCESS_STORY = {
  title: "The Hope for Children Fund",
  description:
    "A donation campaign created to support underprivileged children with food, education, and basic healthcare. Every contribution helps give a child a safer, healthier future.",
  donors: 52,
  raised: "$12,450",
  image: "/images/success.png", // replace with actual
  link: "#",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-[30px] sm:text-[38px] lg:text-[36px] text-[#131313] font-medium ">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base font-medium text-[#131313] mt-1">{subtitle}</p>
      )}
    </div>
  );
}

// ─── Section 1: How It Works ─────────────────────────────────────────────────

function HowItWorksSteps() {
  return (
    <section className="py-14 px-4 bg-white">
      <div className="container mx-auto">
        <SectionTitle title="Here's how it works" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-4"
            >
              {/* Icon box */}
              <div className="w-[238px] h-[168px] flex items-center justify-center overflow-hidden relative">
                <Image
                  src={step.icon}
                  alt={step.title}
                  fill
                  className="object-contain p-2"
                />
              </div>
              {/* Underline accent */}
              {/* <div className="w-20 h-0.5 bg-green-500 rounded-full" /> */}
              <p className="text-[20px] text-gray-700 font-medium leading-[150%] max-w-[240px]">
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: Raise More Money ─────────────────────────────────────────────

function RaiseMoreMoney({
  companyName = "(company_name)",
}: {
  companyName?: string;
}) {
  return (
    <section className="py-14 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title={`Raise mroe money with ${companyName}`}
          subtitle="Features that help you raise money from more people"
        />

        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Piggy bank illustration */}
          <div className="hidden md:flex flex-shrink-0 items-center justify-end">
            <div className="relative w-[199px] h-[200px]">
              <Image
                src="/images/animal.png"
                alt="Piggy bank"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Feature grid — 3 columns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-x-12 gap-y-12">
            {[0, 1, 2].map((col) =>
              FEATURES.map((feature, i) => (
                <div
                  key={`${col}-${i}`}
                  className="flex items-start gap-2 w-[290px]"
                >
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center gap-6">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  <p className="text-[20px] font-normal text-[#131313] leading-[150%]">
                    {feature}
                  </p>
                </div>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Success Stories ───────────────────────────────────────────────

function SuccessStories() {
  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionTitle  title="Success Stories " />

        <div className="relative">
          {/* Prev arrow */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50 transition"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          {/* Card */}
          <div className="flex flex-col sm:flex-row overflow-hidden rounded-lg shadow-sm">
            {/* Text */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center gap-3">
              <h3 className="text-lg font-bold text-gray-900">
                {SUCCESS_STORY.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {SUCCESS_STORY.description}
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {SUCCESS_STORY.donors} donors raised {SUCCESS_STORY.raised}
              </p>
              <Link
                href={SUCCESS_STORY.link}
                className="text-sm font-semibold text-blue-600 hover:underline w-fit"
              >
                View Fundraiser
              </Link>
            </div>

            {/* Image */}
            <div className="relative w-full sm:w-48 md:w-56 h-52 sm:h-auto flex-shrink-0">
              <Image
                src={SUCCESS_STORY.image}
                alt={SUCCESS_STORY.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Next arrow */}
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50 transition"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: CTA Banners ───────────────────────────────────────────────────

function CTABanners() {
  return (
    <section className="px-4 pb-14 bg-white">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Fund someone */}
        <div className="relative h-72 sm:h-80 rounded-lg overflow-hidden group">
          <Image
            src="/images/b-success-1.jpg"
            alt="Discover amazing fundraising campaigns"
            fill
            className="object-cover brightness-75 group-hover:brightness-65 transition duration-300"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-white font-bold text-xl leading-tight">
              Discover amazing
              <br />
              fundraising campaigns
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded transition">
              Fund someone
            </button>
          </div>
        </div>

        {/* Start donating */}
        <div className="relative h-72 sm:h-80 rounded-lg overflow-hidden group">
          <Image
            src="/images/b-success-2.jpg"
            alt="Create your campaign"
            fill
            className="object-cover brightness-75 group-hover:brightness-65 transition duration-300"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-white font-bold text-xl leading-tight">
              Create your campaign
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded transition">
              Start donating
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function HowItWorks() {
  return (
    <main className="font-sans">
      <HowItWorksSteps />
      <RaiseMoreMoney />
      <SuccessStories />
      <CTABanners />
    </main>
  );
}
