import { Router } from 'express';
import * as searchService from '../services/search.service.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const query = req.query.q as string;
    if (!query) {
      res.status(400).json({ error: 'Search query required' });
      return;
    }

    const filters = {
      category: req.query.category as string,
      country: req.query.country as string,
      language: req.query.language as string,
    };

    const results = await searchService.fullTextSearch(query, filters);
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/autocomplete', async (req, res) => {
  try {
    const partial = req.query.q as string;
    if (!partial || partial.length < 2) {
      res.json([]);
      return;
    }

    const results = await searchService.autocomplete(partial);
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const query = req.query.q as string;
    const facets = await searchService.getFacets(query);
    res.json(facets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
