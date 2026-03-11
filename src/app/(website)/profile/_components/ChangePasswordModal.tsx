"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function ChangePasswordModal() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [validationError, setValidationError] = useState("");

  // modal বন্ধ হলে সব reset
  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) {
      setCurrent("");
      setNewPass("");
      setConfirm("");
      setValidationError("");
      changePasswordMutation.reset();
    }
  };

  const changePasswordMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword: current,
            newPassword: newPass,
          }),
        }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Failed to change password");
      return json;
    },
    onSuccess: () => {
      // success হলে ২ সেকেন্ড পর modal বন্ধ
      setTimeout(() => handleOpenChange(false), 2000);
    },
  });

  const handleSave = () => {
    setValidationError("");

    if (!current || !newPass || !confirm) {
      setValidationError("All fields are required.");
      return;
    }
    if (newPass !== confirm) {
      setValidationError("New passwords do not match.");
      return;
    }
    if (newPass.length < 6) {
      setValidationError("New password must be at least 6 characters.");
      return;
    }

    changePasswordMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="border border-[#595959] hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded transition">
          Change Password
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm p-0 rounded-xl overflow-hidden border border-gray-200 shadow-xl">
        <div className="px-7 py-6 space-y-5">
          {/* Header */}
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Change Password
            </DialogTitle>
          </DialogHeader>

          {/* Validation error */}
          {validationError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded">
              {validationError}
            </div>
          )}

          {/* API error */}
          {changePasswordMutation.isError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded">
              {(changePasswordMutation.error as Error)?.message || "Something went wrong."}
            </div>
          )}

          {/* Success */}
          {changePasswordMutation.isSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-3 py-2 rounded">
              Password changed successfully!
            </div>
          )}

          {/* Current Password */}
          <div className="space-y-1.5">
            <label className="text-sm text-gray-700">Current Password</label>
            <div className="relative">
              <Input
                type={showCurrent ? "text" : "password"}
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="h-11 pr-10 rounded-lg border-gray-300 bg-white text-sm"
                placeholder="••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showCurrent ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="text-sm text-gray-700">New Password</label>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="h-11 pr-10 rounded-lg border-gray-300 bg-white text-sm"
                placeholder="••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showNew ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <label className="text-sm text-gray-700">Confirm New Password</label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="h-11 pr-10 rounded-lg border-gray-300 bg-white text-sm"
                placeholder="••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showConfirm ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Save button */}
          <div className="pt-1">
            <Button
              onClick={handleSave}
              disabled={changePasswordMutation.isPending || changePasswordMutation.isSuccess}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white h-11 rounded-lg text-sm font-semibold transition"
            >
              {changePasswordMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}