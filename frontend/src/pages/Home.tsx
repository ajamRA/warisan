import { useTranslation } from 'react-i18next';
import { useFeaturedSkills, useSkillOfTheDay, useCategories } from '../hooks/useSkills';
import SkillGrid from '../components/skill/SkillGrid';
import SkillOfTheDay from '../components/skill/SkillOfTheDay';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();
  const { data: featured, isLoading: featuredLoading } = useFeaturedSkills();
  const { data: categories } = useCategories();

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('app.tagline')}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('footer.mission')}
        </p>
      </section>

      <SkillOfTheDay />

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t('home.categories')}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories?.map((cat: any) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="border rounded-lg p-4 hover:shadow-md transition-all bg-card text-center"
            >
              <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: cat.color + '20' }}>
                <span className="text-2xl">{cat.icon}</span>
              </div>
              <h3 className="font-medium text-sm">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t('home.featured')}</h2>
          <Link to="/search" className="flex items-center gap-1 text-primary hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {featuredLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4 animate-pulse">
                <div className="h-6 w-3/4 bg-muted rounded mb-2" />
                <div className="h-4 w-full bg-muted rounded mb-2" />
                <div className="h-4 w-2/3 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : (
          <SkillGrid skills={featured || []} />
        )}
      </section>
    </div>
  );
}