import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    setIsLoggedIn(!!accessToken);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/";
  };

  const navLinks = [
    { path: "/landing", label: "Home", isHash: false },
    { path: "/dashboard", label: "Dashboard", isHash: false },
    { path: "/contact", label: "Contact", isHash: false },
    { path: "#how", label: "How it works", isHash: true },
    { path: "#testimonials", label: "Testimonials", isHash: true },
  ];

  const isActive = (path) =>
    !path.startsWith("#") && location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/landing" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
              <path d="M14 3v6h6" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight text-blue-600">
            DocAI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ path, label, isHash }) =>
            isHash ? (
              <a
                key={path}
                href={path}
                className="text-sm text-foreground/80 hover:text-foreground transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </a>
            ) : (
              <Link
                key={path}
                to={path}
                className={`text-sm transition ${
                  isActive(path)
                    ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            )
          )}

          {/* Login/Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-4 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="ml-4 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring transition"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 bg-background/90 backdrop-blur border-t border-border/60">
          <div className="flex flex-col items-center text-center space-y-4 text-gray-700 font-medium">
            {navLinks.map(({ path, label, isHash }) =>
              isHash ? (
                <a
                  key={path}
                  href={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg hover:text-blue-600 transition"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-lg transition ${
                    isActive(path)
                      ? "text-blue-600 font-semibold"
                      : "hover:text-blue-600"
                  }`}
                >
                  {label}
                </Link>
              )
            )}

            {/* Mobile Login/Logout Button */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-white shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-white shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
