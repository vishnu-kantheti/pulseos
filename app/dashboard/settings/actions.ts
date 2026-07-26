"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateRestaurantSettings(formData: FormData) {
  const supabase = await createClient();

  await supabase
    .from("restaurants")
    .update({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    })
    .eq("id", formData.get("id"));

  revalidatePath("/dashboard/settings");
}
