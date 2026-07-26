"use client";

import { updateInventoryItem } from "@/app/dashboard/inventory/actions";

type InventoryItem = {
  id: string;
  ingredient_name: string;
  quantity: number;
  unit: string;
  minimum_stock: number;
  last_restocked_at: string;
  expiry_date: string;
};

export default function EditInventoryDialog({
  item,
}: {
  item: InventoryItem;
}) {
  return (
    <details>
      <summary className="cursor-pointer text-blue-600 hover:underline">
        Edit
      </summary>

      <form
        action={updateInventoryItem}
        className="mt-4 space-y-3 border rounded-lg p-4"
      >
        <input type="hidden" name="id" defaultValue={item.id} />

        <input
          name="ingredient_name"
          defaultValue={item.ingredient_name}
          className="border p-2 w-full"
        />

        <input
          type="number"
          name="quantity"
	  defaultValue={item.quantity}
          className="border p-2 w-full"
        />

        <input
          name="unit"
          defaultValue={item.unit}
          className="border p-2 w-full"
        />

        <input
          type="number"
          name="minimum_stock"
          defaultValue={item.minimum_stock}
          className="border p-2 w-full"
        />

        <input
          type="date"
          name="last_restocked_at"
          defaultValue={item.last_restocked_at?.slice(0, 10)}
          className="border p-2 w-full"
        />

        <input
          type="date"
          name="expiry_date"
          defaultValue={item.expiry_date?.slice(0, 10)}
          className="border p-2 w-full"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </details>
  );
}

