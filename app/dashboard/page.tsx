import { createClient } from "@/lib/supabase/server";
import DashboardCards from "@/components/dashboard/DashboardCards";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    restaurants,
    menu,
    orders,
    inventory,
    reviews,
  ] = await Promise.all([
    supabase.from("restaurants").select("*"),
    supabase.from("menu_items").select("*"),
    supabase.from("orders").select("*"),
    supabase.from("inventory").select("*"),
    supabase.from("reviews").select("*"),
  ]);

  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        PulseOS Dashboard
      </h1>

      <DashboardCards
        restaurants={restaurants.data?.length ?? 0}
        menu={menu.data?.length ?? 0}
        orders={orders.data?.length ?? 0}
        inventory={inventory.data?.length ?? 0}
        reviews={reviews.data?.length ?? 0}
      />

    </main>
  );
}
