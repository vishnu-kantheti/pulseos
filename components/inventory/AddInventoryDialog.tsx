"use client";

import { addInventoryItem } from "@/app/dashboard/inventory/actions";

export default function AddInventoryDialog() {
  return (
    <form
      action={addInventoryItem}
      className="space-y-4 border rounded-lg p-6 mb-8"
    >
      <input
        type="hidden"
        name="restaurant_id"
        value="6ae76ac5-caec-4ea8-8829-e7319144125e"
      />

      <input
	name="ingredient_name"
        placeholder="Item Name"
        className="border p-2 w-full"
      />

      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        className="border p-2 w-full"
      />

      <input
        name="unit"
        placeholder="Unit (kg, L, pcs)"
        className="border p-2 w-full"
      />

      <input
        name="minimum_stock"
        type="number"
        placeholder="Minimum Stock"
        className="border p-2 w-full"
      />

      <input
        type="date"
        name="last_restocked_at"
        className="border p-2 w-full"
      />

      <input
        type="date"
        name="expiry_date"
        className="border p-2 w-full"
      />

      <button className="bg-black text-white px-4 py-2 rounded">
        Add Inventory Item
      </button>
    </form>
  );
}
