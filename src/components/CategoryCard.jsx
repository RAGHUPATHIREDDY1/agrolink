import { Link } from 'react-router-dom';

function CategoryCard({ title, description, link }) {
  return (
    <Link
      to={link}
      className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <h3 className="text-xl font-semibold text-slate-900 group-hover:text-emerald-700">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
        Browse {title}
      </span>
    </Link>
  );
}

export default CategoryCard;
