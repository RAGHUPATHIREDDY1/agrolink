import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Checkout() {
  const { cartItems, getTotal, placeOrder } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState(user?.address || '');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!address.trim()) {
      setMessage('Please enter a delivery address.');
      return;
    }
    const order = placeOrder(address);
    if (order) {
      setMessage('Order placed successfully!');
      setTimeout(() => {
        navigate('/orders');
      }, 1200);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center text-slate-600 shadow-sm">
        Your cart is empty. Add items before checking out.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Checkout</p>
        <h1 className="text-3xl font-semibold text-slate-900">Confirm delivery and payment</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] bg-white p-6 shadow-sm">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Delivery address</span>
            <textarea
              rows="4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Payment method</p>
              <p className="mt-2 font-semibold text-slate-900">Cash on Delivery</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Contact</p>
              <p className="mt-2 font-semibold text-slate-900">{user?.phone}</p>
            </div>
          </div>
          {message && <p className="text-sm text-emerald-700">{message}</p>}
          <button type="submit" className="w-full rounded-full bg-emerald-700 px-5 py-3 text-white transition hover:bg-emerald-800">
            Place order ₹{getTotal}
          </button>
        </form>

        <aside className="rounded-[2rem] bg-emerald-50 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-emerald-900">Order summary</h2>
          <div className="mt-6 space-y-4 text-slate-700">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 rounded-3xl bg-white p-4">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-slate-500">Qty {item.quantity}</p>
                </div>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="rounded-3xl bg-white p-4">
              <div className="flex items-center justify-between text-slate-700">
                <span>Total</span>
                <span className="font-semibold">₹{getTotal}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
