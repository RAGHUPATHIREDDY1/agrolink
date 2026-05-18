import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { postNewProduct } from '../services/api.js';

const categories = ['All', 'Fruits', 'Vegetables', 'Animals', 'Machinery'];

function Market() {
  const { user, isAuthenticated } = useAuth();
  const { products, addProduct } = useProducts();
  const { addToCart } = useCart();
  const [mode, setMode] = useState('buy');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [form, setForm] = useState({
    title: '',
    category: 'Fruits',
    price: '',
    quantity: '',
    description: '',
    image: '',
    condition: 'New'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        !query ||
        product.title?.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.seller?.name?.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, search]);

  const handleModeChange = (value) => {
    setMode(value);
    setMessage('');
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated || user?.role !== 'seller') {
      setMessage('Please login as a seller to post products.');
      return;
    }

    if (!form.title || !form.price || !form.quantity || !form.image || !form.description) {
      setMessage('Please complete all required fields before submitting.');
      return;
    }

    setIsSaving(true);
    setMessage('Sending your product to the marketplace...');

    const payload = {
      title: form.title,
      category: form.category,
      price: Number(form.price),
      currency: 'USD',
      quantity: Number(form.quantity),
      image: form.image,
      description: form.description,
      condition: form.condition,
      status: 'Available',
      seller: {
        id: user?.id || `seller-${Date.now()}`,
        name: user?.fullName || '',
        email: user?.email || ''
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const apiResult = await postNewProduct(payload);

    if (apiResult) {
      addProduct({ ...payload, id: apiResult.id || payload.createdAt });
      setMessage('Product posted successfully to the API and marketplace.');
    } else {
      addProduct({ ...payload, id: payload.createdAt });
      setMessage('Product added to the marketplace locally. API sync will work after you set the endpoint.');
    }

    setIsSaving(false);
    setForm({
      title: '',
      category: 'Fruits',
      price: '',
      quantity: '',
      description: '',
      image: '',
      condition: 'New'
    });
    navigate('/products');
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="rounded-[2rem] bg-emerald-950 px-6 py-10 text-white shadow-2xl md:flex md:items-center md:justify-between md:px-10">
        <div className="space-y-4 md:max-w-2xl">
          <span className="inline-flex rounded-full bg-emerald-200/20 px-4 py-2 text-sm uppercase tracking-[0.4em] text-emerald-200">
            Marketplace hub
          </span>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">Buy or sell farm products with one click.</h1>
          <p className="max-w-xl text-slate-200/90">
            Use Buy to browse every available fruit, vegetable, animal, and machinery listing. Use Sell to post a new product with name, category, image, price, and quantity.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-0">
          <button
            onClick={() => handleModeChange('buy')}
            className={`rounded-3xl px-6 py-4 text-lg font-semibold transition ${mode === 'buy' ? 'bg-yellow-400 text-slate-950 shadow-xl' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            Buy
          </button>
          <button
            onClick={() => handleModeChange('sell')}
            className={`rounded-3xl px-6 py-4 text-lg font-semibold transition ${mode === 'sell' ? 'bg-emerald-400 text-slate-950 shadow-xl' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            Sell
          </button>
        </div>
      </section>

      {mode === 'buy' ? (
        <section className="space-y-6 rounded-[2rem] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Buy products</p>
              <h2 className="text-3xl font-semibold text-slate-900">Browse every listing</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:w-1/2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search farm items"
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <article key={product.id} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <img src={product.image} alt={product.title} className="h-52 w-full rounded-3xl object-cover" />
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-900">{product.title}</h3>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">{product.category}</span>
                  </div>
                  <p className="text-slate-600 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{product.currency || 'USD'} {product.price}</span>
                    <span>Qty: {product.quantity}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => addToCart(product)}
                      className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                      Add to cart
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="rounded-full border border-emerald-700 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full rounded-[2rem] bg-white p-12 text-center text-slate-600 shadow-sm">
                No products were found for this search. Try a different category or keyword.
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="rounded-[2rem] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Sell product</p>
              <h2 className="text-3xl font-semibold text-slate-900">Post a new listing</h2>
              <p className="mt-2 text-slate-600">Enter product details and send them to the marketplace with a POST request.</p>
            </div>
            <div className="rounded-3xl bg-emerald-50 px-5 py-4 text-slate-700">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Pro tip</p>
              <p className="mt-2 text-sm">Use a clear image URL and add quantity so buyers can see the best listings.</p>
            </div>
          </div>

          {(!isAuthenticated || user?.role !== 'seller') ? (
            <div className="mt-8 rounded-[2rem] bg-slate-50 p-8 text-center text-slate-700 shadow-sm">
              <p className="text-xl font-semibold text-slate-900">Seller access required</p>
              <p className="mt-3">Please login or register as a seller to post products in the marketplace.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link to="/login" className="rounded-full bg-emerald-700 px-6 py-3 text-white transition hover:bg-emerald-800">
                  Login
                </Link>
                <Link to="/register" className="rounded-full border border-emerald-700 px-6 py-3 text-emerald-700 transition hover:bg-emerald-50">
                  Register
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Product Name</span>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleFormChange}
                    required
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Category</span>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                  >
                    <option>Fruits</option>
                    <option>Vegetables</option>
                    <option>Animals</option>
                    <option>Machinery</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Price</span>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleFormChange}
                    required
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Quantity</span>
                  <input
                    name="quantity"
                    type="number"
                    value={form.quantity}
                    onChange={handleFormChange}
                    required
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Image</span>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Product description</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  rows="4"
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Condition</span>
                  <select
                    name="condition"
                    value={form.condition}
                    onChange={handleFormChange}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                  >
                    <option>New</option>
                    <option>Used</option>
                  </select>
                </label>
                <div className="rounded-3xl bg-emerald-50 p-4">
                  <p className="text-sm text-emerald-700">Seller</p>
                  <p className="mt-2 text-sm text-slate-700">{user.fullName}</p>
                  <p className="text-sm text-slate-700">{user.email}</p>
                </div>
              </div>

              {message && <p className="text-sm text-emerald-700">{message}</p>}
              <button
                type="submit"
                disabled={isSaving}
                className="w-full rounded-full bg-emerald-700 px-5 py-3 text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-400"
              >
                {isSaving ? 'Posting product…' : 'Post product for buyers'}
              </button>
            </form>
          )}
        </section>
      )}
    </div>
  );
}

export default Market;
