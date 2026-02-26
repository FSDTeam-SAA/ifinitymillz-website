"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LogOut } from "lucide-react";

export function ChangePasswordModal() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    // TODO: API call
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          //   onClick={() => signOut()}
          className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded transition"
        >
          <LogOut className="w-4 h-4" />
          Log out
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
                {showCurrent ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
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
                {showNew ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <label className="text-sm text-gray-700">
              Confirm New Password
            </label>
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
                {showConfirm ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Save button */}
          <div className="pt-1">
            <DialogClose asChild>
              <Button
                onClick={handleSave}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-lg text-sm font-semibold transition"
              >
                Save
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
