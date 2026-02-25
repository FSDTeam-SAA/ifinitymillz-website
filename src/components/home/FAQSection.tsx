'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    id: 'item-1',
    question: 'How Does The Fundraising Platform Work For Schools?',
    answer:
      'Schools can create fundraising campaigns for specific projects or needs. Teachers submit project requests with funding goals, and donors can browse and contribute to campaigns that align with their values and interests.',
  },
  {
    id: 'item-2',
    question: 'How Are Donations Tracked For Each Student And Campaign?',
    answer:
      'Each donation is tracked through our secure platform, linked to the specific campaign and school. Donors receive confirmation emails and can monitor the progress of their funded projects in real-time.',
  },
  {
    id: 'item-3',
    question: 'Can I Donate Without Choosing A Specific Student?',
    answer:
      'Yes, absolutely. You can make general donations to schools or specific campaigns without designating funds for an individual student. Your contribution will support the greatest areas of need.',
  },
  {
    id: 'item-4',
    question: 'Will I Receive A Receipt After Donating?',
    answer:
      'Yes, you will receive a tax receipt via email immediately after your donation is processed. This receipt can be used for tax deduction purposes.',
  },
  {
    id: 'item-5',
    question: 'Are There Any Fees Deducted From Donations?',
    answer:
      'A small processing fee may apply depending on your payment method. We work to keep fees minimal so that the maximum amount reaches the schools and students who need it.',
  },
];

const INITIAL_COUNT = 3;

export function FAQSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, INITIAL_COUNT);

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-12">
          FAQ
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {visibleFaqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-b border-border last:border-b-0"
            >
              <AccordionTrigger className="py-4 sm:py-6 text-left hover:no-underline hover:text-primary transition-colors">
                <span className="text-base sm:text-lg font-medium text-foreground">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-foreground/70 pb-4 sm:pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {faqs.length > INITIAL_COUNT && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="mt-8 text-primary hover:text-primary/80 font-medium text-base sm:text-lg underline underline-offset-2 transition-colors"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </section>
  );
}