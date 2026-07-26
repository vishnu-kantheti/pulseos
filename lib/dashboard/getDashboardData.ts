import { supabase } from "@/lib/supabase/client";

export async function getDashboardData() {
  const [
    orders,
    tables,
    inventory,
    menuItems,
  ] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: true }),

    supabase
      .from("restaurant_tables")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("inventory")
      .select("*", { count: "exact", head: true })
      .lt("quantity", 5),

    supabase
      .from("menu_items")
      .select("*", { count: "exact", head: true }),
  ]);

  return {
    totalOrders: orders.count ?? 0,
    totalTables: tables.count ?? 0,
    lowStock: inventory.count ?? 0,
    menuItems: menuItems.count ?? 0,
  };
}
