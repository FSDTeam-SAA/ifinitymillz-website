"use client";

import React, { useState, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import authImage from "@../../../public/images/auth.png";

function SignInForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and Password are required");
      return;
    }

    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!res) {
        throw new Error("No response from server");
      }

      if (res.error) {
        throw new Error(res.error);
      }

      toast.success("Login Successfully !");
      router.push("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#181715]">
      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          width={400}
          height={400}
          src={authImage}
          alt="Food distribution"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-[#F0C230] mb-2">Welcome Back!</h1>
            <p className="text-[#DDDDDD]">
              Sign in to your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#C3C3C3] mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="hello@example.com"
                className="w-full px-4 py-2.5 !rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0C230] focus:border-transparent transition-all bg-[#414141] text-white"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#C3C3C3] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 !rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0C230] focus:border-transparent transition-all bg-[#414141] text-white"
                required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-white" />
                  ) : (
                    <Eye className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#F0C230] border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-2 text-sm text-[#C3C3C3]">Remember me</span>
              </label>
              <a
                href="/forgotpassword"
                className="text-sm text-[#F0C230] hover:text-blue-700 font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E9C349] hover:bg-[#E9C349]/90 text-white font-semibold py-3 rounded-lg transition-colors shadow-md disabled:opacity-70"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-[#C3C3C3]">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-[#F0C230] hover:text-blue-700 font-semibold"
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
