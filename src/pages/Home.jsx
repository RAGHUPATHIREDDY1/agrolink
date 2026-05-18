import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useProducts } from '../context/ProductContext.jsx';

const categories = [
  { title: 'Fruits', description: 'Fresh fruits from local farms.', link: '/category/Fruits' },
  { title: 'Vegetables', description: 'Vegetables harvested daily.', link: '/category/Vegetables' },
  { title: 'Animals', description: 'Healthy livestock for your farm.', link: '/category/Animals' },
  { title: 'Machinery', description: 'Reliable farming machines and tools.', link: '/category/Machinery' }
];

function Home() {
  const { products, loading } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="grid gap-8 rounded-[2rem] bg-emerald-900 px-6 py-14 text-white shadow-2xl md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-emerald-200/20 px-4 py-2 text-sm uppercase tracking-[0.3em] text-emerald-100">
            Smart agricultural marketplace
          </span>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">Buy, sell and manage farm products with Agrolink.</h1>
          <p className="max-w-xl text-slate-100/90">
            Agrolink makes it easy for buyers and sellers to connect, manage listings, track orders, and keep every product organized in one clean web app.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/market" className="rounded-full bg-yellow-400 px-6 py-3 font-semibold text-slate-950 shadow-lg transition hover:bg-yellow-300">
              Buy now
            </Link>
            <Link to="/market" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Post item to sell
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] bg-white/10 p-8 backdrop-blur-xl">
          <div className="space-y-4 text-slate-100">
            <h2 className="text-2xl font-semibold">Why Agrolink?</h2>
            <p>Easy product upload, category navigation, seller contacts, cart and orders with a simple React-driven experience.</p>
            <ul className="space-y-3 text-sm text-slate-200">
              <li>• Role-based authentication for buyer and seller</li>
              <li>• Category pages with search and filters</li>
              <li>• Cart, wishlist, checkout and order management</li>
              <li>• Simple localStorage backend simulation</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Categories</p>
            <h2 className="text-3xl font-semibold text-slate-900">Shop by category</h2>
          </div>
          <Link className="text-sm font-semibold text-emerald-700 hover:text-emerald-900" to="/products">
            See all products
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((item) => (
            <CategoryCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Featured</p>
            <h2 className="text-3xl font-semibold text-slate-900">Latest products</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-slate-600 hover:text-emerald-700">
            Browse all items
          </Link>
        </div>
        {loading ? (
          <div className="rounded-3xl bg-white p-8 shadow-sm">Loading products...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
