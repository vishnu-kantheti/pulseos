"use client";

import { addMenuItem } from "@/app/dashboard/menu/actions";

export default function AddMenuForm() {
  return (
    <form action={addMenuItem} className="space-y-4 border rounded-lg p-6 mb-8">

      <input
        type="hidden"
        name="restaurant_id"
        value="6ae76ac5-caec-4ea8-8829-e7319144125e"
      />

      <input
        name="name"
        placeholder="Food Name"
        className="border p-2 w-full"
      />

      <input
        name="description"
        placeholder="Description"
        className="border p-2 w-full"
      />

      <input
        name="category"
        placeholder="Category"
        className="border p-2 w-full"
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        className="border p-2 w-full"
      />

      <input
        name="prep_time"
        type="number"
        placeholder="Prep Time"
        className="border p-2 w-full"
      />

      <select
        name="is_veg"
        className="border p-2 w-full"
      >
        <option value="true">Veg</option>
        <option value="false">Non Veg</option>
      </select>

      <button
        className="bg-black text-white px-4 py-2 rounded"
      >
        Add Menu Item
      </button>

    </form>
  );
}
