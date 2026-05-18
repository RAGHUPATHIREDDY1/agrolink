import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';

function SellerDashboard() {
  const { user } = useAuth();
  const { products } = useProducts();

  const myProducts = useMemo(
    () => products.filter((product) => product.seller?.email === user?.email),
    [products, user]
  );

  const totalStock = myProducts.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Seller dashboard</p>
        <h1 className="text-3xl font-semibold text-slate-900">Welcome back, {user?.fullName.split(' ')[0]}</h1>
        <p className="mt-2 text-slate-600">Manage your products, stock, and seller listings from one place.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[2rem] bg-gradient-to-br from-emerald-700 to-emerald-900 p-6 text-white shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">Total listings</p>
          <p className="mt-3 text-4xl font-semibold">{myProducts.length}</p>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Total quantity available</p>
          <p className="mt-3 text-4xl font-semibold text-slate-900">{totalStock}</p>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Featured product</p>
          {myProducts.length > 0 ? (
            <p className="mt-3 text-lg font-semibold text-slate-900">{myProducts[0].title}</p>
          ) : (
            <p className="mt-3 text-slate-600">Add your first product to see it here.</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Quick actions</h2>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li>• Add, edit, or delete product listings</li>
            <li>• Track quantity available</li>
            <li>• Keep seller contact details updated</li>
          </ul>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Your contact</h2>
          <p className="mt-3 text-slate-600">Email: {user?.email}</p>
          <p className="mt-1 text-slate-600">Phone: {user?.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
