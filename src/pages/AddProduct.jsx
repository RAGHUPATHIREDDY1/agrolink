import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';

function AddProduct() {
  const { user } = useAuth();
  const { addProduct } = useProducts();
  const [form, setForm] = useState({
    title: '',
    category: 'Fruits',
    price: '',
    quantity: '',
    description: '',
    image: '',
    condition: 'New'
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const product = {
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
        id: user?.id || `sel_${Date.now()}`,
        name: user?.fullName || '',
        email: user?.email || ''
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    addProduct(product);
    setMessage('Product added successfully.');
    setTimeout(() => navigate('/seller/products'), 1200);
  };

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-slate-900">Add a new product</h1>
      <p className="mt-2 text-slate-600">Fill out the product details and publish your listing in the marketplace.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Product name</span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
          <span className="text-sm font-medium text-slate-700">Description</span>
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
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
              onChange={handleChange}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
            >
              <option>New</option>
              <option>Used</option>
            </select>
          </label>
          <div className="rounded-3xl bg-emerald-50 p-4">
            <p className="text-sm text-emerald-700">Seller</p>
            <p className="mt-2 text-sm text-slate-700">{user?.fullName}</p>
            <p className="text-sm text-slate-700">{user?.email}</p>
          </div>
        </div>

        {message && <p className="text-sm text-emerald-700">{message}</p>}
        <button type="submit" className="w-full rounded-full bg-emerald-700 px-5 py-3 text-white transition hover:bg-emerald-800">
          Publish product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
