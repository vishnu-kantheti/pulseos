import { Badge } from "@/components/ui/badge";

const orders = [
  {
    id: "#1001",
    table: "Table 4",
    status: "Preparing",
  },
  {
    id: "#1002",
    table: "Table 2",
    status: "Ready",
  },
  {
    id: "#1003",
    table: "Table 8",
    status: "Served",
  },
];

export default function RecentOrders() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Recent Orders
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{order.id}</p>
              <p className="text-sm text-gray-500">
                {order.table}
              </p>
            </div>

            <Badge>{order.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
