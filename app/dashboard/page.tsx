import { createClient } from "@/lib/supabase/server";
import AIInsights from "@/components/dashboard/AIInsights";
import RevenueChart from "@/components/dashboard/RevenueChart";
import OrdersChart from "@/components/dashboard/OrdersChart";
import InventoryChart from "@/components/dashboard/InventoryChart";

import {
  ShoppingCart,
  IndianRupee,
  UtensilsCrossed,
  Package,
  AlertTriangle,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  // ===========================
  // KPI DATA
  // ===========================

  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  const { count: totalMenu } = await supabase
    .from("menu_items")
    .select("*", { count: "exact", head: true });

  const { count: totalInventory } = await supabase
    .from("inventory")
    .select("*", { count: "exact", head: true });

  const { data: revenueTotals } = await supabase
    .from("orders")
    .select("total");

  const totalRevenue =
    revenueTotals?.reduce(
      (sum, order) => sum + Number(order.total),
      0
    ) ?? 0;

  const { data: lowStock } = await supabase
    .from("inventory")
    .select("quantity, minimum_stock");

  const lowStockCount =
    lowStock?.filter(
      (item) => item.quantity <= item.minimum_stock
    ).length ?? 0;

  // ===========================
  // REVENUE CHART
  // ===========================

  const { data: revenue } = await supabase
    .from("orders")
    .select("created_at,total")
    .order("created_at");

  const revenueData =
    revenue?.map((r) => ({
      date: new Date(r.created_at).toLocaleDateString(),
      total: Number(r.total),
    })) ?? [];

  // ===========================
  // ORDER STATUS CHART
  // ===========================

  const { data: orderStatus } = await supabase
    .from("orders")
    .select("status");

  const grouped = Object.values(
    (orderStatus ?? []).reduce((acc: any, order: any) => {
      if (!acc[order.status]) {
        acc[order.status] = {
          status: order.status,
          value: 0,
        };
      }

      acc[order.status].value++;

      return acc;
    }, {})
  );

  // ===========================
  // INVENTORY CHART
  // ===========================

  const { data: inventory } = await supabase
    .from("inventory")
    .select("item_name,quantity");

  return (
    <main className="p-8 space-y-8">
      {/* HEADER */}

      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 shadow-lg">
        <h1 className="text-4xl font-bold">
          🍽️ PulseOS Dashboard
        </h1>

        <p className="mt-2 text-blue-100 text-lg">
          Smart Restaurant Management powered by AI
        </p>
      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        <Card
          title="Orders"
          value={totalOrders ?? 0}
        />

        <Card
          title="Revenue"
          value={`₹${totalRevenue}`}
        />

        <Card
          title="Menu"
          value={totalMenu ?? 0}
        />

        <Card
          title="Inventory"
          value={totalInventory ?? 0}
        />

        <Card
          title="Low Stock"
          value={lowStockCount}
        />
      </div>

      {/* AI */}

      <AIInsights />

      {/* CHARTS */}

      <div className="grid lg:grid-cols-2 gap-6">
        <RevenueChart
          data={revenueData}
        />

        <OrdersChart
          data={grouped}
        />
      </div>

      <InventoryChart
        data={inventory ?? []}
      />
    </main>
  );
}

type CardTitle =
  | "Orders"
  | "Revenue"
  | "Menu"
  | "Inventory"
  | "Low Stock";

function Card({
  title,
  value,
}: {
  title: CardTitle;
  value: string | number;
}) {
  const icons: Record<CardTitle, React.ReactNode> = {
    Orders: (
      <ShoppingCart className="w-10 h-10 text-blue-600" />
    ),
    Revenue: (
      <IndianRupee className="w-10 h-10 text-green-600" />
    ),
    Menu: (
      <UtensilsCrossed className="w-10 h-10 text-orange-600" />
    ),
    Inventory: (
      <Package className="w-10 h-10 text-purple-600" />
    ),
    "Low Stock": (
      <AlertTriangle className="w-10 h-10 text-red-600" />
    ),
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        {icons[title]}
      </div>
    </div>
  );
}
