"use client";

import { useState } from "react";

import {
  deleteInventoryItem,
} from "@/app/dashboard/inventory/actions";

import EditInventoryDialog from "./EditInventoryDialog";

type Props = {
  items: any[];
};

export default function InventoryTable({ items }: Props) {

  const [search, setSearch] = useState("");

  return (
    <div className="overflow-x-auto rounded-lg border">

      <input
        type="text"
        placeholder="Search inventory..."
        className="border rounded-lg px-4 py-2 mb-5 w-80"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-3 text-left">Item</th>
            <th className="p-3 text-left">Quantity</th>
            <th className="p-3 text-left">Unit</th>
            <th className="p-3 text-left">Minimum Stock</th>
            <th className="p-3 text-left">Expiry</th>
            <th className="p-3 text-left">Actions</th>
          </tr>

        </thead>

        <tbody>

          {items
            .filter((item) =>
              item.ingredient_name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((item) => (

              <tr
                key={item.id}
                className="border-t"
              >

                <td className="p-3">
                  {item.ingredient_name}
                </td>

                <td className="p-3">
                  {item.quantity}
                </td>

                <td className="p-3">
                  {item.unit}
                </td>
                <td className="p-3">
                  {item.minimum_stock}
                </td>

                <td className="p-3">
                  {item.expiry_date
                    ? item.expiry_date.slice(0,10)
                    : "-"}
                </td>

                <td className="p-3 space-x-3">

                  <EditInventoryDialog item={item} />

                  <form
                    action={deleteInventoryItem}
                    className="inline"
                  >

                    <input
                      type="hidden"
                      name="id"
                      value={item.id}
                    />

                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>

                  </form>

                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>
  );
}
