import { Router } from 'express';
import { db } from '../config/database.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await db('users')
      .where({ id: req.params.id })
      .select('id', 'name', 'bio', 'avatar_url', 'role', 'country', 'language', 'skills_count', 'created_at')
      .first();

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const skills = await db('skills')
      .where({ created_by: req.params.id, status: 'published' })
      .select('id', 'title', 'slug', 'category_id', 'difficulty', 'created_at')
      .orderBy('created_at', 'desc')
      .limit(10);

    const badges = await db('user_badges')
      .join('badges', 'user_badges.badge_id', 'badges.id')
      .where('user_badges.user_id', req.params.id)
      .select('badges.*', 'user_badges.awarded_at');

    res.json({ ...user, skills, badges });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    if (req.user!.userId !== req.params.id && req.user!.role !== 'admin') {
      res.status(403).json({ error: 'Cannot update other users' });
      return;
    }

    const allowedFields = ['name', 'bio', 'avatar_url', 'country', 'language'];
    const updates: Record<string, any> = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const [user] = await db('users')
      .where({ id: req.params.id })
      .update({ ...updates, updated_at: new Date() })
      .returning(['id', 'name', 'bio', 'avatar_url', 'role', 'country', 'language']);

    res.json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id/skills', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    const skills = await db('skills')
      .join('categories', 'skills.category_id', 'categories.id')
      .where('skills.created_by', req.params.id)
      .where('skills.status', 'published')
      .select('skills.*', 'categories.name as category_name', 'categories.slug as category_slug')
      .orderBy('skills.created_at', 'desc')
      .limit(limit)
      .offset(offset);

    const countResult = await db('skills')
      .where({ created_by: req.params.id, status: 'published' })
      .count('id as total')
      .first();

    res.json({
      skills,
      pagination: {
        page,
        limit,
        total: Number(countResult?.total) || 0,
        pages: Math.ceil((Number(countResult?.total) || 0) / limit),
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
