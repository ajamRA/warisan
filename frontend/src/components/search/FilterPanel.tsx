import { SearchFacets } from '../../types';
import { COUNTRIES, LANGUAGES, DIFFICULTY_LEVELS } from '../../lib/constants';

interface FilterPanelProps {
  facets: SearchFacets | undefined;
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
}

export default function FilterPanel({ facets, filters, onFilterChange }: FilterPanelProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {facets?.categories?.map((cat) => (
            <label key={cat.slug} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat.slug}
                onChange={() => onFilterChange('category', filters.category === cat.slug ? '' : cat.slug)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{cat.name}</span>
              <span className="text-xs text-muted-foreground ml-auto">({cat.count})</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Country</h3>
        <div className="space-y-2">
          {COUNTRIES.map((country) => (
            <label key={country.code} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="country"
                checked={filters.country === country.code}
                onChange={() => onFilterChange('country', filters.country === country.code ? '' : country.code)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{country.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Language</h3>
        <div className="space-y-2">
          {LANGUAGES.map((lang) => (
            <label key={lang.code} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="language"
                checked={filters.language === lang.code}
                onChange={() => onFilterChange('language', filters.language === lang.code ? '' : lang.code)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{lang.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Difficulty</h3>
        <div className="space-y-2">
          {DIFFICULTY_LEVELS.map((diff) => (
            <label key={diff.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="difficulty"
                checked={filters.difficulty === diff.value}
                onChange={() => onFilterChange('difficulty', filters.difficulty === diff.value ? '' : diff.value)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{diff.label}</span>
            </label>
          ))}
        </div>
      </div>

      {Object.values(filters).some(Boolean) && (
        <button
          onClick={() => {
            onFilterChange('category', '');
            onFilterChange('country', '');
            onFilterChange('language', '');
            onFilterChange('difficulty', '');
          }}
          className="w-full py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}