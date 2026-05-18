import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

function ProductDetail() {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const product = getProductById(id);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center text-slate-600 shadow-sm">
        Product not found. Please return to the product listing.
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setMessage('Added to cart successfully.');
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <img src={product.image} alt={product.title} className="h-96 w-full rounded-3xl object-cover" />
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">{product.category}</p>
                <h1 className="text-3xl font-semibold text-slate-900">{product.title}</h1>
              </div>
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-emerald-800">{product.currency || 'USD'} {product.price}</span>
            </div>
            <p className="text-slate-600">{product.description}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Quantity</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{product.quantity}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Condition</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{product.condition}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Status</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{product.status}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAddToCart}
                className="rounded-full bg-emerald-700 px-6 py-3 text-white transition hover:bg-emerald-800"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className="rounded-full border border-emerald-600 px-6 py-3 text-emerald-700 transition hover:bg-emerald-50"
              >
                {isWishlisted(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
            {message && <p className="text-sm text-emerald-700">{message}</p>}
          </div>
        </div>
        <aside className="space-y-5 rounded-[2rem] bg-white p-6 shadow-sm">
          <div className="space-y-3 rounded-3xl bg-emerald-50 p-5">
            <h2 className="text-xl font-semibold text-slate-900">Seller information</h2>
            <p className="text-slate-600">{product.seller?.name}</p>
            <p className="text-slate-600">{product.seller?.email}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5 text-slate-700">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Product ID</p>
            <p className="mt-2 text-lg font-semibold">{product.id}</p>
            <p className="mt-1 text-sm text-slate-500">Created {new Date(product.createdAt).toLocaleDateString()}</p>
          </div>
          <button
            onClick={() => navigate('/cart')}
            className="w-full rounded-full bg-emerald-700 px-5 py-3 text-white transition hover:bg-emerald-800"
          >
            Go to Cart
          </button>
        </aside>
      </div>
    </div>
  );
}

export default ProductDetail;
