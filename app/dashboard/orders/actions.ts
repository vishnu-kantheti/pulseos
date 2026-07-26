"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createOrder(formData: FormData) {
  const supabase = await createClient();

  const customer_id = formData.get("customer_id") as string | null;
  const table_id = formData.get("table_id") as string;
  const menu_item_id = formData.get("menu_item_id") as string;
  const quantity = Number(formData.get("quantity"));

  // Get the demo restaurant (later we'll get this from the logged-in admin)
  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("id")
    .limit(1)
    .single();

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  // Get menu item price
  const { data: menuItem } = await supabase
    .from("menu_items")
    .select("id, price")
    .eq("id", menu_item_id)
    .single();

  if (!menuItem) {
    throw new Error("Menu item not found");
  }

  const total = Number(menuItem.price) * quantity;

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      restaurant_id: restaurant.id,
      customer_id: customer_id || null,
      table_id,
      status: "pending",
      total,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Create order item
  const { error: itemError } = await supabase
    .from("order_items")
    .insert({
      order_id: order.id,
      menu_item_id,
      quantity,
      unit_price: menuItem.price,
      subtotal: total,
    });

  if (itemError) throw itemError;

  revalidatePath("/dashboard/orders");
}
