import { db } from '../config/database.js';
import sharp from 'sharp';
import path from 'path';

export async function processUpload(file: Express.Multer.File) {
  const processedFilename = `processed_${file.filename}`;
  const processedPath = path.join('uploads', processedFilename);

  await sharp(file.path)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toFile(processedPath);

  return {
    url: `/uploads/${processedFilename}`,
    originalName: file.originalname,
    size: file.size,
    mimetype: file.mimetype,
  };
}

export async function addSkillImage(skillId: string, url: string, altText?: string) {
  const maxOrder = await db('skill_images')
    .where({ skill_id: skillId })
    .max('sort_order as max')
    .first();

  const [image] = await db('skill_images')
    .insert({
      skill_id: skillId,
      url,
      alt_text: altText || null,
      sort_order: (Number(maxOrder?.max) || 0) + 1,
    })
    .returning('*');

  return image;
}

export async function deleteSkillImage(imageId: string) {
  await db('skill_images').where({ id: imageId }).del();
}
