'use client';
import AdminTable from '@/Components/admin/AdminTable';

const ORDERS = [
  { id: '#10258', customer: 'Olivia Carter', total: 89.00, status: 'Delivered', date: '2025-05-28' },
  { id: '#10257', customer: 'Liam Wilson', total: 120.00, status: 'Processing', date: '2025-05-28' },
  { id: '#10256', customer: 'Sophia Martinez', total: 45.00, status: 'Shipped', date: '2025-05-27' },
];

const STATUS_STYLES = {
  'Delivered': 'bg-emerald-50 text-emerald-600',
  'Processing': 'bg-amber-50 text-amber-600',
  'Shipped': 'bg-blue-50 text-blue-600',
};

export default function AdminOrdersPage() {
  const columns = [
    { header: 'Order', key: 'id', render: (row) => <span className="font-semibold text-gray-900">{row.id}</span> },
    { header: 'Customer', key: 'customer' },
    { header: 'Total', key: 'total', render: (row) => `$${row.total.toFixed(2)}` },
    {
      header: 'Status', key: 'status', render: (row) => (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${STATUS_STYLES[row.status]}`}>{row.status}</span>
      )
    },
    { header: 'Date', key: 'date' },
  ];

  return <AdminTable title="Orders" description="Manage all your store orders." data={ORDERS} columns={columns} searchKeys={['id', 'customer']} />;
}