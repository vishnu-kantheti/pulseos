import { createClient } from "@/lib/supabase/server";

import TablesTable from "@/components/tables/TablesTable";
import AddTableDialog from "@/components/tables/AddTableDialog";

export default async function TablesPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("restaurant_tables")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Table Management
      </h1>

      <AddTableDialog />

      <TablesTable items={data ?? []} />
    </main>
  );
}
