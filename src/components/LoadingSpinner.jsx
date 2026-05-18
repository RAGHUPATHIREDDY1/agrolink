function LoadingSpinner() {
  return (
    <div className="flex min-h-[240px] items-center justify-center rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3 text-slate-600">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
        <span>Loading marketplace...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
