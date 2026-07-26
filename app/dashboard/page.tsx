import { createClient } from "@/lib/supabase/server";
import AIInsights from "@/components/dashboard/AIInsights";
import RevenueChart from "@/components/dashboard/RevenueChart";
import OrdersChart from "@/components/dashboard/OrdersChart";
import InventoryChart from "@/components/dashboard/InventoryChart";

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
  // ORDERS PIE CHART
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
  // INVENTORY BAR CHART
  // ===========================

  const { data: inventory } = await supabase
    .from("inventory")
    .select("item_name,quantity");

  return (
    <main className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

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

      {/* AI INSIGHTS */}
      <AIInsights />

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <OrdersChart data={grouped} />
      </div>

      <InventoryChart data={inventory ?? []} />
    </main>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border bg-white shadow-sm p-6">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}
