"use client";

import React, { useRef, useState } from "react";
import { FileText } from "lucide-react";

interface FormData {
  fullName: string;
  brandName: string;
  email: string;
  phone: string;
  country: string;
  socialMedia: string;
  audienceSize: string;
  campaignIdea: string;
  whyFeatures: string;
}

interface UploadedFile {
  name: string;
  size: string;
  raw: File;
}

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + "MB";
  if (bytes >= 1024) return (bytes / 1024).toFixed(1) + "KB";
  return bytes + "B";
}

function ApplyForCampaign() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>({
    fullName: "",
    brandName: "",
    email: "",
    phone: "",
    country: "",
    socialMedia: "",
    audienceSize: "",
    campaignIdea: "",
    whyFeatures: "",
  });

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).map((f) => ({
      name: f.name,
      size: formatSize(f.size),
      raw: f,
    }));
    setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    alert("Application submitted successfully!");
  };

  const inputClass =
    "w-full bg-[#1e1e1e] border border-[#2a2a2a] text-white text-sm px-4 py-3 outline-none placeholder:text-[#555555] focus:border-[#c9a84c] transition-colors";

  const labelClass = "text-white text-sm mb-1.5 block";

  return (
    <section className="w-full min-h-screen bg-[#0d0d0d] py-14 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Page heading */}
        <div className="mb-8">
          <p className="text-[#c9a84c] text-[10px] tracking-[0.25em] uppercase mb-2">
            Partner With Us
          </p>
          <h1 className="text-white text-3xl font-bold">Campaign Details</h1>
        </div>

        {/* Card */}
        <div className="bg-[#111111] border border-[#1e1e1e] p-7 flex flex-col gap-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Jhon Martinez"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Brand Name</label>
              <input
                name="brandName"
                value={form.brandName}
                onChange={handleChange}
                placeholder="Football Agency"
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jhone@gmail.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="035830583048"
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Country</label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="United States"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Social media</label>
              <input
                name="socialMedia"
                value={form.socialMedia}
                onChange={handleChange}
                placeholder="Media link"
                className={inputClass}
              />
            </div>
          </div>

          {/* Audience size */}
          <div>
            <label className={labelClass}>Audience size</label>
            <input
              name="audienceSize"
              value={form.audienceSize}
              onChange={handleChange}
              placeholder="5k"
              className={inputClass}
            />
          </div>

          {/* Campaign idea */}
          <div>
            <label className={labelClass}>Campaign idea</label>
            <textarea
              name="campaignIdea"
              value={form.campaignIdea}
              onChange={handleChange}
              placeholder="lorem ipsum..............."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Why Features */}
          <div>
            <label className={labelClass}>Why Features</label>
            <textarea
              name="whyFeatures"
              value={form.whyFeatures}
              onChange={handleChange}
              placeholder="lorem ipsum..............."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Documents */}
          <div>
            <label className={labelClass}>Documents</label>
            <div className="flex items-center gap-4 flex-wrap">
              {files.map((file, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 relative group"
                >
                  <button
                    onClick={() => removeFile(i)}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-[#c9a84c] text-black rounded-full text-[10px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                  <div className="w-14 h-14 bg-[#3b82f6] rounded-full flex items-center justify-center">
                    <FileText size={24} className="text-white" />
                  </div>
                  <span className="text-[#888888] text-[10px]">{file.size}</span>
                </div>
              ))}

              {files.length < 5 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-14 h-14 border-2 border-dashed border-[#2a2a2a] flex items-center justify-center text-[#555555] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-2xl"
                >
                  +
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg"
                onChange={handleFiles}
                className="hidden"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-[#c9a84c] text-black text-[11px] font-black tracking-[0.25em] uppercase py-4 hover:bg-[#b8963f] transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default ApplyForCampaign;