import OrderDetails from "@/Components/admin/OrderDetails";

export const metadata = {
  title: "Order Details",
  description: "View order details",
};

export default function OrderDetailPage({ params }) {
  return <OrderDetails id={params.id} />;
}
