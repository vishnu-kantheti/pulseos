"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function InventoryChart({
  data,
}: {
  data: any[];
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">

      <h2 className="font-bold text-lg mb-4">
        Inventory
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="item_name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="quantity"
            fill="#16a34a"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}
