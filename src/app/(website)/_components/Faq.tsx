"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "How do I enter?",
    answer:
      "Simply browse our active campaigns, select the one you want to enter, and choose a free or paid entry option. Your ticket is generated instantly upon checkout.",
  },
  {
    question: "Do I get ticket numbers instantly?",
    answer:
      "Yes. All ticket numbers are generated and delivered to your secure dashboard the moment you complete your entry — no waiting required.",
  },
  {
    question: "How are winners chosen?",
    answer:
      "Winners are selected through an independently audited live draw process. Every draw is streamed publicly and conducted with full transparency.",
  },
  {
    question: "Can I enter for free?",
    answer:
      "Yes, every campaign includes a free entry option. Paid entries increase your chances proportionally, but everyone has a fair opportunity to win.",
  },
  {
    question: "How do I know if I won?",
    answer:
      "You will receive an email notification and an in-dashboard alert immediately after the draw. Winners are also announced publicly on our platform.",
  },
  {
    question: "When do withdrawals appear?",
    answer:
      "Cash prize withdrawals are processed within 1–3 business days and will appear in your registered bank account or wallet.",
  },
  {
    question: "How will I receive my prize?",
    answer:
      "Prizes are delivered based on type — cash prizes via bank transfer, physical prizes via courier, and experience prizes via our concierge team.",
  },
];

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#1e1e1e] bg-[#111111]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-white text-sm font-medium">{question}</span>
        <ChevronDown
          size={18}
          className={`text-[#555555] shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-[#666666] text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

function FAQ() {
  return (
    <section className="w-full bg-[#0a0a0a] py-20 px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-white text-2xl font-bold mb-2">
            Frequently asked questions
          </h2>
          <p className="text-[#555555] text-sm">
            Get Answers For your questions
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-2">
          {FAQS.map((faq) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;