import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE skills (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title VARCHAR(200) NOT NULL,
      slug VARCHAR(250) NOT NULL UNIQUE,
      description TEXT NOT NULL,
      category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
      country VARCHAR(3),
      language VARCHAR(5) NOT NULL DEFAULT 'en',
      difficulty VARCHAR(20) NOT NULL DEFAULT 'beginner',
      learning_time VARCHAR(50),
      content_markdown TEXT NOT NULL,
      video_url VARCHAR(500),
      created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      status VARCHAR(20) DEFAULT 'pending',
      view_count INT DEFAULT 0,
      bookmark_count INT DEFAULT 0,
      is_featured BOOLEAN DEFAULT false,
      is_skill_of_day BOOLEAN DEFAULT false,
      metadata JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX idx_skills_category ON skills(category_id);
    CREATE INDEX idx_skills_country ON skills(country);
    CREATE INDEX idx_skills_language ON skills(language);
    CREATE INDEX idx_skills_status ON skills(status);
    CREATE INDEX idx_skills_created_by ON skills(created_by);
    CREATE INDEX idx_skills_created_at ON skills(created_at DESC);
    CREATE INDEX idx_skills_slug ON skills(slug);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TABLE IF EXISTS skills CASCADE');
}
