import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE skill_versions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
      version_number INT NOT NULL,
      title VARCHAR(200) NOT NULL,
      content_markdown TEXT NOT NULL,
      description TEXT,
      edited_by UUID NOT NULL REFERENCES users(id),
      change_summary VARCHAR(500),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(skill_id, version_number)
    );

    CREATE INDEX idx_skill_versions_skill ON skill_versions(skill_id);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TABLE IF EXISTS skill_versions CASCADE');
}
