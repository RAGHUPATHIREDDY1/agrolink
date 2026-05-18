import { useCart } from '../context/CartContext.jsx';

function Orders() {
  const { orders } = useCart();

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Order history</p>
        <h1 className="text-3xl font-semibold text-slate-900">Your previous orders</h1>
      </div>
      {orders.length > 0 ? (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order.id} className="rounded-[2rem] bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Order ID</p>
                  <p className="text-lg font-semibold text-slate-900">{order.id}</p>
                </div>
                <p className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">{order.status}</p>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">{order.items[0]?.currency || 'USD'} {order.total}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Delivery address</p>
                  <p className="mt-2 text-slate-700">{order.address}</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-slate-200 p-4">
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-500">Qty {item.quantity} • {item.currency || 'USD'} {item.price} each</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-12 text-center text-slate-600 shadow-sm">
          No orders yet. Complete checkout to see order history here.
        </div>
      )}
    </div>
  );
}

export default Orders;
