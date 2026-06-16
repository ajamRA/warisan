import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export function useSkills(filters: Record<string, any> = {}) {
  return useQuery({
    queryKey: ['skills', filters],
    queryFn: () => api.get('/skills', { params: filters }).then((r) => r.data),
  });
}

export function useSkill(slug: string) {
  return useQuery({
    queryKey: ['skill', slug],
    queryFn: () => api.get(`/skills/${slug}`).then((r) => r.data),
    enabled: !!slug,
  });
}

export function useFeaturedSkills() {
  return useQuery({
    queryKey: ['skills', 'featured'],
    queryFn: () => api.get('/skills/featured').then((r) => r.data),
  });
}

export function useSkillOfTheDay() {
  return useQuery({
    queryKey: ['skills', 'skill-of-day'],
    queryFn: () => api.get('/skills/skill-of-day').then((r) => r.data),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories').then((r) => r.data),
  });
}