import { Router } from 'express';
import { db } from '../config/database.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const categories = await db('categories')
      .select('*')
      .orderBy('sort_order', 'asc');
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:slug/skills', async (req, res) => {
  try {
    const category = await db('categories').where({ slug: req.params.slug }).first();
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    const skills = await db('skills')
      .where({ category_id: category.id, status: 'published' })
      .select('skills.*')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);

    const countResult = await db('skills')
      .where({ category_id: category.id, status: 'published' })
      .count('id as total')
      .first();

    res.json({
      category,
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
