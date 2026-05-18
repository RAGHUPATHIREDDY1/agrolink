import { useMemo, useState } from 'react';
import { useProducts } from '../context/ProductContext.jsx';
import ProductCard from '../components/ProductCard.jsx';

function Products() {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    let items = products;
    if (category !== 'All') {
      items = items.filter((product) => product.category === category);
    }
    if (search.trim()) {
      const query = search.toLowerCase();
      items = items.filter(
        (product) =>
          product.title?.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.seller?.name.toLowerCase().includes(query)
      );
    }
    return items;
  }, [products, category, search]);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Product catalog</p>
            <h1 className="text-3xl font-semibold text-slate-900">Browse all available listings</h1>
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_240px]">
            <input
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fruits, vegetables, animals, machinery"
            />
            <select
              className="rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All</option>
              <option>Fruits</option>
              <option>Vegetables</option>
              <option>Animals</option>
              <option>Machinery</option>
            </select>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="rounded-3xl bg-white p-12 text-center text-slate-600 shadow-sm">Loading products...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.length > 0 ? (
            filtered.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="rounded-3xl bg-white p-12 text-center text-slate-600 shadow-sm">
              No products match your search. Try a different keyword or category.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Products;
