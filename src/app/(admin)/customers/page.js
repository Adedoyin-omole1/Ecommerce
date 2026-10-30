'use client';
import AdminTable from '@/Components/admin/AdminTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const CUSTOMERS = [
  { id: 1, name: 'Olivia Carter', email: 'olivia@example.com', orders: 12, spent: 892.50, joined: '2024-01-15' },
  { id: 2, name: 'Liam Wilson', email: 'liam@example.com', orders: 8, spent: 542.00, joined: '2024-02-20' },
  { id: 3, name: 'Sophia Martinez', email: 'sophia@example.com', orders: 24, spent: 1849.99, joined: '2023-11-05' },
];

export default function AdminCustomersPage() {
  const columns = [
    { header: 'Customer', key: 'name', render: (row) => <span className="font-semibold text-gray-900">{row.name}</span> },
    { header: 'Email', key: 'email' },
    { header: 'Orders', key: 'orders' },
    { header: 'Total Spent', key: 'spent', render: (row) => `$${row.spent.toFixed(2)}` },
    { header: 'Joined', key: 'joined' },
    {
      header: 'Actions',
      key: 'actions',
      render: () => (
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-orange-500"><FontAwesomeIcon icon={faPen} /></button>
          <button className="text-gray-400 hover:text-red-500"><FontAwesomeIcon icon={faTrashCan} /></button>
        </div>
      )
    }
  ];

  return <AdminTable title="Customers" description="Manage your store customers." data={CUSTOMERS} columns={columns} searchKeys={['name', 'email']} />;
}