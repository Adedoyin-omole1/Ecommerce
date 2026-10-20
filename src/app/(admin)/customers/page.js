import CustomerList from "@/Components/admin/CustomerList";

export const metadata = {
  title: "Customers",
  description: "Manage customers",
};

export default function CustomersPage() {
  return <CustomerList />;
}
