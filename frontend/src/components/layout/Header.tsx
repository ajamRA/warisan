import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon, Menu, X, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <BookOpen className="h-6 w-6 text-primary" />
          {t('app.name')}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.home')}</Link>
          <Link to="/search" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.search')}</Link>
          <Link to="/map" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.map')}</Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.about')}</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-accent rounded-md transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/submit" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.submit')}</Link>
              <Link to="/profile" className="text-sm font-medium hover:text-primary transition-colors">{user.name}</Link>
              <button onClick={logout} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">{t('nav.logout')}</button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.login')}</Link>
              <Link to="/register" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">{t('nav.register')}</Link>
            </div>
          )}

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 hover:bg-accent rounded-md">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t p-4 space-y-4">
          <Link to="/" className="block py-2" onClick={() => setMobileOpen(false)}>{t('nav.home')}</Link>
          <Link to="/search" className="block py-2" onClick={() => setMobileOpen(false)}>{t('nav.search')}</Link>
          <Link to="/map" className="block py-2" onClick={() => setMobileOpen(false)}>{t('nav.map')}</Link>
          <Link to="/about" className="block py-2" onClick={() => setMobileOpen(false)}>{t('nav.about')}</Link>
          {user ? (
            <>
              <Link to="/submit" className="block py-2" onClick={() => setMobileOpen(false)}>{t('nav.submit')}</Link>
              <Link to="/profile" className="block py-2" onClick={() => setMobileOpen(false)}>{user.name}</Link>
              <button onClick={() => { logout(); setMobileOpen(false); }} className="block py-2 text-muted-foreground">{t('nav.logout')}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2" onClick={() => setMobileOpen(false)}>{t('nav.login')}</Link>
              <Link to="/register" className="block py-2" onClick={() => setMobileOpen(false)}>{t('nav.register')}</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}