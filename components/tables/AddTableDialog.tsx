"use client";

import { addTable } from "@/app/dashboard/tables/actions";

export default function AddTableDialog() {
  return (
    <form action={addTable} className="space-y-4 border rounded-lg p-6 mb-8">

      <input
        type="hidden"
        name="restaurant_id"
        value="6ae76ac5-caec-4ea8-8829-e7319144125e"
      />

      <input
        name="table_number"
        type="number"
        placeholder="Table Number"
        className="border p-2 w-full"
      />

      <input
        name="capacity"
        type="number"
        placeholder="Capacity"
        className="border p-2 w-full"
      />

      <select
        name="status"
        className="border p-2 w-full"
      >
        <option>available</option>
        <option>occupied</option>
        <option>reserved</option>
      </select>

      <input
        name="qr_code"
        placeholder="QR Code URL"
        className="border p-2 w-full"
      />

      <button className="bg-black text-white px-4 py-2 rounded">
        Add Table
      </button>

    </form>
  );
}
