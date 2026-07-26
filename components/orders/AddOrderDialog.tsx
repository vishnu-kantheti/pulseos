"use client";

import { useState } from "react";
import { createOrder } from "@/app/dashboard/orders/actions";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
type Customer = {
  id: string;
  full_name: string;
};

type RestaurantTable = {
  id: string;
  table_number: number;
};

type MenuItem = {
  id: string;
  name: string;
  price: number;
};

type Props = {
  customers: Customer[];
  tables: RestaurantTable[];
  menuItems: MenuItem[];
};
export default function AddOrderDialog({
  customers,
  tables,
  menuItems,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>

	<DialogTrigger
  render={
    <Button>
      + New Order
    </Button>
  }
/>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
        </DialogHeader>

        <form
          action={async (formData) => {
            await createOrder(formData);
            setOpen(false);
          }}
          className="space-y-4"
        >
	<select
  name="customer_id"
  className="w-full rounded-md border p-2"
>
  <option value="">Walk-in Customer</option>

  {customers.map((customer) => (
    <option
      key={customer.id}
      value={customer.id}
    >
      {customer.full_name}
    </option>
  ))}
</select>

<select
  name="table_id"
  className="w-full rounded-md border p-2"
  required
>
  <option value="">Select Table</option>

  {tables.map((table) => (
    <option
      key={table.id}
      value={table.id}
    >
      Table {table.table_number}
    </option>
  ))}
</select>

<select
  name="menu_item_id"
  className="w-full rounded-md border p-2"
  required
>
  <option value="">Select Menu Item</option>

  {menuItems.map((item) => (
    <option
      key={item.id}
      value={item.id}
    >
      {item.name} — ₹{item.price}
    </option>
  ))}
</select>

<Input
  name="quantity"
  type="number"
  defaultValue={1}
  min={1}
/>

          <Button type="submit" className="w-full">
            Create Order
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  );
}
