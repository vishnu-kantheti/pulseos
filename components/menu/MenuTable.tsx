"use client";

import { useState } from "react";
import { deleteMenuItem } from "@/app/dashboard/menu/actions";
import EditMenuDialog from "./EditMenuDialog";
type Props = {
  items: any[];
};

export default function MenuTable({ items }: Props) {
const [search, setSearch] = useState("");  
return (
    <div className="overflow-x-auto rounded-lg border">
	<input
  type="text"
  placeholder="Search menu..."
  className="border rounded-lg px-4 py-2 mb-5 w-80"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">Name</th>

            <th className="p-3 text-left">Category</th>

            <th className="p-3 text-left">Price</th>

            <th className="p-3 text-left">Prep Time</th>

            <th className="p-3 text-left">Available</th>
	    <th className="p-3 text-left">
  Actions
</th>

          </tr>

        </thead>

        <tbody>

          {items
  .filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  )
  .map((item) => (

            <tr
              key={item.id}
              className="border-t"
            >

              <td className="p-3">
                {item.name}
              </td>

              <td className="p-3">
                {item.category}
              </td>

              <td className="p-3">
                ₹{item.price}
              </td>

              <td className="p-3">
                {item.prep_time} min
              </td>

              <td className="p-3">
                {item.available ? "✅" : "❌"}
              </td>
              <td className="p-3 space-x-3">

  <EditMenuDialog item={item} />

  <form action={deleteMenuItem} className="inline">
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
