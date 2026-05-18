import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useUser } from "../../hooks/useUser";
import { useTheme } from "../../hooks/useTheme";

const Header = () => {
  const { user, logout } = useUser();
  const { totalQuantity } = useCart();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur">
      <div className="mx-auto flex min-h-18 w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-3 text-[var(--text-h)] no-underline"
          aria-label="Product home"
        >
          <span className="grid size-10 place-items-center rounded-lg bg-[var(--accent)] text-base font-bold text-[var(--button-text)] shadow-sm">
            P
          </span>
          <span className="text-xl font-semibold tracking-normal">Product</span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3" aria-label="Main navigation">
          {user && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                [
                  "inline-flex relative h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium no-underline transition",
                  isActive
                    ? "border-[var(--accent-border)] bg-[var(--accent-bg)] text-[var(--accent)]"
                    : "border-[var(--border)] text-[var(--text-h)] hover:border-[var(--accent-border)] hover:bg-[var(--social-bg)]",
                ].join(" ")
              }
            >
              <svg
                aria-hidden="true"
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--danger)] text-xs font-bold text-[var(--button-text)]">
                {totalQuantity}
              </div>
            </NavLink>
          )}


          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--border)] px-3 text-sm font-medium text-[var(--text-h)] transition hover:border-[var(--accent-border)] hover:bg-[var(--social-bg)]"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            aria-pressed={isDark}
          >
            {isDark ? (
              <svg
                aria-hidden="true"
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 7.5A9 9 0 1 1 12 3Z" />
              </svg>
            )}
            <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
          </button>
            {user && (
              <span className="inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--border)] px-3 text-sm font-medium text-[var(--text-h)]">
                {user.email}
              </span>
            )}
          <NavLink
            to="/login"
            onClick={user ? logout : undefined}
            className={({ isActive }) =>
              [
                "inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-semibold no-underline transition",
                isActive
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--button-text)]"
                  : "border-[var(--accent)] bg-[var(--accent)] text-[var(--button-text)] hover:opacity-90",
              ].join(" ")
            }
          >
            {user ? "Logout" : "Login"}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
