"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Users } from "lucide-react";
import Image from "next/image";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProfileForm = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  cityState: string;
  roadArea: string;
  postalCode: string;
  taxId: string;
};

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function PersonalInfoPage() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const [form, setForm] = useState<ProfileForm>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    cityState: "",
    roadArea: "",
    postalCode: "",
    taxId: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ── GET user info ─────────────────────────────────────────────────────────
  const { data: userInfo } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/me`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const json = await res.json();
      return json?.data;
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (userInfo) {
      setForm({
        fullName: userInfo.name || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
        country: userInfo.address?.country || "",
        cityState: userInfo.address?.cityState || "",
        roadArea: userInfo.address?.roadArea || "",
        postalCode: userInfo.address?.postalCode || "",
        taxId: userInfo.address?.taxId || "",
      });
    }
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── UPDATE user info ──────────────────────────────────────────────────────
  const updateMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/me`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: form.fullName,
            email: form.email,
            phone: form.phone,
            address: {
              country: form.country,
              cityState: form.cityState,
              roadArea: form.roadArea,
              postalCode: form.postalCode,
              taxId: form.taxId,
            },
          }),
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Update failed");
      return json;
    },
    onSuccess: () => {
      setIsEditing(false);
    },
  });

  const handleSave = () => {
    updateMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-[100px] px-10">
      <div className="mx-auto container space-y-6">
        {/* ── Top Bar ─────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-4 relative">
          <h1 className="text-[36px] font-medium text-[#131313] tracking-tight">
            Profile
          </h1>

          <div className="absolute right-0 flex items-center gap-2">
            <Link href="/referral-donators">
              <button className="flex items-center gap-1.5 bg-[#0024DA] hover:bg-[#0024DA]/90 h-[44px] text-white text-sm font-medium px-4 py-2 rounded-[8px] transition">
              <Users className="w-4 h-4" />
              Referral donators
            </button>
            </Link>
          </div>
        </div>

        {/* ── Profile Card ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-sm px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="relative w-16 h-16 flex-shrink-0">
            {userInfo?.profileImage ? (
              <Image
                src={userInfo.profileImage}
                alt="Profile picture"
                fill
                className="rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-100 border-2 border-gray-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
                  {userInfo?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>

          {/* Name */}
          <div className="flex-1">
            <p className="text-xl text-[#272727] font-medium">
              {userInfo?.name || "—"}
            </p>
            <p className="text-sm text-gray-500 capitalize">
              {userInfo?.role || ""}
            </p>
          </div>

          {/* Student ID */}
          <div className="flex-1">
            <p className="text-xl text-[#272727] font-medium">
              Student unique ID
            </p>
            <p className="text-sm text-[#595959] font-semibold mt-0.5">
              {userInfo?._id?.slice(-7) || "—"}
            </p>
          </div>

          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            disabled={updateMutation.isPending}
            className="flex items-center gap-1.5 bg-[#0024DA] hover:bg-[#0024DA]/90 disabled:opacity-60 h-[40px] text-white text-sm font-medium px-4 py-2 rounded transition"
          >
            <Pencil className="w-3.5 h-3.5" />
            {updateMutation.isPending
              ? "Saving..."
              : isEditing
                ? "Save"
                : "Edit"}
          </button>
        </div>

        {/* ── Personal Information Card ────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-sm px-6 py-6">
          {/* Card header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h2 className="text-xl font-semibold text-[#272727]">
              Personal Information
            </h2>

            <div className="flex items-center gap-2">
              <ChangePasswordModal />
              {/* ✅ Log Out button — modal খোলে */}
              <button
                onClick={() => setShowLogoutModal(true)}
                className="border border-[#595959] hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded transition"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Error message */}
          {updateMutation.isError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded">
              Update failed. Please try again.
            </div>
          )}

          {/* Success message */}
          {updateMutation.isSuccess && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-2 rounded">
              Profile updated successfully.
            </div>
          )}

          {/* Form fields */}
          <div className="space-y-4">
            {/* Row 1: Full Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-base text-[#323232] mb-1">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 disabled:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div>
                <label className="block text-base text-[#323232] mb-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  readOnly
                  value={form.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 disabled:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            </div>

            {/* Row 2: Phone + Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-base text-[#323232] mb-1">
                  Phone number
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 disabled:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div>
                <label className="block text-base text-[#323232] mb-1">
                  Country
                </label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 disabled:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            </div>

            {/* Row 3: Road/Area (full width) */}
            <div>
              <label className="block text-base text-[#323232] mb-1">
                Address
              </label>
              <input
                name="roadArea"
                value={form.roadArea}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 disabled:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Row 4: City/State + Postal Code + Tax ID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-base text-[#323232] mb-1">
                  City / State
                </label>
                <input
                  name="cityState"
                  value={form.cityState}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div>
                <label className="block text-base text-[#323232] mb-1">
                  Postal Code
                </label>
                <input
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div>
                <label className="block text-base text-[#323232] mb-1">
                  Tax ID
                </label>
                <input
                  name="taxId"
                  value={form.taxId}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 h-[50px] text-sm text-gray-800 bg-white disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Logout Confirmation Modal ─────────────────────────────────────── */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Log Out
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2.5 rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 rounded transition"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}