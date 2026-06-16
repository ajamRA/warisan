export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  role: 'admin' | 'moderator' | 'contributor' | 'viewer';
  country?: string;
  language?: string;
  skills_count: number;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface Skill {
  id: string;
  title: string;
  slug: string;
  description: string;
  category_id: string;
  category_name?: string;
  category_slug?: string;
  country?: string;
  language: string;
  difficulty: string;
  learning_time?: string;
  content_markdown: string;
  video_url?: string;
  created_by: string;
  author_name?: string;
  author_avatar?: string;
  status: string;
  view_count: number;
  bookmark_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  images?: SkillImage[];
  tags?: Tag[];
}

export interface SkillImage {
  id: string;
  url: string;
  alt_text?: string;
  sort_order: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface SkillVersion {
  id: string;
  version_number: number;
  title: string;
  content_markdown: string;
  editor_name: string;
  created_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface SearchFacets {
  categories: Array<{ name: string; slug: string; count: number }>;
  countries: Array<{ country: string; count: number }>;
  languages: Array<{ language: string; count: number }>;
  difficulties: Array<{ difficulty: string; count: number }>;
}