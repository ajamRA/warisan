import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE skill_related (
      skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
      related_skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
      relevance_score FLOAT DEFAULT 1.0,
      PRIMARY KEY (skill_id, related_skill_id)
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TABLE IF EXISTS skill_related CASCADE');
}
