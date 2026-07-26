"use client";

import { updateRestaurantSettings } from "@/app/dashboard/settings/actions";

export default function SettingsForm({
  restaurant,
}: {
  restaurant: any;
}) {
  return (
    <form
      action={updateRestaurantSettings}
      className="space-y-4 max-w-xl"
    >
      <input
        type="hidden"
        name="id"
        defaultValue={restaurant.id}
      />

      <input
        name="name"
        defaultValue={restaurant.name}
        placeholder="Restaurant Name"
        className="border p-2 w-full rounded"
      />

      <input
        name="email"
        defaultValue={restaurant.email}
        placeholder="Email"
        className="border p-2 w-full rounded"
      />

      <input
        name="phone"
        defaultValue={restaurant.phone}
        placeholder="Phone"
        className="border p-2 w-full rounded"
      />

      <textarea
        name="address"
        defaultValue={restaurant.address}
        placeholder="Address"
        className="border p-2 w-full rounded"
      />

      <button className="bg-black text-white px-5 py-2 rounded">
        Save Settings
      </button>
    </form>
  );
}
