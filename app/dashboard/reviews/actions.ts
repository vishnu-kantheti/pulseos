"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteReview(formData: FormData) {
  const supabase = await createClient();

  await supabase
    .from("reviews")
    .delete()
    .eq("id", formData.get("id"));

  revalidatePath("/dashboard/reviews");
}
