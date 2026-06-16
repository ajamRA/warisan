import { db } from '../config/database.js';
import { generateSkillPDF } from '../utils/pdf.js';
import { Skill } from '../../../shared/types.js';

export async function getSkillForExport(id: string) {
  return db('skills')
    .join('categories', 'skills.category_id', 'categories.id')
    .leftJoin('users', 'skills.created_by', 'users.id')
    .where('skills.id', id)
    .select(
      'skills.*',
      'categories.name as category_name',
      'users.name as author_name'
    )
    .first();
}

export async function generatePDF(id: string): Promise<Buffer> {
  const skill = await getSkillForExport(id);
  if (!skill) throw new Error('Skill not found');
  return generateSkillPDF(skill as Skill);
}

export async function generateOfflineHTML(id: string): Promise<string> {
  const skill = await getSkillForExport(id);
  if (!skill) throw new Error('Skill not found');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${skill.title} — Warisan</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; }
    h1 { color: #1a1a1a; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; }
    .meta { color: #6b7280; margin-bottom: 2rem; }
    .meta span { margin-right: 1rem; }
    .content { white-space: pre-wrap; }
    .badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; }
  </style>
</head>
<body>
  <h1>${skill.title}</h1>
  <div class="meta">
    <span>Category: ${skill.category_name}</span>
    <span>Difficulty: ${skill.difficulty}</span>
    <span>Learning Time: ${skill.learning_time || 'N/A'}</span>
    <span>Country: ${skill.country || 'N/A'}</span>
    <span>Author: ${skill.author_name}</span>
  </div>
  <p>${skill.description}</p>
  <div class="content">${skill.content_markdown}</div>
</body>
</html>`;
}

export async function generateJSON(id: string) {
  const skill = await getSkillForExport(id);
  if (!skill) throw new Error('Skill not found');
  return skill;
}

export async function bulkJSONExport() {
  return db('skills')
    .join('categories', 'skills.category_id', 'categories.id')
    .leftJoin('users', 'skills.created_by', 'users.id')
    .where('skills.status', 'published')
    .select(
      'skills.*',
      'categories.name as category_name',
      'users.name as author_name'
    )
    .orderBy('skills.created_at', 'desc');
}
