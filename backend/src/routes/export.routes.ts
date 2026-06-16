import { Router } from 'express';
import * as exportService from '../services/export.service.js';

const router = Router();

router.get('/skill/:id/pdf', async (req, res) => {
  try {
    const pdf = await exportService.generatePDF(req.params.id);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="skill-${req.params.id}.pdf"`);
    res.send(pdf);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/skill/:id/html', async (req, res) => {
  try {
    const html = await exportService.generateOfflineHTML(req.params.id);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', `attachment; filename="skill-${req.params.id}.html"`);
    res.send(html);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/skill/:id/json', async (req, res) => {
  try {
    const data = await exportService.generateJSON(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="skill-${req.params.id}.json"`);
    res.json(data);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/all/json', async (_req, res) => {
  try {
    const data = await exportService.bulkJSONExport();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="warisan-skills.json"');
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
