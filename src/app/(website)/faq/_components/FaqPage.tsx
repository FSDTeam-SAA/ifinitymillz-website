"use client"

import React, { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type FaqCategory = {
  id: string
  label: string
  icon: React.ReactNode
}

type FaqItem = {
  id: string
  categoryId: string
  question: string
  answer: string
}

const FAQ_CATEGORIES: FaqCategory[] = [
  { id: "funding-basics", label: "Funding basics", icon: <ChevronRight className="w-5 h-5" /> },
  { id: "withdrawals", label: "Withdrawals", icon: <ChevronRight className="w-5 h-5" /> },
  { id: "account", label: "Account", icon: <ChevronRight className="w-5 h-5" /> },
  { id: "donations", label: "Donations", icon: <ChevronRight className="w-5 h-5" /> },
]

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "q1",
    categoryId: "funding-basics",
    question: "What if I don't reach my fundraising target?",
    answer:
      "Don't worry! Most platforms allow you to keep whatever funds you raise, even if you don't hit your target.",
  },
  {
    id: "q2",
    categoryId: "funding-basics",
    question: "When will I receive my funds?",
    answer:
      "Funds are typically available within 2–5 business days after a donation is made.",
  },
]

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("funding-basics")
  const [openId, setOpenId] = useState<string | null>(null)

  const filteredFaqs = FAQ_ITEMS.filter(
    (faq) => faq.categoryId === activeCategory
  )

  return (
    <section className="bg-gray-100 py-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
          Frequently Asked Questions
        </h2>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Category Sidebar */}
          <div className="w-full lg:w-[320px] bg-white rounded-2xl shadow-sm overflow-hidden">
            {FAQ_CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategory
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setOpenId(null)
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-6 py-5 text-sm font-medium border-b last:border-none transition-all",
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <span>{cat.label}</span>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 transition",
                      isActive ? "text-blue-600" : "text-gray-400"
                    )}
                  />
                </button>
              )
            })}
          </div>

          {/* FAQ Accordion */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm px-8 py-6 divide-y">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item) => {
                const isOpen = openId === item.id
                return (
                  <div key={item.id} className="py-5">
                    <button
                      onClick={() =>
                        setOpenId(isOpen ? null : item.id)
                      }
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="text-base font-medium text-gray-800">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>

                    {isOpen && (
                      <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    )}
                  </div>
                )
              })
            ) : (
              <p className="text-center text-gray-400 py-10">
                No FAQs available.
              </p>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-20">
          <div className="relative h-56 rounded-2xl overflow-hidden group">
            <Image
              src="/images/b-success-1.jpg"
              alt="Discover campaigns"
              fill
              className="object-cover brightness-75 group-hover:brightness-60 transition"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-5 px-6">
              <p className="text-white text-xl font-bold">
                Discover amazing fundraising campaigns
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                Fund someone
              </button>
            </div>
          </div>

          <div className="relative h-56 rounded-2xl overflow-hidden group">
            <Image
              src="/images/b-success-2.jpg"
              alt="Start fundraising"
              fill
              className="object-cover brightness-75 group-hover:brightness-60 transition"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-5 px-6">
              <p className="text-white text-xl font-bold">
                Create your campaign
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                Start fundraising
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}