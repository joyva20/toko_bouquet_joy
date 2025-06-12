import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

// Contoh Ikon Sederhana (nanti bisa diganti dengan SVG)
const DashboardIcon = () => <span>📊</span>; 
const OrdersIcon = () => <span>📦</span>;
const ProductsIcon = () => <span>🛍️</span>;
const CategoriesIcon = () => <span>🏷️</span>;
const UsersIcon = () => <span>👥</span>;

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  // Perlindungan rute: hanya admin yang bisa mengakses
  if (!session || session.user?.role !== "ADMIN") {
    return redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar Biru */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col shadow-lg">
        <div className="p-6 text-2xl font-bold border-b border-blue-800">
          <Link href="/admin">Bouquet Joy</Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-800 transition-colors">
            <DashboardIcon /> Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-800 transition-colors">
            <OrdersIcon /> Orders
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-800 transition-colors">
            <ProductsIcon /> Products
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-800 transition-colors">
            <CategoriesIcon /> Categories
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-800 transition-colors">
            <UsersIcon /> Users
          </Link>
        </nav>
        <div className="p-4 border-t border-blue-800">
          <p className="text-sm">Logged in as {session.user?.name}</p>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;