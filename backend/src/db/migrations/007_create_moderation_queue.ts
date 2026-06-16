import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE moderation_queue (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
      action VARCHAR(20) NOT NULL,
      submitted_by UUID NOT NULL REFERENCES users(id),
      reviewed_by UUID REFERENCES users(id),
      status VARCHAR(20) DEFAULT 'pending',
      notes TEXT,
      submitted_at TIMESTAMPTZ DEFAULT NOW(),
      reviewed_at TIMESTAMPTZ
    );

    CREATE INDEX idx_moderation_status ON moderation_queue(status);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TABLE IF EXISTS moderation_queue CASCADE');
}
