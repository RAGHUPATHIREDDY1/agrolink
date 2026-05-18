import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';

function MyProducts() {
  const { user } = useAuth();
  const { products, deleteProduct } = useProducts();

  const myProducts = useMemo(
    () => products.filter((product) => product.seller?.email === user?.email),
    [products, user]
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Seller products</p>
            <h1 className="text-3xl font-semibold text-slate-900">Your uploaded listings</h1>
          </div>
          <Link
            to="/seller/add-product"
            className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Add new product
          </Link>
        </div>
      </div>
      {myProducts.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-3">
          {myProducts.map((item) => (
            <div key={item.id} className="rounded-[2rem] bg-white p-6 shadow-sm">
              <div className="mb-4 overflow-hidden rounded-3xl bg-slate-100">
                <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                <p className="text-sm text-slate-600">{item.category} • {item.currency || 'USD'} {item.price}</p>
                <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => deleteProduct(item.id)}
                  className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                >
                  Delete
                </button>
                <Link
                  to={`/product/${item.id}`}
                  className="rounded-full border border-emerald-700 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-12 text-center text-slate-600 shadow-sm">
          You have not uploaded any products yet. Add your first listing now.
        </div>
      )}
    </div>
  );
}

export default MyProducts;
