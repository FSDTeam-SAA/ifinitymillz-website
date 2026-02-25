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
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-14">
        Start Your Donation
      </h1>

      <div className="flex flex-col sm:flex-row gap-16 w-full max-w-6xl items-start">
        {/* Stepper Sidebar */}
        <div className="bg-white p-6 w-full sm:w-56 lg:w-[350px] shadow-[0px_1px_17.4px_0px_#00000040] mt-3">
          {steps.map((step) => {
            const isActive = step.id === activeStep;
            return (
              <div key={step.id} className="mb-6 last:mb-0">
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 flex-shrink-0 ${
                      isActive
                        ? 'border-blue-600 text-blue-600'
                        : 'border-gray-300 text-gray-400'
                    }`}
                  >
                    {step.id}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {step.description && (
                  <p className="text-xs text-gray-400 leading-relaxed pl-11">
                    {step.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Form */}
        <div className="flex-1 w-full">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-5">
            Donor information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            {/* Country + City */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* Donation Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donation amount
              </label>
              <input
                type="number"
                name="donationAmount"
                value={form.donationAmount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 accent-blue-600 cursor-pointer"
              />
              <label htmlFor="agree" className="text-xs text-gray-600 cursor-pointer leading-relaxed">
                I agree to [company name] terms, privacy policy, and industry low fees
              </label>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={!agreed}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-lg transition-colors"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}