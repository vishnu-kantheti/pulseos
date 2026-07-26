"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addMenuItem(formData: FormData) {
  const supabase = await createClient();

  await supabase.from("menu_items").insert({
    restaurant_id: formData.get("restaurant_id") as string,
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    prep_time: Number(formData.get("prep_time")),
    is_veg: formData.get("is_veg") === "true",
    available: true,
  });

  revalidatePath("/dashboard/menu");
}

export async function deleteMenuItem(formData: FormData) {
  const supabase = await createClient();

  await supabase
    .from("menu_items")
    .delete()
    .eq("id", formData.get("id"));
     revalidatePath("/dashboard/menu");
}

export async function updateMenuItem(formData: FormData) {
  const supabase = await createClient();

  await supabase
    .from("menu_items")
    .update({
      name: formData.get("name"),
      description: formData.get("description"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      prep_time: Number(formData.get("prep_time")),
      is_veg: formData.get("is_veg") === "true",
      available: formData.get("available") === "true",
    })
    .eq("id", formData.get("id"));

  revalidatePath("/dashboard/menu");
}

