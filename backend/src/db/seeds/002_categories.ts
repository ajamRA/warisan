import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const categories = [
    { name: 'Textile & Weaving', slug: 'textile-weaving', icon: 'scissors', color: '#8B5CF6' },
    { name: 'Pottery & Ceramics', slug: 'pottery-ceramics', icon: 'flask-round', color: '#F97316' },
    { name: 'Woodworking', slug: 'woodworking', icon: 'hammer', color: '#84CC16' },
    { name: 'Metalworking', slug: 'metalworking', icon: 'anvil', color: '#64748B' },
    { name: 'Cooking & Preservation', slug: 'cooking-preservation', icon: 'chef-hat', color: '#EF4444' },
    { name: 'Agriculture', slug: 'agriculture', icon: 'sprout', color: '#22C55E' },
    { name: 'Music & Instruments', slug: 'music-instruments', icon: 'music', color: '#EC4899' },
    { name: 'Dance & Performance', slug: 'dance-performance', icon: 'music', color: '#A855F7' },
    { name: 'Martial Arts & Games', slug: 'martial-arts-games', icon: 'swords', color: '#DC2626' },
    { name: 'Language & Oral Tradition', slug: 'language-oral-tradition', icon: 'book-open', color: '#2563EB' },
    { name: 'Architecture & Building', slug: 'architecture-building', icon: 'home', color: '#78716C' },
    { name: 'Nature & Environment', slug: 'nature-environment', icon: 'leaf', color: '#16A34A' },
    { name: 'Spiritual & Ritual', slug: 'spiritual-ritual', icon: 'moon', color: '#7C3AED' },
    { name: 'Medicine & Healing', slug: 'medicine-healing', icon: 'heart-pulse', color: '#E11D48' },
    { name: 'Craft & Art', slug: 'craft-art', icon: 'palette', color: '#F59E0B' },
  ];

  await knex('categories').insert(categories.map((c, i) => ({ ...c, sort_order: i })));
}
