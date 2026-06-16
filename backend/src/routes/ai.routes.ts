import { Router } from 'express';
import { z } from 'zod';
import * as aiService from '../services/ai.service.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

const summarizeSchema = z.object({
  content: z.string().min(50),
});

const translateSchema = z.object({
  content: z.string().min(10),
  targetLang: z.string().min(2).max(5),
});

const extractMetadataSchema = z.object({
  content: z.string().min(50),
});

const generateStepsSchema = z.object({
  description: z.string().min(20),
});

router.post('/summarize', async (req, res) => {
  try {
    const { content } = summarizeSchema.parse(req.body);
    const summary = await aiService.summarize(content);
    res.json({ summary });
  } catch (error: any) {
    if (error.message?.includes('OPENAI_API_KEY')) {
      res.status(503).json({ error: 'AI features not configured' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

router.post('/translate', async (req, res) => {
  try {
    const { content, targetLang } = translateSchema.parse(req.body);
    const translated = await aiService.translate(content, targetLang);
    res.json({ translated });
  } catch (error: any) {
    if (error.message?.includes('OPENAI_API_KEY')) {
      res.status(503).json({ error: 'AI features not configured' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

router.post('/extract-metadata', async (req, res) => {
  try {
    const { content } = extractMetadataSchema.parse(req.body);
    const metadata = await aiService.extractMetadata(content);
    res.json(metadata);
  } catch (error: any) {
    if (error.message?.includes('OPENAI_API_KEY')) {
      res.status(503).json({ error: 'AI features not configured' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

router.post('/generate-steps', async (req, res) => {
  try {
    const { description } = generateStepsSchema.parse(req.body);
    const steps = await aiService.generateSteps(description);
    res.json({ steps });
  } catch (error: any) {
    if (error.message?.includes('OPENAI_API_KEY')) {
      res.status(503).json({ error: 'AI features not configured' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

export default router;
