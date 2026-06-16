import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSkills } from '../hooks/useSkills';
import SearchBar from '../components/search/SearchBar';
import FilterPanel from '../components/search/FilterPanel';
import SkillGrid from '../components/skill/SkillGrid';

export default function Search() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSkills({
    search: query,
    ...filters,
    page,
    limit: 12,
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('nav.search')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block">
          <FilterPanel facets={data?.facets} filters={filters} onFilterChange={handleFilterChange} />
        </aside>

        <div className="lg:col-span-3 space-y-6">
          <SearchBar value={query} onChange={(q) => { setQuery(q); setPage(1); }} placeholder={t('search.placeholder')} />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border rounded-lg p-4 animate-pulse">
                  <div className="h-6 w-3/4 bg-muted rounded mb-2" />
                  <div className="h-4 w-full bg-muted rounded mb-2" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : data?.skills?.length ? (
            <>
              <p className="text-sm text-muted-foreground">{data.pagination.total} skills found</p>
              <SkillGrid skills={data.skills} />
              {data.pagination.pages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: data.pagination.pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-3 py-1 rounded-md ${p === page ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-center py-12 text-muted-foreground">{t('search.noResults')}</p>
          )}
        </div>
      </div>
    </div>
  );
}