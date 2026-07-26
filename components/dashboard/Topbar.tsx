"use client";

import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer" />

        <div className="text-right">
          <p className="font-semibold">
            Vishnu
          </p>

          <p className="text-sm text-gray-500">
            Restaurant Admin
          </p>
        </div>
      </div>
    </header>
  );
}
