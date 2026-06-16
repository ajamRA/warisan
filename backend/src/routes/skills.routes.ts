import { Router } from 'express';
import { z } from 'zod';
import * as skillsService from '../services/skills.service.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

const createSkillSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10),
  category_id: z.string().uuid(),
  country: z.string().length(2).optional(),
  language: z.string().min(2).max(5).default('en'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'master']).default('beginner'),
  learning_time: z.string().optional(),
  content_markdown: z.string().min(10),
  video_url: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
});

router.get('/', async (req, res) => {
  try {
    const filters = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 12,
      category: req.query.category as string,
      country: req.query.country as string,
      language: req.query.language as string,
      difficulty: req.query.difficulty as string,
      search: req.query.search as string,
      sort: req.query.sort as string,
      tag: req.query.tag as string,
    };
    const result = await skillsService.listSkills(filters);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/featured', async (_req, res) => {
  try {
    const skills = await skillsService.getFeaturedSkills();
    res.json(skills);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/skill-of-day', async (_req, res) => {
  try {
    const skill = await skillsService.getSkillOfTheDay();
    res.json(skill || null);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const skill = await skillsService.getSkillBySlug(req.params.slug);
    if (!skill) {
      res.status(404).json({ error: 'Skill not found' });
      return;
    }
    res.json(skill);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/versions', async (req, res) => {
  try {
    const versions = await skillsService.getSkillVersions(req.params.id);
    res.json(versions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/related', async (req, res) => {
  try {
    const related = await skillsService.getRelatedSkills(req.params.id);
    res.json(related);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', requireAuth, requireRole('admin', 'moderator', 'contributor'), async (req, res) => {
  try {
    const data = createSkillSchema.parse(req.body);
    const skill = await skillsService.createSkill(data, req.user!.userId);
    res.status(201).json(skill);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/images', requireAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No image provided' });
      return;
    }
    const { addSkillImage } = await import('../services/upload.service.js');
    const id = req.params.id as string;
    const image = await addSkillImage(id, `/uploads/${req.file.filename}`, req.body.alt_text);
    res.status(201).json(image);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/bookmark', requireAuth, async (req, res) => {
  try {
    const id = req.params.id as string;
    const bookmarked = await skillsService.bookmarkSkill(id, req.user!.userId);
    res.json({ bookmarked });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const id = req.params.id as string;
    const skill = await skillsService.updateSkill(id, req.body, req.user!.userId);
    res.json(skill);
  } catch (error: any) {
    if (error.message === 'Skill not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const id = req.params.id as string;
    await skillsService.deleteSkill(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
