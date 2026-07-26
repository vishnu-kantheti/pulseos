import { createClient } from "@/lib/supabase/server";

import AddInventoryDialog from "@/components/inventory/AddInventoryDialog";
import InventoryTable from "@/components/inventory/InventoryTable";

export default async function InventoryPage() {

  const supabase = await createClient();

  const { data } = await supabase
    .from("inventory")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Inventory Management
      </h1>

      <AddInventoryDialog />

      <InventoryTable items={data ?? []} />

    </main>
  );
}
