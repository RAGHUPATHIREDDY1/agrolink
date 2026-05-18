import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart();

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Checkout cart</p>
            <h1 className="text-3xl font-semibold text-slate-900">Your selected farm products</h1>
          </div>
          <Link to="/products" className="text-sm font-semibold text-emerald-700 hover:text-emerald-900">
            Continue shopping
          </Link>
        </div>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.7fr]">
          <div className="space-y-4 rounded-[2rem] bg-white p-6 shadow-sm">
            {cartItems.map((item) => (
              <article key={item.id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{item.seller?.name}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.currency || 'USD'} {item.price} each</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    Qty
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className="w-20 rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 text-center outline-none"
                    />
                  </label>
                  <button
                    className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
          <aside className="rounded-[2rem] bg-emerald-900 p-6 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">Order summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm text-emerald-100/80">
                <span>Products total</span>
                <span>{cartItems[0]?.currency || 'USD'} {getTotal}</span>
              </div>
              <div className="rounded-3xl bg-white/10 p-5 text-sm">
                <p className="font-medium">Ready to place order?</p>
                <p className="mt-2 text-slate-200">Proceed to checkout to confirm delivery address and payment details.</p>
              </div>
            </div>
            <Link
              to="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-yellow-400 px-5 py-3 font-semibold text-slate-900 transition hover:bg-yellow-300"
            >
              Continue to checkout
            </Link>
          </aside>
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-12 text-center text-slate-600 shadow-sm">
          Your cart is empty. Add products from the marketplace first.
          <div className="mt-4">
            <Link className="font-semibold text-emerald-700 hover:text-emerald-900" to="/products">Browse products</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
