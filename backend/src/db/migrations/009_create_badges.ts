import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE badges (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(100) NOT NULL UNIQUE,
      description TEXT,
      icon VARCHAR(50),
      criteria JSONB NOT NULL
    );

    CREATE TABLE user_badges (
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
      awarded_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (user_id, badge_id)
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TABLE IF EXISTS user_badges CASCADE');
  await knex.raw('DROP TABLE IF EXISTS badges CASCADE');
}
