export default function Header() {
  return (
    <header className="app-header">
      <div className="page-shell flex min-h-20 items-center">
        <div className="flex min-w-0 items-center gap-3">
          <div className="brand-icon">
            <img
              src="/assets/tbh-archer-logo.png"
              alt=""
              width="68"
              height="68"
            />
          </div>
          <div className="min-w-0">
            <h1 className="brand-title truncate text-xl font-extrabold tracking-tight sm:text-2xl">
              TBH <span className="text-gradient">Balance</span>
            </h1>
            <p className="brand-subtitle hidden text-xs sm:block">
              Cofre de Task Bar Hero
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
