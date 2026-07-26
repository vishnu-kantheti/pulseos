import { createClient } from "@/lib/supabase/server";

import OrdersTable from "@/components/orders/OrdersTable";
import AddOrderDialog from "@/components/orders/AddOrderDialog";

export default async function OrdersPage() {
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      profiles(full_name),
      restaurant_tables(table_number)
    `)
    .order("created_at", { ascending: false });

  const { data: customers } = await supabase
    .from("profiles")
    .select("id, full_name")
    .eq("role", "customer");

  const { data: tables } = await supabase
    .from("restaurant_tables")
    .select("id, table_number")
    .order("table_number");

  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("id, name, price")
    .eq("available", true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Orders
        </h1>

        <AddOrderDialog
          customers={customers ?? []}
          tables={tables ?? []}
          menuItems={menuItems ?? []}
        />
      </div>

      <OrdersTable orders={orders ?? []} />
    </div>
  );
}
