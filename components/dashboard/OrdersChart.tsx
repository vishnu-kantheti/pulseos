"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#eab308",
  "#ef4444",
  "#3b82f6",
];

export default function OrdersChart({
  data,
}: {
  data: any[];
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">

      <h2 className="font-bold text-lg mb-4">
        Orders
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="status"
            outerRadius={100}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}
