"use client";

import { updateTable } from "@/app/dashboard/tables/actions";

type Table = {
  id: string;
  table_number: number;
  capacity: number;
  status: string;
  qr_code: string | null;
};

export default function EditTableDialog({
  item,
}: {
  item: Table;
}) {
  return (
    <details>
      <summary className="cursor-pointer text-blue-600">
        Edit
      </summary>

      <form
        action={updateTable}
        className="space-y-3 border rounded-lg p-4 mt-3"
      >
        <input type="hidden" name="id" defaultValue={item.id} />

        <input
          name="table_number"
          defaultValue={item.table_number}
          className="border p-2 w-full"
        />

        <input
          name="capacity"
          defaultValue={item.capacity}
          className="border p-2 w-full"
        />

        <select
          name="status"
          defaultValue={item.status}
          className="border p-2 w-full"
        >
          <option>available</option>
          <option>occupied</option>
          <option>reserved</option>
        </select>

        <input
          name="qr_code"
          defaultValue={item.qr_code ?? ""}
          className="border p-2 w-full"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </details>
  );
}
