"use client";

import { updateMenuItem } from "@/app/dashboard/menu/actions";

type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  prep_time: number;
  is_veg: boolean;
  available: boolean;
};

export default function EditMenuDialog({
  item,
}: {
  item: MenuItem;
}) {
  return (
    <details>
      <summary className="cursor-pointer text-blue-600 hover:underline">
        Edit
      </summary>

      <form
        action={updateMenuItem}
        className="mt-4 space-y-3 border rounded-lg p-4"
      >
        <input type="hidden" name="id" defaultValue={item.id} />

        <input
          name="name"
          defaultValue={item.name}
          className="border p-2 w-full"
        />

        <input
          name="description"
          defaultValue={item.description ?? ""}
          className="border p-2 w-full"
        />

        <input
          name="category"
          defaultValue={item.category}
          className="border p-2 w-full"
        />

        <input
          type="number"
          name="price"
          defaultValue={item.price}
          className="border p-2 w-full"
        />

        <input
          type="number"
          name="prep_time"
          defaultValue={item.prep_time}
          className="border p-2 w-full"
        />

        <select
          name="is_veg"
          defaultValue={String(item.is_veg)}
          className="border p-2 w-full"
        >
          <option value="true">Veg</option>
          <option value="false">Non Veg</option>
        </select>

        <select
          name="available"
          defaultValue={String(item.available)}
          className="border p-2 w-full"
        >
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </details>
  );
}
