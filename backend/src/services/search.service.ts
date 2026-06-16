import { db } from '../config/database.js';

export async function fullTextSearch(query: string, filters: any = {}) {
  let skillsQuery = db('skills')
    .join('categories', 'skills.category_id', 'categories.id')
    .leftJoin('users', 'skills.created_by', 'users.id')
    .where('skills.status', 'published')
    .select(
      'skills.*',
      'categories.name as category_name',
      'categories.slug as category_slug',
      'users.name as author_name'
    )
    .whereRaw(
      `search_vector @@ plainto_tsquery('english', ?)`,
      [query]
    )
    .orderByRaw(
      `ts_rank(search_vector, plainto_tsquery('english', ?)) DESC`,
      [query]
    );

  if (filters.category) {
    skillsQuery = skillsQuery.where('categories.slug', filters.category);
  }
  if (filters.country) {
    skillsQuery = skillsQuery.where('skills.country', filters.country);
  }
  if (filters.language) {
    skillsQuery = skillsQuery.where('skills.language', filters.language);
  }

  return skillsQuery.limit(50);
}

export async function autocomplete(partial: string) {
  return db('skills')
    .where('status', 'published')
    .whereRaw(`title % ?`, [partial])
    .select('title', 'slug')
    .orderByRaw(`similarity(title, ?) DESC`, [partial])
    .limit(10);
}

export async function getFacets(query?: string) {
  let baseQuery = db('skills')
    .join('categories', 'skills.category_id', 'categories.id')
    .where('skills.status', 'published');

  if (query) {
    baseQuery = baseQuery.whereRaw(
      `search_vector @@ plainto_tsquery('english', ?)`,
      [query]
    );
  }

  const [categories, countries, languages, difficulties] = await Promise.all([
    baseQuery.clone()
      .select('categories.name', 'categories.slug')
      .count('skills.id as count')
      .groupBy('categories.name', 'categories.slug')
      .orderBy('count', 'desc'),
    baseQuery.clone()
      .select('skills.country')
      .count('skills.id as count')
      .whereNotNull('skills.country')
      .groupBy('skills.country')
      .orderBy('count', 'desc'),
    baseQuery.clone()
      .select('skills.language')
      .count('skills.id as count')
      .groupBy('skills.language')
      .orderBy('count', 'desc'),
    baseQuery.clone()
      .select('skills.difficulty')
      .count('skills.id as count')
      .groupBy('skills.difficulty')
      .orderBy('count', 'desc'),
  ]);

  return { categories, countries, languages, difficulties };
}
