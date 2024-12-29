import { useEffect, useState } from 'react';
import { ShoppingBag, SquarePlus, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme') === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const location = useLocation(); // Hook to get the current route

  // Toggle dark mode and persist it in localStorage
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    const newTheme = darkMode ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', !darkMode);
    localStorage.setItem('theme', newTheme);
  };

  // Sync dark mode state on initial load
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="bg-gray-200 dark:bg-gray-800 w-max-[1140px] p-4 fixed top-0 right-0 left-0">
      <section className="flex items-center justify-between">
        <Link to="/">
          <h1 className="flex gap-1 items-center text-lg font-medium">
            Catalog <ShoppingBag size={20} strokeWidth={3} />
          </h1>
        </Link>
        <section className="flex items-center gap-4">
          {/* Conditionally render the "Create" link */}
          {location.pathname !== '/create' && (
            <Link className="navbar-btn" to="/create">
              <SquarePlus size={20} />
            </Link>
          )}
          <button
            onClick={toggleDarkMode}
            className="navbar-btn"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </section>
      </section>
    </header>
  );
};