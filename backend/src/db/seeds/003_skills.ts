import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const users = await knex('users').select('id', 'role').where('role', '!=', 'admin');
  const categories = await knex('categories').select('id', 'slug');

  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]));
  const skills = [
    {
      title: 'Batik Tulis — Traditional Hand-Drawn Wax-Resist Dyeing',
      slug: 'batik-tulis-hand-drawn-wax-resist',
      description: 'The art of creating intricate patterns on fabric using hot wax and natural dyes, practiced for centuries in Java, Indonesia.',
      category_id: catMap['textile-weaving'],
      country: 'ID',
      language: 'id',
      difficulty: 'advanced',
      learning_time: '6 months to mastery',
      content_markdown: '## Overview\n\nBatik Tulis is the oldest and most respected form of batik, originating from Java, Indonesia. Unlike stamped batik (batik cap), hand-drawn batik (batik tulis) uses a canting tool to apply hot wax directly onto fabric.\n\n## Materials\n- Cotton fabric (primissima)\n- Canting (wax pen)\n- Malam (batik wax)\n- Natural indigo dye\n- Tjap stamps (optional for borders)\n\n## Steps\n1. **Prepare the fabric** — Wash and bleach the cotton to remove impurities\n2. **Draw the pattern (pola)** — Using a pencil, sketch the design on the fabric\n3. **Apply wax (mewarna)** — Heat the malam and use canting to trace the pattern\n4. **Dye the fabric (ngebor)** — Submerge in indigo dye bath\n5. **Remove wax (nglorod)** — Boil the fabric to remove wax\n6. **Repeat** — For multi-colored designs, repeat waxing and dyeing',
      tags: ['textile', 'wax-resist', 'indonesian', 'heritage-craft'],
      created_by: users[1]?.id,
      status: 'published',
      is_featured: true,
    },
    {
      title: 'Silat — Traditional Malay Martial Art',
      slug: 'silat-traditional-malay-martial-art',
      description: 'Pencak Silat is a martial art originating from the Malay Archipelago, combining self-defense, spirituality, and artistic expression.',
      category_id: catMap['martial-arts-games'],
      country: 'MY',
      language: 'ms',
      difficulty: 'intermediate',
      learning_time: '1-2 years',
      content_markdown: '## Overview\n\nSilat is a martial art practiced throughout the Malay Archipelago. It combines physical combat techniques with spiritual elements and artistic expression.\n\n## Fundamental Stances\n1. **Kuda-kuda** — The horse stance forms the foundation\n2. **Pasang** — Fighting posture preparation\n3. **Langkah** — Footwork patterns\n\n## Key Techniques\n- Punches (pukulan)\n- Kicks (tendangan)\n- Grabs and locks (tangkap)\n- Throws (bantingan)\n\n## Training Methods\n- Solo forms (jurus)\n- Partner drills (buah)\n- Weapons training (tokou)',
      tags: ['martial-arts', 'self-defense', 'malay', 'ungku'],
      created_by: users[0]?.id,
      status: 'published',
      is_featured: true,
    },
    {
      title: 'Wau Bulan — Malaysian Moon Kite Making',
      slug: 'wau-bulan-moon-kite-making',
      description: 'Crafting the iconic Wau Bulan (moon kite), a symbol of Malaysian heritage featuring intricate floral patterns.',
      category_id: catMap['craft-art'],
      country: 'MY',
      language: 'ms',
      difficulty: 'intermediate',
      learning_time: '2-3 weeks',
      content_markdown: '## Overview\n\nWau Bulan is a traditional Malaysian kite shaped like a crescent moon. It is decorated with intricate floral and geometric patterns.\n\n## Materials\n- Bamboo (for frame)\n- Paper or fabric (for covering)\n- String\n- Paint or markers\n\n## Steps\n1. **Create the frame** — Split bamboo into thin strips and shape the crescent\n2. **Cover the frame** — Stretch paper or fabric over the bamboo\n3. **Paint the design** — Add traditional floral patterns\n4. **Attach the tail** — Create balance with a long tail\n5. **Test fly** — Find a windy day and test your wau',
      tags: ['kite', 'paper-craft', 'malaysian', 'aerodynamics'],
      created_by: users[0]?.id,
      status: 'published',
    },
    {
      title: 'Menanam Padi — Traditional Rice Cultivation',
      slug: 'menanam-padi-traditional-rice-cultivation',
      description: 'The ancient art of rice cultivation practiced across Southeast Asia, including terraced paddy fields and traditional irrigation.',
      category_id: catMap['agriculture'],
      country: 'ID',
      language: 'id',
      difficulty: 'beginner',
      learning_time: '3-4 months per cycle',
      content_markdown: '## Overview\n\nRice cultivation is fundamental to Southeast Asian culture and survival. Traditional methods include terraced fields and community irrigation systems.\n\n## Seasonal Cycle\n1. **Land Preparation** — Plowing and flooding the fields\n2. **Seedling Growth** — Growing seedlings in nurseries\n3. **Transplanting** — Moving seedlings to main fields\n4. **Growth Period** — Maintaining water levels\n5. **Harvest** — Cutting and threshing the rice\n\n## Traditional Tools\n- Cangkul (hoe)\n- Babi (wooden plow)\n- Tani (rice transplanter)\n- Angkong (threshing tool)',
      tags: ['agriculture', 'rice', 'traditional-farming', 'sustainable'],
      created_by: users[1]?.id,
      status: 'published',
    },
    {
      title: 'Membuat Rendang — Minangkabau Beef Rendang',
      slug: 'membuat-rendang-minangkabau-beef-rendang',
      description: 'The slow-cooking art of making authentic Minangkabau beef rendang, a dish recognized as intangible cultural heritage.',
      category_id: catMap['cooking-preservation'],
      country: 'ID',
      language: 'id',
      difficulty: 'intermediate',
      learning_time: '4-6 hours',
      content_markdown: '## Overview\n\nRendang is a slow-cooked dry curry from the Minangkabau people of West Sumatra. It is recognized by UNESCO as an intangible cultural heritage.\n\n## Ingredients\n- Beef (chuck or brisket)\n- Coconut milk\n- Lemongrass\n- Galangal\n- Turmeric leaves\n- Chili paste\n\n## Steps\n1. **Prepare the paste** — Grind spices into a smooth paste\n2. **Combine ingredients** — Mix beef, coconut milk, and spices\n3. **Slow cook** — Cook on low heat for 3-4 hours\n4. **Stir frequently** — Prevent burning as liquid reduces\n5. **Finish** — Cook until oil separates and coating is dark',
      tags: ['cooking', 'indonesian', 'traditional-food', 'minangkabau'],
      created_by: users[1]?.id,
      status: 'published',
      is_featured: true,
    },
  ];

  await knex('skills').insert(
    skills.map((s) => ({
      ...s,
      metadata: {},
    }))
  );

  const tags = [
    { name: 'textile', slug: 'textile' },
    { name: 'wax-resist', slug: 'wax-resist' },
    { name: 'indonesian', slug: 'indonesian' },
    { name: 'heritage-craft', slug: 'heritage-craft' },
    { name: 'martial-arts', slug: 'martial-arts' },
    { name: 'self-defense', slug: 'self-defense' },
    { name: 'malay', slug: 'malay' },
    { name: 'kite', slug: 'kite' },
    { name: 'agriculture', slug: 'agriculture' },
    { name: 'cooking', slug: 'cooking' },
    { name: 'traditional-food', slug: 'traditional-food' },
  ];

  await knex('tags').insert(tags);
}
