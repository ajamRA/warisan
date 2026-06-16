import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const results = useQuery({
    queryKey: ['search', query, filters],
    queryFn: () => api.get('/search', { params: { q: query, ...filters } }).then((r) => r.data),
    enabled: query.length >= 2,
  });

  const facets = useQuery({
    queryKey: ['search', 'facets', query],
    queryFn: () => api.get('/search/stats', { params: { q: query } }).then((r) => r.data),
  });

  return { query, setQuery, filters, setFilters, results, facets };
}