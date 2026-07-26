import {
Card,
CardHeader,
CardTitle,
CardContent,
} from "@/components/ui/card";

type Props={
restaurants:number;
menu:number;
orders:number;
inventory:number;
reviews:number;
};

export default function DashboardCards({
restaurants,
menu,
orders,
inventory,
reviews,
}:Props){

const cards=[
{
title:"Restaurants",
value:restaurants,
},
{
title:"Menu Items",
value:menu,
},
{
title:"Orders",
value:orders,
},
{
title:"Inventory",
value:inventory,
},
{
title:"Reviews",
value:reviews,
},
];

return(

<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">

{cards.map((card)=>(

<Card key={card.title}>

<CardHeader>

<CardTitle>{card.title}</CardTitle>

</CardHeader>

<CardContent>

<p className="text-4xl font-bold">
{card.value}
</p>

</CardContent>

</Card>

))}

</div>

);

}
