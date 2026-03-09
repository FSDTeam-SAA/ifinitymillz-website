'use client';

import { useState } from 'react';

const steps = [
  {
    id: 1,
    label: 'Donor information',
    description: 'Set essential fundraiser details such as fundraiser, target and currency.',
  },
  {
    id: 2,
    label: 'Payment Methods',
    description: '',
  },
];

export default function DonorInformation() {
  const [activeStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    country: '',
    city: '',
    donationAmount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle continue
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center px-4 py-20">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-[36px] font-medium text-[#131313] mb-14">
        Start Your Donation  
      </h1>

      <div className="flex flex-col sm:flex-row gap-16 w-full max-w-6xl items-start">
        {/* Stepper Sidebar */}
        <div className="bg-white p-6 w-full sm:w-56 lg:w-[350px] shadow-[0px_1px_17.4px_0px_#00000040] rounded-[8px] mt-3">
          {steps.map((step, index) => {
            const isActive = step.id === activeStep;
            const isLast = index === steps.length - 1;
            return (
              <div key={step.id} className="pb-8 last:pb-0">
                <div className="flex items-start gap-5">
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-medium border-2 ${
                        isActive
                          ? 'border-blue-600 text-[#131313]'
                          : 'border-gray-200 text-gray-400'
                      }`}
                    >
                      {step.id}
                    </div>
                    {!isLast && (
                      <div className="absolute left-1/2 top-14 -translate-x-1/2 h-16 w-px bg-gray-200" />
                    )}
                  </div>
                  <div className="pt-2">
                    <div className="text-lg font-medium text-blue-600">
                      {step.label}
                    </div>
                    {step.description && (
                      <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <div className="flex-1 w-full">
          <h2 className="text-xl sm:text-[36px] font-medium text-[#131313] mb-7">
            Donor information 
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xl font-medium text-[#131313] mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xl font-medium text-[#131313] mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-xl font-medium text-[#131313] mb-1">Mobile</label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            {/* Country + City */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xl font-medium text-[#131313] mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xl font-medium text-[#131313] mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* Donation Amount */}
            <div>
              <label className="block text-xl font-medium text-[#131313] mb-1">
                Donation amount
              </label>
              <input
                type="number"
                name="donationAmount"
                value={form.donationAmount}
                onChange={handleChange}
                className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 bg-[#E4F3FF] border border-blue-100 rounded-lg px-4 py-3">
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 accent-blue-600 cursor-pointer"
              />
              <label htmlFor="agree" className="text-base text-[#000000] cursor-pointer leading-relaxed">
                I agree to [company name] terms, privacy policy, and industry low fees
              </label>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={!agreed}
              className="w-full bg-[#0024DA] hover:bg-[#0024DA]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold h-[56px] rounded-[8px] transition-colors"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
