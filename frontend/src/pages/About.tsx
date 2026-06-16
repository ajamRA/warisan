import { useTranslation } from 'react-i18next';
import { BookOpen, Users, Globe, Shield } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">About {t('app.name')}</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-muted-foreground mb-8">
          {t('footer.mission')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="border rounded-lg p-6 bg-card">
            <BookOpen className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Preserve Knowledge</h3>
            <p className="text-muted-foreground">
              Document traditional skills before they disappear. Create a lasting archive for future generations.
            </p>
          </div>

          <div className="border rounded-lg p-6 bg-card">
            <Users className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
            <p className="text-muted-foreground">
              Built by practitioners, for practitioners. Share your expertise with the world.
            </p>
          </div>

          <div className="border rounded-lg p-6 bg-card">
            <Globe className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Global Access</h3>
            <p className="text-muted-foreground">
              Multi-language support makes knowledge accessible across cultures and borders.
            </p>
          </div>

          <div className="border rounded-lg p-6 bg-card">
            <Shield className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Open Source</h3>
            <p className="text-muted-foreground">
              MIT licensed. Free to use, modify, and contribute. Built with transparency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}