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
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  parent_id?: string;
  sort_order: number;
  created_at: Date;
}

export interface Skill {
  id: string;
  title: string;
  slug: string;
  description: string;
  category_id: string;
  country?: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
  learning_time?: string;
  content_markdown: string;
  video_url?: string;
  created_by: string;
  status: 'draft' | 'pending' | 'published' | 'rejected' | 'archived';
  view_count: number;
  bookmark_count: number;
  is_featured: boolean;
  is_skill_of_day: boolean;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface SkillImage {
  id: string;
  skill_id: string;
  url: string;
  alt_text?: string;
  sort_order: number;
  created_at: Date;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface SkillTag {
  skill_id: string;
  tag_id: string;
}

export interface SkillVersion {
  id: string;
  skill_id: string;
  version_number: number;
  title: string;
  content_markdown: string;
  description?: string;
  edited_by: string;
  change_summary?: string;
  created_at: Date;
}

export interface ModerationQueue {
  id: string;
  skill_id: string;
  action: 'create' | 'edit' | 'delete';
  submitted_by: string;
  reviewed_by?: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  submitted_at: Date;
  reviewed_at?: Date;
}

export interface SkillRelated {
  skill_id: string;
  related_skill_id: string;
  relevance_score: number;
}

export interface Badge {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  criteria: Record<string, any>;
}

export interface UserBadge {
  user_id: string;
  badge_id: string;
  awarded_at: Date;
}