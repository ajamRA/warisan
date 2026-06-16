export interface UserRow {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  bio: string | null;
  avatar_url: string | null;
  role: string;
  country: string | null;
  language: string | null;
  skills_count: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  parent_id: string | null;
  sort_order: number;
  created_at: Date;
}

export interface SkillRow {
  id: string;
  title: string;
  slug: string;
  description: string;
  category_id: string;
  country: string | null;
  language: string;
  difficulty: string;
  learning_time: string | null;
  content_markdown: string;
  video_url: string | null;
  created_by: string;
  status: string;
  view_count: number;
  bookmark_count: number;
  is_featured: boolean;
  is_skill_of_day: boolean;
  metadata: Record<string, any>;
  search_vector: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface SkillImageRow {
  id: string;
  skill_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  created_at: Date;
}

export interface TagRow {
  id: string;
  name: string;
  slug: string;
}

export interface SkillTagRow {
  skill_id: string;
  tag_id: string;
}

export interface SkillVersionRow {
  id: string;
  skill_id: string;
  version_number: number;
  title: string;
  content_markdown: string;
  description: string | null;
  edited_by: string;
  change_summary: string | null;
  created_at: Date;
}

export interface ModerationQueueRow {
  id: string;
  skill_id: string;
  action: string;
  submitted_by: string;
  reviewed_by: string | null;
  status: string;
  notes: string | null;
  submitted_at: Date;
  reviewed_at: Date | null;
}

export interface SkillRelatedRow {
  skill_id: string;
  related_skill_id: string;
  relevance_score: number;
}

export interface BadgeRow {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  criteria: Record<string, any>;
}

export interface UserBadgeRow {
  user_id: string;
  badge_id: string;
  awarded_at: Date;
}
