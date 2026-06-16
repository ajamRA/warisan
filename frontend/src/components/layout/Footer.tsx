import { useTranslation } from 'react-i18next';
import { BookOpen, Github, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <BookOpen className="h-6 w-6 text-primary" />
              {t('app.name')}
            </Link>
            <p className="text-sm text-muted-foreground">{t('footer.mission')}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navigate</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/search" className="hover:text-primary transition-colors">{t('nav.search')}</Link></li>
              <li><Link to="/map" className="hover:text-primary transition-colors">{t('nav.map')}</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">{t('nav.about')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contribute</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/submit" className="hover:text-primary transition-colors">{t('nav.submit')}</Link></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">{t('nav.register')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Open Source</h3>
            <p className="text-sm text-muted-foreground mb-4">MIT License</p>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500" /> for cultural preservation
          </p>
        </div>
      </div>
    </footer>
  );
}