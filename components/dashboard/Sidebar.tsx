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
    <aside className="w-64 min-h-screen border-r bg-white flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">
          PulseOS
        </h1>

        <p className="text-sm text-gray-500">
          AI Restaurant OS
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              <Icon size={20} />

              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <button
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />

          Logout
        </button>
      </div>
    </aside>
  );
}
