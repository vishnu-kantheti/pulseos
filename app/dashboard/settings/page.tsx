import { createClient } from "@/lib/supabase/server";

import SettingsForm from "@/components/settings/SettingsForm";

export default async function SettingsPage() {

  const supabase = await createClient();

  const { data } = await supabase
    .from("restaurants")
    .select("*")
    .limit(1)
    .single();

  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Restaurant Settings
      </h1>

      <SettingsForm restaurant={data} />

    </main>
  );
}
