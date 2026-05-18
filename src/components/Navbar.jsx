import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-3 text-xl font-semibold text-emerald-800">
          <span className="inline-block h-10 w-10 rounded-full bg-emerald-600 text-white text-center leading-10 shadow-lg">
            A
          </span>
          Agrolink
        </Link>
        <nav className="hidden items-center gap-3 md:flex">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/market">Market</NavLink>
          <NavLink className="nav-link" to="/products">Products</NavLink>
          <NavLink className="nav-link" to="/orders">Orders</NavLink>
          {user?.role === 'seller' && (
            <>
              <NavLink className="nav-link" to="/seller/dashboard">Seller</NavLink>
            </>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-900">
                {user?.role} | {user?.fullName.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
