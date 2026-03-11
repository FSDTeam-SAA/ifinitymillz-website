// 'use client';

// import { useMutation } from '@tanstack/react-query';
// import { useState } from 'react';
// import { useSearchParams } from 'next/navigation';

// const steps = [
//   {
//     id: 1,
//     label: 'Donor information',
//     description: 'Set essential fundraiser details such as fundraiser, target and currency.',
//   },
//   {
//     id: 2,
//     label: 'Payment Methods',
//     description: '',
//   },
// ];

// export default function DonorInformation() {
//   const [activeStep] = useState(1);
//   const [agreed, setAgreed] = useState(false);
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     country: '',
//     city: '',
//     donationAmount: '',
//   });

//   const searchParams = useSearchParams();
//   const campaignId = searchParams.get('campaignId');
//   const campaignName = searchParams.get('campaignName') || 'Campaign Donation';

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const paymentMutation = useMutation({
//     mutationFn: async () => {
//       // ✅ Stripe redirect এর আগে localStorage এ data save করা হচ্ছে
//       // Stripe redirect করলেও browser এ data থাকবে
//       const donorData = {
//         donorName:    form.name,
//         donorEmail:   form.email,
//         donorMobile:  form.mobile,
//         donorCountry: form.country,
//         donorCity:    form.city,
//         amount:       form.donationAmount,
//         campaignName: campaignName,
//       };
//       localStorage.setItem('donorData', JSON.stringify(donorData));

//       const successUrl = `${window.location.origin}/donor-payment-methods`;

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donation/create-donation-session`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             campaignId,
//             donor: {
//               name:    form.name,
//               email:   form.email,
//               mobile:  form.mobile,
//               country: form.country,
//               city:    form.city,
//             },
//             amount:     Number(form.donationAmount),
//             successUrl,
//           }),
//         }
//       );

//       if (!res.ok) throw new Error('Failed to create donation session');
//       const data = await res.json();
//       return data;
//     },
//     onSuccess: (data) => {
//       const url = data?.data?.url;
//       if (url) {
//         window.location.href = url;
//       }
//     },
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!agreed) return;
//     paymentMutation.mutate();
//   };

//   const isFormValid =
//     agreed &&
//     form.name.trim() &&
//     form.email.trim() &&
//     form.donationAmount.trim();

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-4 py-20">
//       <h1 className="text-2xl sm:text-[36px] font-medium text-[#131313] mb-14">
//         Start Your Donation
//       </h1>

//       <div className="flex flex-col sm:flex-row gap-16 w-full max-w-6xl items-start">
//         {/* Stepper Sidebar */}
//         <div className="bg-white p-6 w-full sm:w-56 lg:w-[350px] shadow-[0px_1px_17.4px_0px_#00000040] rounded-[8px] mt-3">
//           {steps.map((step, index) => {
//             const isActive = step.id === activeStep;
//             const isCompleted = step.id < activeStep;
//             const isLast = index === steps.length - 1;
//             return (
//               <div key={step.id} className="pb-8 last:pb-0">
//                 <div className="flex items-start gap-5">
//                   <div className="relative flex-shrink-0">
//                     <div
//                       className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-medium border-2 ${
//                         isActive
//                           ? 'border-blue-600 text-[#131313]'
//                           : isCompleted
//                           ? 'border-blue-600 bg-blue-600 text-white'
//                           : 'border-gray-200 text-gray-400'
//                       }`}
//                     >
//                       {isCompleted ? (
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                         </svg>
//                       ) : (
//                         step.id
//                       )}
//                     </div>
//                     {!isLast && (
//                       <div className="absolute left-1/2 top-14 -translate-x-1/2 h-16 w-px bg-gray-200" />
//                     )}
//                   </div>
//                   <div className="pt-2">
//                     <div className={`text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
//                       {step.label}
//                     </div>
//                     {step.description && (
//                       <p className="mt-2 text-sm text-gray-400 leading-relaxed">
//                         {step.description}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Form */}
//         <div className="flex-1 w-full">
//           <h2 className="text-xl sm:text-[36px] font-medium text-[#131313] mb-7">
//             Donor information
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-xl font-medium text-[#131313] mb-1">
//                 Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your full name"
//                 className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-gray-400"
//               />
//             </div>

//             <div>
//               <label className="block text-xl font-medium text-[#131313] mb-1">
//                 Email <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your email address"
//                 className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-gray-400"
//               />
//             </div>

//             <div>
//               <label className="block text-xl font-medium text-[#131313] mb-1">Mobile</label>
//               <input
//                 type="tel"
//                 name="mobile"
//                 value={form.mobile}
//                 onChange={handleChange}
//                 placeholder="Enter your mobile number"
//                 className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-gray-400"
//               />
//             </div>

//             <div className="flex gap-4">
//               <div className="flex-1">
//                 <label className="block text-xl font-medium text-[#131313] mb-1">Country</label>
//                 <input
//                   type="text"
//                   name="country"
//                   value={form.country}
//                   onChange={handleChange}
//                   placeholder="Country"
//                   className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-gray-400"
//                 />
//               </div>
//               <div className="flex-1">
//                 <label className="block text-xl font-medium text-[#131313] mb-1">City</label>
//                 <input
//                   type="text"
//                   name="city"
//                   value={form.city}
//                   onChange={handleChange}
//                   placeholder="City"
//                   className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-gray-400"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-xl font-medium text-[#131313] mb-1">
//                 Donation amount <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 name="donationAmount"
//                 value={form.donationAmount}
//                 onChange={handleChange}
//                 required
//                 min="1"
//                 placeholder="Enter donation amount"
//                 className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-gray-400"
//               />
//             </div>

//             <div className="flex items-center gap-2 bg-[#E4F3FF] border border-blue-100 rounded-lg px-4 py-3">
//               <input
//                 id="agree"
//                 type="checkbox"
//                 checked={agreed}
//                 onChange={(e) => setAgreed(e.target.checked)}
//                 className="mt-0.5 accent-blue-600 cursor-pointer"
//               />
//               <label htmlFor="agree" className="text-base text-[#000000] cursor-pointer leading-relaxed">
//                 I agree to [company name] terms, privacy policy, and industry low fees
//               </label>
//             </div>

//             {paymentMutation.isError && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
//                 Something went wrong. Please try again.
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={!isFormValid || paymentMutation.isPending}
//               className="w-full bg-[#0024DA] hover:bg-[#0024DA]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold h-[56px] rounded-[8px] transition-colors flex items-center justify-center gap-2"
//             >
//               {paymentMutation.isPending ? (
//                 <>
//                   <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//                   </svg>
//                   Redirecting to payment...
//                 </>
//               ) : (
//                 'Continue to Payment'
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }





'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

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

  const searchParams = useSearchParams();
  const campaignId = searchParams.get('campaignId');
  const campaignName = searchParams.get('campaignName') || 'Campaign Donation';
  const studentId = searchParams.get('studentId');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const paymentMutation = useMutation({
    mutationFn: async () => {
      // ✅ Stripe redirect এর আগে localStorage এ data save করা হচ্ছে
      // Stripe redirect করলেও browser এ data থাকবে
      const donorData = {
        donorName:    form.name,
        donorEmail:   form.email,
        donorMobile:  form.mobile,
        donorCountry: form.country,
        donorCity:    form.city,
        amount:       form.donationAmount,
        campaignName: campaignName,
      };
      localStorage.setItem('donorData', JSON.stringify(donorData));

      const successUrl = `${window.location.origin}/donor-payment-methods`;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donation/create-donation-session`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            campaignId,
            ...(studentId && { studentId }),
            donor: {
              name:    form.name,
              email:   form.email,
              mobile:  form.mobile,
              country: form.country,
              city:    form.city,
            },
            amount:     Number(form.donationAmount),
            successUrl,
          }),
        }
      );

      if (!res.ok) throw new Error('Failed to create donation session');
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      const url = data?.data?.url;
      if (url) {
        window.location.href = url;
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    paymentMutation.mutate();
  };

  const isFormValid =
    agreed &&
    form.name.trim() &&
    form.email.trim() &&
    form.donationAmount.trim();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <h1 className="text-2xl sm:text-[36px] font-medium text-[#131313] mb-14">
        Start Your Donation
      </h1>

      <div className="flex flex-col sm:flex-row gap-16 w-full max-w-6xl items-start">
        {/* Stepper Sidebar */}
        <div className="bg-white p-6 w-full sm:w-56 lg:w-[350px] shadow-[0px_1px_17.4px_0px_#00000040] rounded-[8px] mt-3">
          {steps.map((step, index) => {
            const isActive = step.id === activeStep;
            const isCompleted = step.id < activeStep;
            const isLast = index === steps.length - 1;
            return (
              <div key={step.id} className="pb-8 last:pb-0">
                <div className="flex items-start gap-5">
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-medium border-2 ${
                        isActive
                          ? 'border-blue-600 text-[#131313]'
                          : isCompleted
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-gray-200 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step.id
                      )}
                    </div>
                    {!isLast && (
                      <div className="absolute left-1/2 top-14 -translate-x-1/2 h-16 w-px bg-gray-200" />
                    )}
                  </div>
                  <div className="pt-2">
                    <div className={`text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
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
            <div>
              <label className="block text-xl font-medium text-[#131313] mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-[#131313] mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-[#131313] mb-1">Mobile</label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-gray-400"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xl font-medium text-[#131313] mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-gray-400"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xl font-medium text-[#131313] mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xl font-medium text-[#131313] mb-1">
                Donation amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="donationAmount"
                value={form.donationAmount}
                onChange={handleChange}
                required
                min="1"
                placeholder="Enter donation amount"
                className="w-full border bg-transparent border-[#A3A3A3] rounded-[4px] px-3 h-[56px] text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-gray-400"
              />
            </div>

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

            {paymentMutation.isError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={!isFormValid || paymentMutation.isPending}
              className="w-full bg-[#0024DA] hover:bg-[#0024DA]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold h-[56px] rounded-[8px] transition-colors flex items-center justify-center gap-2"
            >
              {paymentMutation.isPending ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Redirecting to payment...
                </>
              ) : (
                'Continue to Payment'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}