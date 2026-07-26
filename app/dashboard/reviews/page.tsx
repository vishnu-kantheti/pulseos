import { createClient } from "@/lib/supabase/server";

import ReviewsTable from "@/components/reviews/ReviewsTable";

export default async function ReviewsPage() {

  const supabase = await createClient();

  const { data } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Customer Reviews
      </h1>

      <ReviewsTable
        items={data ?? []}
      />

    </main>
  );
}
