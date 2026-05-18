import { Outlet } from 'react-router-dom';

function Layout({ title, subtitle }) {
  return (
    <section className="mx-auto max-w-7xl space-y-4 py-6">
      <header className="rounded-3xl bg-emerald-50 px-6 py-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Agrolink Marketplace</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-slate-600">{subtitle}</p>}
      </header>
      <Outlet />
    </section>
  );
}

export default Layout;
