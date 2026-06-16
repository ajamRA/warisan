import { db } from '../config/database.js';
import slugify from 'slugify';
import { randomUUID } from 'crypto';

interface ListFilters {
  page?: number;
  limit?: number;
  category?: string;
  country?: string;
  language?: string;
  difficulty?: string;
  search?: string;
  sort?: string;
  tag?: string;
}

export async function listSkills(filters: ListFilters) {
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const offset = (page - 1) * limit;

  let query = db('skills')
    .join('categories', 'skills.category_id', 'categories.id')
    .leftJoin('users', 'skills.created_by', 'users.id')
    .where('skills.status', 'published')
    .select(
      'skills.*',
      'categories.name as category_name',
      'categories.slug as category_slug',
      'categories.icon as category_icon',
      'categories.color as category_color',
      'users.name as author_name',
      'users.avatar_url as author_avatar'
    );

  if (filters.category) {
    query = query.where('categories.slug', filters.category);
  }
  if (filters.country) {
    query = query.where('skills.country', filters.country);
  }
  if (filters.language) {
    query = query.where('skills.language', filters.language);
  }
  if (filters.difficulty) {
    query = query.where('skills.difficulty', filters.difficulty);
  }
  if (filters.tag) {
    query = query
      .join('skill_tags', 'skills.id', 'skill_tags.skill_id')
      .join('tags', 'skill_tags.tag_id', 'tags.id')
      .where('tags.slug', filters.tag);
  }

  if (filters.search) {
    query = query.whereRaw(
      `search_vector @@ plainto_tsquery('english', ?)`,
      [filters.search]
    ).orderByRaw(
      `ts_rank(search_vector, plainto_tsquery('english', ?)) DESC`,
      [filters.search]
    );
  } else if (filters.sort === 'popular') {
    query = query.orderBy('view_count', 'desc');
  } else if (filters.sort === 'updated') {
    query = query.orderBy('updated_at', 'desc');
  } else {
    query = query.orderBy('created_at', 'desc');
  }

  const countQuery = query.clone().clearSelect().count('skills.id as total').first();
  const dataQuery = query.limit(limit).offset(offset);

  const [countResult, skills] = await Promise.all([countQuery, dataQuery]);

  return {
    skills,
    pagination: {
      page,
      limit,
      total: Number(countResult?.total) || 0,
      pages: Math.ceil((Number(countResult?.total) || 0) / limit),
    },
  };
}

export async function getSkillBySlug(slug: string) {
  const skill = await db('skills')
    .join('categories', 'skills.category_id', 'categories.id')
    .leftJoin('users', 'skills.created_by', 'users.id')
    .where('skills.slug', slug)
    .select(
      'skills.*',
      'categories.name as category_name',
      'categories.slug as category_slug',
      'categories.icon as category_icon',
      'categories.color as category_color',
      'users.name as author_name',
      'users.avatar_url as author_avatar'
    )
    .first();

  if (skill) {
    await db('skills').where({ id: skill.id }).increment('view_count', 1);

    const images = await db('skill_images').where({ skill_id: skill.id }).orderBy('sort_order');
    const tags = await db('skill_tags')
      .join('tags', 'skill_tags.tag_id', 'tags.id')
      .where('skill_tags.skill_id', skill.id)
      .select('tags.*');

    return { ...skill, images, tags };
  }

  return null;
}

export async function createSkill(data: any, userId: string) {
  const slug = slugify(data.title, { lower: true, strict: true });
  const existing = await db('skills').where({ slug }).first();
  const finalSlug = existing ? `${slug}-${randomUUID().slice(0, 8)}` : slug;

  const [skill] = await db('skills')
    .insert({
      ...data,
      slug: finalSlug,
      created_by: userId,
      status: 'pending',
    })
    .returning('*');

  await db('moderation_queue').insert({
    skill_id: skill.id,
    action: 'create',
    submitted_by: userId,
  });

  return skill;
}

export async function updateSkill(id: string, data: any, userId: string) {
  const existing = await db('skills').where({ id }).first();
  if (!existing) throw new Error('Skill not found');

  await db('skill_versions').insert({
    skill_id: id,
    version_number: await db('skill_versions').where({ skill_id: id }).count('id as c').then(r => Number(r[0]?.c) + 1),
    title: existing.title,
    content_markdown: existing.content_markdown,
    description: existing.description,
    edited_by: userId,
  });

  const [updated] = await db('skills')
    .where({ id })
    .update({ ...data, updated_at: new Date() })
    .returning('*');

  return updated;
}

export async function deleteSkill(id: string) {
  await db('skills').where({ id }).update({ status: 'archived' });
}

export async function getFeaturedSkills() {
  return db('skills')
    .join('categories', 'skills.category_id', 'categories.id')
    .where('skills.is_featured', true)
    .where('skills.status', 'published')
    .select('skills.*', 'categories.name as category_name', 'categories.slug as category_slug')
    .limit(6);
}

export async function getSkillOfTheDay() {
  const today = new Date().toISOString().split('T')[0];
  const skill = await db('skills')
    .join('categories', 'skills.category_id', 'categories.id')
    .where('skills.status', 'published')
    .whereRaw(`skills.created_at::date <= ?`, [today])
    .orderByRaw(`md5(skills.id || ?)`, [today])
    .select('skills.*', 'categories.name as category_name', 'categories.slug as category_slug')
    .first();
  return skill;
}

export async function getRelatedSkills(skillId: string) {
  return db('skill_related')
    .join('skills', 'skill_related.related_skill_id', 'skills.id')
    .where('skill_related.skill_id', skillId)
    .where('skills.status', 'published')
    .select('skills.*')
    .orderBy('skill_related.relevance_score', 'desc')
    .limit(4);
}

export async function getSkillVersions(skillId: string) {
  return db('skill_versions')
    .where({ skill_id: skillId })
    .join('users', 'skill_versions.edited_by', 'users.id')
    .select('skill_versions.*', 'users.name as editor_name')
    .orderBy('version_number', 'desc');
}

export async function bookmarkSkill(skillId: string, userId: string) {
  const existing = await db('bookmarks').where({ skill_id: skillId, user_id: userId }).first();
  if (existing) {
    await db('bookmarks').where({ skill_id: skillId, user_id: userId }).del();
    await db('skills').where({ id: skillId }).decrement('bookmark_count', 1);
    return false;
  } else {
    await db('bookmarks').insert({ skill_id: skillId, user_id: userId });
    await db('skills').where({ id: skillId }).increment('bookmark_count', 1);
    return true;
  }
}
