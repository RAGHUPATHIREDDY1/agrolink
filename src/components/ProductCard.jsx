import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="card-shadow rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden rounded-3xl bg-slate-100">
        <img src={product.image} alt={product.title} className="h-52 w-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold uppercase text-white">
          {product.category}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{product.description}</p>
        </div>
        <span className="text-xl font-bold text-emerald-800">{product.currency || 'USD'} {product.price}</span>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>Qty: {product.quantity}</span>
        <Link
          to={`/product/${product.id}`}
          className="rounded-full bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
