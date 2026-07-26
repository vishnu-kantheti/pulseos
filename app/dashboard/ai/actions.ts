"use server";

import { createClient } from "@/lib/supabase/server";
import { askGemini } from "@/lib/ai/gemini";

export async function askAI(formData: FormData) {
  const supabase = await createClient();

  const prompt = String(formData.get("prompt") ?? "");

  // Fetch restaurant data
  const { data: menu } = await supabase
    .from("menu_items")
    .select("name,category,price,available");

  const { data: inventory } = await supabase
    .from("inventory")
    .select("item_name,quantity,minimum_stock");

  const { data: orders } = await supabase
    .from("orders")
    .select("status,total");

  const { data: reviews } = await supabase
    .from("reviews")
    .select("rating,comment");

  const finalPrompt = `
You are PulseOS AI, an intelligent restaurant management assistant.

Restaurant Menu:
${JSON.stringify(menu, null, 2)}

Inventory:
${JSON.stringify(inventory, null, 2)}

Orders:
${JSON.stringify(orders, null, 2)}

Reviews:
${JSON.stringify(reviews, null, 2)}

User Question:
${prompt}

Answer like a restaurant business consultant.
`;

  return await askGemini(finalPrompt);
}
