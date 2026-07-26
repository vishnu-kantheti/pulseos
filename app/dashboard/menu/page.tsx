import { createClient } from "@/lib/supabase/server";
import MenuTable from "@/components/menu/MenuTable";
import AddMenuForm from "@/components/menu/AddMenuForm";
export default async function MenuPage() {
  const supabase = await createClient();

  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Menu Management
      </h1>
	<AddMenuForm />
      <MenuTable items={menuItems ?? []} />
    </main>
  );
}
