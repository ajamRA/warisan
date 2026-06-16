import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE skills ADD COLUMN search_vector tsvector;

    CREATE OR REPLACE FUNCTION skills_search_vector_update() RETURNS trigger AS $$
    BEGIN
      NEW.search_vector :=
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.content_markdown, '')), 'C');
      RETURN NEW;
    END
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER skills_search_vector_trigger
      BEFORE INSERT OR UPDATE ON skills
      FOR EACH ROW EXECUTE FUNCTION skills_search_vector_update();

    CREATE INDEX idx_skills_search ON skills USING GIN(search_vector);

    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    CREATE INDEX idx_skills_title_trgm ON skills USING GIN(title gin_trgm_ops);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TRIGGER IF EXISTS skills_search_vector_trigger ON skills');
  await knex.raw('DROP FUNCTION IF EXISTS skills_search_vector_update');
  await knex.raw('ALTER TABLE skills DROP COLUMN IF EXISTS search_vector');
  await knex.raw('DROP INDEX IF EXISTS idx_skills_search');
  await knex.raw('DROP INDEX IF EXISTS idx_skills_title_trgm');
  await knex.raw('DROP EXTENSION IF EXISTS pg_trgm');
}
