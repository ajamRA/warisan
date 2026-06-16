import type { Knex } from 'knex';
import { hashPassword } from '../../utils/password.js';

export async function seed(knex: Knex): Promise<void> {
  await knex('user_badges').del();
  await knex('skill_related').del();
  await knex('moderation_queue').del();
  await knex('skill_versions').del();
  await knex('skill_tags').del();
  await knex('tags').del();
  await knex('skill_images').del();
  await knex('skills').del();
  await knex('categories').del();
  await knex('users').del();

  const passwordHash = await hashPassword('password123');

  await knex('users').insert([
    {
      name: 'Admin User',
      email: 'admin@warisan.org',
      password_hash: passwordHash,
      role: 'admin',
      country: 'MY',
      language: 'ms',
    },
    {
      name: 'Siti Nurhaliza',
      email: 'siti@warisan.org',
      password_hash: passwordHash,
      role: 'contributor',
      country: 'MY',
      language: 'ms',
    },
    {
      name: 'Budi Santoso',
      email: 'budi@warisan.org',
      password_hash: passwordHash,
      role: 'contributor',
      country: 'ID',
      language: 'id',
    },
  ]);
}
