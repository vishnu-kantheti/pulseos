"use client";

import { useState } from "react";
import { deleteReview } from "@/app/dashboard/reviews/actions";

type Props = {
  items: any[];
};

export default function ReviewsTable({ items }: Props) {

  const [search, setSearch] = useState("");

  return (
    <div className="overflow-x-auto rounded-lg border">

      <input
        type="text"
        placeholder="Search reviews..."
        className="border rounded-lg px-4 py-2 mb-5 w-80"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>

            <th className="p-3 text-left">
              Rating
            </th>

            <th className="p-3 text-left">
              Comment
            </th>

            <th className="p-3 text-left">
              Customer
            </th>

            <th className="p-3 text-left">
              Order
            </th>

            <th className="p-3 text-left">
              Date
            </th>

            <th className="p-3 text-left">
              Action
            </th>

          </tr>
        </thead>

        <tbody>

          {items
            .filter(
              (item) =>
                (item.comment ?? "")
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||

                (item.customer_id ?? "")
                  .toLowerCase()
                  .includes(search.toLowerCase())
            )
            .map((item) => (

              <tr
                key={item.id}
                className="border-t"
              >

                <td className="p-3">
                  ⭐ {item.rating}
                </td>

                <td className="p-3">
                  {item.comment}
                </td>

                <td className="p-3">
                  {item.customer_id ?? "-"}
                </td>

                <td className="p-3">
                  {item.order_id ?? "-"}
                </td>

                <td className="p-3">
                  {item.created_at?.slice(0,10)}
                </td>

                <td className="p-3">

                  <form action={deleteReview}>

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
