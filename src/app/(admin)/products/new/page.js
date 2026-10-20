import ProductForm from "@/Components/admin/ProductForm";

export const metadata = {
  title: "New Product",
  description: "Create a new product",
};

export default function NewProductPage() {
  return <ProductForm />;
}
