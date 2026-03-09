"use client"

import React, { useState } from "react"
import { Pencil, Users } from "lucide-react"
import Image from "next/image"
import { ChangePasswordModal } from "./ChangePasswordModal"
// import { signOut, useSession } from "next-auth/react"

// ─── Types ────────────────────────────────────────────────────────────────────

type ProfileForm = {
  fullName: string
  username: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function PersonalInfoPage() {
//   const { data: session } = useSession()

  const [form, setForm] = useState<ProfileForm>({
    fullName: "Bessie Edwards",
    username: "@bessieedwards",
    email: "abcgdh@gmail.com",
    phone: "+1 (888) 000-0000",
    address: "123 Organic Way Farmville, CA 90210",
    city: "",
    state: "",
    zipCode: "",
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = () => {
    // TODO: call your API to save profile
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-[100px] px-10">
      <div className="mx-auto container space-y-6">

        {/* ── Top Bar ─────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-4 relative">
          <h1 className="text-[36px] font-medium text-[#131313] tracking-tight">Profile</h1>

          <div className="absolute right-0 flex items-center gap-2">
            {/* Referral donators */}
            <button className="flex items-center gap-1.5 bg-[#0024DA] hover:bg-[#0024DA]/90 h-[44px] text-white text-sm font-medium px-4 py-2 rounded-[8px] transition">
              <Users className="w-4 h-4" />
              Referral donators
            </button>

            {/* Log out */}
            <ChangePasswordModal />
          </div>
        </div>

        {/* ── Profile Card ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-sm px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={"/images/avatar.png"}
              alt="Profile picture"
              fill
              className="rounded-full object-cover border-2 border-gray-200"
            />
          </div>

          {/* Name & username */}
          <div className="flex-1">
            <p className="text-base font-bold text-gray-900">
              {/* {session?.user?.name || form.fullName} */}
            </p>
            <p className="text-[#272727] text-xl font-medium">{form.fullName}</p>
            <p className="text-sm text-gray-500">{form.username}</p>
          </div>

          {/* Student ID */}
          <div className="flex-1">
            <p className="text-xl text-[#272727] font-medium">Student unique ID</p>
            <p className="text-sm text-[#595959] font-semibold mt-0.5">1234875</p>
          </div>

          {/* Edit button */}
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 bg-[#0024DA] hover:bg-[#0024DA]/90 h-[44px] text-white text-sm font-medium px-4 py-2 rounded transition ml-auto"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
        </div>

        {/* ── Personal Information Card ────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-sm px-6 py-6">
          {/* Card header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h2 className="text-xl font-semibold text-[#272727]">Personal Information</h2>

            <div className="flex items-center gap-2">
              <button className="border border-[#595959] hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded transition">
                Change Password
              </button>
              <button
                // onClick={() => signOut()}
                className="border border-[#595959] hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded transition"
              >
                Log Out 
              </button>
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="flex items-center gap-1.5 bg-[#0024DA] hover:bg-[#0024DA]/90 h-[40px] text-white text-sm font-medium px-4 py-2 rounded transition"
              >
                <Pencil className="w-3.5 h-3.5" />
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            {/* Row 1: Full Name + Username */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-base text-[#323232] mb-1">Full Name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 disabled:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div>
                <label className="block text-base text-[#323232] mb-1">User name</label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 disabled:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            </div>

            {/* Row 2: Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-base text-[#323232] mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 disabled:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div>
                <label className="block text-base text-[#323232] mb-1">Phone number</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 disabled:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            </div>

            {/* Row 3: Address (full width) */}
            <div>
              <label className="block text-base text-[#323232] mb-1">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 disabled:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Row 4: City + State + Zip Code */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-base text-[#323232] mb-1">City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div>
                <label className="block text-base text-[#323232] mb-1">State</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div>
                <label className="block text-base text-[#323232] mb-1">Zip Code</label>
                <input
                  name="zipCode"
                  value={form.zipCode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
