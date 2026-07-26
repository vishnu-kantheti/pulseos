import { createClient } from "@/lib/supabase/server";
import { askGemini } from "@/lib/ai/gemini";

export default async function AIInsights() {
  const supabase = await createClient();

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

  const prompt = `
You are PulseOS AI.

Analyze this restaurant.

Menu:
${JSON.stringify(menu)}

Inventory:
${JSON.stringify(inventory)}

Orders:
${JSON.stringify(orders)}

Reviews:
${JSON.stringify(reviews)}

Give exactly 5 short business insights.

Each insight should start with •
Maximum 1 sentence each.
`;

  let insights = "No insights available.";

  try {
    insights = await askGemini(prompt);
  } catch {
    insights = "Unable to generate AI insights.";
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">
        🤖 AI Business Insights
      </h2>

      <div className="whitespace-pre-wrap text-gray-700">
        {insights}
      </div>
    </div>
  );
}
