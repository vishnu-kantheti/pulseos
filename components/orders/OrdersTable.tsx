type Props = {
  orders: any[];
};

export default function OrdersTable({ orders }: Props) {
  return (
    <div className="rounded-lg border overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              Order
            </th>

            <th className="p-3 text-left">
              Customer
            </th>

            <th className="p-3 text-left">
              Table
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-left">
              Total
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr
              key={order.id}
              className="border-t"
            >

              <td className="p-3">
                {order.id.slice(0,8)}
              </td>

              <td className="p-3">
                {order.profiles?.full_name ?? "-"}
              </td>

              <td className="p-3">
                {order.restaurant_tables?.table_number ?? "-"}
              </td>

              <td className="p-3">
                {order.status}
              </td>

              <td className="p-3">
                ₹{order.total}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
