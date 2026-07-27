"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  Armchair,
  Boxes,
  Star,
  Settings,
  Bot,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Menu",
    href: "/dashboard/menu",
    icon: UtensilsCrossed,
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: ClipboardList,
  },
  {
    name: "Tables",
    href: "/dashboard/tables",
    icon: Armchair,
  },
  {
    name: "Inventory",
    href: "/dashboard/inventory",
    icon: Boxes,
  },
  {
    name: "Reviews",
    href: "/dashboard/reviews",
    icon: Star,
  },
  {
    name: "AI Assistant",
    href: "/dashboard/ai",
    icon: Bot,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-xl">

      {/* Logo */}

      <div className="p-8 border-b border-slate-700">

        <h1 className="text-3xl font-bold tracking-wide">
          🍽️ PulseOS
        </h1>

        <p className="mt-2 text-sm text-slate-300">
          AI Restaurant Management
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-5 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200
                ${
                  active
                    ? "bg-blue-600 shadow-lg text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white hover:translate-x-1"
                }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-700 p-5">

        <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-red-400 hover:bg-red-500/20 transition">

          <LogOut size={20} />

          Logout

        </button>

        <div className="mt-6 text-center text-xs text-slate-400">

          PulseOS v1.0

        </div>

      </div>

    </aside>
  );
}
