"use client";

import { useState } from "react";
import { deleteTable } from "@/app/dashboard/tables/actions";
import EditTableDialog from "./EditTableDialog";
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

            <th>Table</th>

            <th>Capacity</th>

            <th>Status</th>

            <th>QR Code</th>

            <th>
  Actions
</th>

          </tr>

        </thead>

        <tbody>

          {items
.filter(item =>
    item.table_number
      .toString()
      .includes(search)
).map((item) => (

            <tr
              key={item.id}
              className="border-t"
            >
		<td>{item.table_number}</td>

<td>{item.capacity}</td>

<td>{item.status}</td>

<td>
    {item.qr_code ? "✅" : "❌"}
</td>

<td className="space-x-3">

    <EditTableDialog item={item} />

    <form action={deleteTable} className="inline">
        <input
            type="hidden"
            name="id"
            value={item.id}
        />

        <button className="text-red-600">
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
