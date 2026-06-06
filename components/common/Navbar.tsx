import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { Menu, X, LogOut, Settings, Home } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-600">
            <span className="text-2xl">🎓</span>
            <span>AI Copilot</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated && user && (
              <>
                <Link href="/dashboard" className="text-slate-700 dark:text-slate-300 hover:text-primary-600 flex items-center gap-1">
                  <Home size={18} />
                  Dashboard
                </Link>
                <Link href="/assignments" className="text-slate-700 dark:text-slate-300 hover:text-primary-600">
                  Assignments
                </Link>
                <Link href="/notes" className="text-slate-700 dark:text-slate-300 hover:text-primary-600">
                  Notes
                </Link>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {isAuthenticated && user ? (
              <div className="hidden md:flex items-center gap-4">
                <span className="text-sm text-slate-600 dark:text-slate-400">{user.fullName}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary text-sm"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Link href="/auth/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link href="/auth/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200 dark:border-slate-800">
            {isAuthenticated && user ? (
              <>
                <div className="py-4 border-b border-slate-200 dark:border-slate-800">
                  <p className="text-sm text-slate-600 dark:text-slate-400">{user.fullName}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <Link href="/dashboard" className="block py-2 text-slate-700 dark:text-slate-300">
                  Dashboard
                </Link>
                <Link href="/assignments" className="block py-2 text-slate-700 dark:text-slate-300">
                  Assignments
                </Link>
                <Link href="/notes" className="block py-2 text-slate-700 dark:text-slate-300">
                  Notes
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-600 dark:text-red-400 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-4">
                <Link href="/auth/login" className="btn btn-secondary w-full">
                  Login
                </Link>
                <Link href="/auth/signup" className="btn btn-primary w-full">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
