"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTable(formData: FormData) {
  const supabase = await createClient();

  await supabase.from("restaurant_tables").insert({
    restaurant_id: formData.get("restaurant_id") as string,
    table_number: Number(formData.get("table_number")),
    capacity: Number(formData.get("capacity")),
    status: formData.get("status"),
    qr_code: formData.get("qr_code"),
  });

  revalidatePath("/dashboard/tables");
}

export async function deleteTable(formData: FormData) {
  const supabase = await createClient();

  await supabase
    .from("restaurant_tables")
    .delete()
    .eq("id", formData.get("id"));

  revalidatePath("/dashboard/tables");
}

export async function updateTable(formData: FormData) {
  const supabase = await createClient();

  await supabase
    .from("restaurant_tables")
    .update({
      table_number: Number(formData.get("table_number")),
      capacity: Number(formData.get("capacity")),
      status: formData.get("status"),
      qr_code: formData.get("qr_code"),
    })
    .eq("id", formData.get("id"));

  revalidatePath("/dashboard/tables");
}
