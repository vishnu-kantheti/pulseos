"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";


export async function addInventoryItem(formData: FormData) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("inventory")
    .insert({
      restaurant_id: formData.get("restaurant_id") as string,
      ingredient_name: formData.get("ingredient_name"),
      quantity: Number(formData.get("quantity")),
      unit: formData.get("unit"),
      minimum_stock: Number(formData.get("minimum_stock")),
      last_restocked_at: formData.get("last_restocked_at") || null,
      expiry_date: formData.get("expiry_date") || null,
    });

  console.log("Data:", data);
  console.log("Error:", error);

  revalidatePath("/dashboard/inventory");
}
export async function updateInventoryItem(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("inventory")
    .update({
      ingredient_name: formData.get("ingredient_name"),
      quantity: Number(formData.get("quantity")),
      unit: formData.get("unit"),
      minimum_stock: Number(formData.get("minimum_stock")),
      last_restocked_at:
        formData.get("last_restocked_at") || null,
      expiry_date:
        formData.get("expiry_date") || null,
    })
    .eq("id", formData.get("id"));

  console.log(error);

  revalidatePath("/dashboard/inventory");
}
export async function deleteInventoryItem(formData: FormData) {
  const supabase = await createClient();

  await supabase
    .from("inventory")
    .delete()
    .eq("id", formData.get("id"));

  revalidatePath("/dashboard/inventory");
}
