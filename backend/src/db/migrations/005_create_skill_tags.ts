import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE tags (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(50) NOT NULL UNIQUE,
      slug VARCHAR(50) NOT NULL UNIQUE
    );

    CREATE TABLE skill_tags (
      skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
      tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
      PRIMARY KEY (skill_id, tag_id)
    );

    CREATE INDEX idx_tags_name ON tags(name);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TABLE IF EXISTS skill_tags CASCADE');
  await knex.raw('DROP TABLE IF EXISTS tags CASCADE');
}
