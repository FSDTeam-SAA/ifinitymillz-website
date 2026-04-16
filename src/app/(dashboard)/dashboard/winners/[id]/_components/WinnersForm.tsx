"use client"

import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Eye } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface WithdrawalFormData {
  campaignId: string
  bankName: string
  accountName: string
  accountNumber: string
  routingCode: string
  method: string
  notes: string
}

function WinnersForm() {
  const [formData, setFormData] = useState<WithdrawalFormData>({
    campaignId: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    routingCode: '',
    method: 'Bank Transfer',
    notes: '',
  })
  const session = useSession();
    const TOKEN = session?.data?.user?.accessToken;

  const withdrawalMutation = useMutation({
    mutationFn: async (data: WithdrawalFormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/withdrawals`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' , Authorization: `Bearer ${TOKEN}`,},
          body: JSON.stringify(data),
        }
      )
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData?.message || 'Request failed')
      }
      return res.json()
    },
    onSuccess: () => {
      alert('Withdrawal request submitted successfully!')
      setFormData({
        campaignId: '',
        bankName: '',
        accountName: '',
        accountNumber: '',
        routingCode: '',
        method: 'Bank Transfer',
        notes: '',
      })
    },
    onError: (err: Error) => {
      alert(`Error: ${err.message}`)
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    withdrawalMutation.mutate(formData)
  }

  const inputClass =
    'w-full bg-transparent border border-zinc-700 rounded-md px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-500 transition-colors'

  return (
    <div className="min-h-screen  font-sans">
      {/* Withdraw History Button */}
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 border border-yellow-500 text-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-500/10 transition-colors">
          <Eye size={16} />
          Withdraw History
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-[#1c1c1c] rounded-xl p-8 max-w-5xl mx-auto">
        <h2 className="text-white text-xl font-semibold mb-6">Request Withdrawal</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name / Account Name */}
          <div>
            <label className="text-zinc-300 text-sm mb-1 block">Full Name*</label>
            <input
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              placeholder="John Martinez.."
              className={inputClass}
            />
          </div>

          {/* Campaign ID */}
          <div>
            <label className="text-zinc-300 text-sm mb-1 block">Campaign name*</label>
            <input
              name="campaignId"
              value={formData.campaignId}
              onChange={handleChange}
              placeholder="Mayfair Estates Draw.."
              className={inputClass}
            />
          </div>

          {/* Amount / Routing Code */}
          <div>
            <label className="text-zinc-300 text-sm mb-1 block">Amount/Prize Name ($)*</label>
            <input
              name="routingCode"
              value={formData.routingCode}
              onChange={handleChange}
              placeholder="$40"
              className={inputClass}
            />
          </div>

          {/* Bank Name */}
          <div>
            <label className="text-zinc-300 text-sm mb-1 block">Bank Name*</label>
            <input
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Prime Bank"
              className={inputClass}
            />
          </div>

          {/* Method */}
          <div>
            <label className="text-zinc-300 text-sm mb-1 block">Method</label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Mobile Banking">Mobile Banking</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          {/* Account Number */}
          <div>
            <label className="text-zinc-300 text-sm mb-1 block">Bank Account Number*</label>
            <input
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="64565465"
              className={inputClass}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            disabled={withdrawalMutation.isPending}
            className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black font-semibold px-6 py-2.5 rounded-md transition-colors"
          >
            {withdrawalMutation.isPending ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default WinnersForm