import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-12 shadow-sm text-center">
      <p className="text-7xl font-bold text-emerald-700">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">The page you are looking for does not exist. Return to the home page or browse products.</p>
      <Link to="/" className="mt-6 inline-flex rounded-full bg-emerald-700 px-6 py-3 text-white transition hover:bg-emerald-800">
        Go home
      </Link>
    </div>
  );
}

export default NotFound;
