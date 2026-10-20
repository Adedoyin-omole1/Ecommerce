import ProductDetails from "@/Components/admin/ProductDetails";

export const metadata = {
  title: "Product Details",
  description: "View product details",
};

export default function ProductDetailPage({ params }) {
  return <ProductDetails id={params.id} />;
}
