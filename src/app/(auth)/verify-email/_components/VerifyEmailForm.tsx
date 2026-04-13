"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { toast } from "sonner";
import authImage from "@../../../public/images/auth.png";

function VerifyEmailForm() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];
    pasted.forEach((char, i) => {
      if (/^\d$/.test(char)) newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleResend = () => {
    setTimer(59);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    toast.success("OTP resent successfully!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    try {
      setIsLoading(true);
      // Replace with your actual OTP verification API call
      console.log("OTP submitted:", otpValue);
      toast.success("Email verified successfully!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Verification failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#181715]">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          width={400}
          height={400}
          src={authImage}
          alt="Verify email"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-[#F0C230] mb-2">Verify Email</h1>
            <p className="text-[#DDDDDD]">
              Enter the 6-digit OTP sent to your email address.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-12 h-12 text-center text-lg font-semibold !rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0C230] focus:border-transparent transition-all bg-[#414141] text-white
                    ${digit ? "ring-2 ring-[#F0C230]" : ""}`}
                />
              ))}
            </div>

            {/* Timer & Resend */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-[#C3C3C3]">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timer)}</span>
              </div>
              <div className="text-[#C3C3C3]">
                Didn&apos;t get a code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={timer > 0}
                  className="text-[#F0C230] hover:text-[#F0C230]/80 font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Resend
                </button>
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E9C349] hover:bg-[#E9C349]/90 text-white font-semibold py-3 rounded-lg transition-colors shadow-md disabled:opacity-70"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>

            {/* Back to Sign In */}
            <div className="text-center text-sm text-[#C3C3C3]">
              Remember your password?{" "}
              <a
                href="/sign-in"
                className="text-[#F0C230] hover:text-[#F0C230]/80 font-semibold"
              >
                Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailForm;