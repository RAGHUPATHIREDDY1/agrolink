import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext.jsx';
import ProductCard from '../components/ProductCard.jsx';

function CategoryPage() {
  const { name } = useParams();
  const { filterByCategory, loading } = useProducts();
  const products = filterByCategory(name);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Category</p>
        <h1 className="text-3xl font-semibold text-slate-900">{name}</h1>
        <p className="mt-2 text-slate-600">Explore all the {name.toLowerCase()} listings available in the marketplace.</p>
      </section>

      {loading ? (
        <div className="rounded-3xl bg-white p-12 text-center text-slate-600 shadow-sm">Loading products...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="rounded-3xl bg-white p-12 text-center text-slate-600 shadow-sm">
              No products found in this category. Please check other categories.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
