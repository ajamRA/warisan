# Library of Human Skills — Implementation Plan

## Project Overview

A full-stack web application preserving and sharing practical human knowledge and traditional skills. Built as a monorepo at `d:/apps/warisan`.

---

## 1. Project Structure

```
d:/apps/warisan/
├── package.json                  # Root workspace config
├── docker-compose.yml            # Full stack orchestration
├── docker-compose.dev.yml        # Dev overrides
├── .env.example
├── .gitignore
├── README.md
│
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── knexfile.ts               # Knex config (DB migrations + seeds)
│   ├── Dockerfile
│   ├── src/
│   │   ├── index.ts              # Express entrypoint
│   │   ├── app.ts                # Express app setup
│   │   ├── config/
│   │   │   ├── database.ts       # Knex instance
│   │   │   ├── env.ts            # Env validation (zod)
│   │   │   └── cors.ts           # CORS config
│   │   ├── middleware/
│   │   │   ├── auth.ts           # JWT verify middleware
│   │   │   ├── validate.ts       # Request validation (zod)
│   │   │   ├── upload.ts         # Multer file upload
│   │   │   └── errorHandler.ts   # Global error handler
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── skills.routes.ts
│   │   │   ├── users.routes.ts
│   │   │   ├── categories.routes.ts
│   │   │   ├── search.routes.ts
│   │   │   ├── export.routes.ts
│   │   │   └── ai.routes.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── skills.controller.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── search.controller.ts
│   │   │   ├── export.controller.ts
│   │   │   └── ai.controller.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── skills.service.ts
│   │   │   ├── search.service.ts
│   │   │   ├── export.service.ts
│   │   │   ├── ai.service.ts
│   │   │   └── upload.service.ts
│   │   ├── db/
│   │   │   ├── migrations/
│   │   │   │   ├── 001_create_users.ts
│   │   │   │   ├── 002_create_categories.ts
│   │   │   │   ├── 003_create_skills.ts
│   │   │   │   ├── 004_create_skill_images.ts
│   │   │   │   ├── 005_create_skill_tags.ts
│   │   │   │   ├── 006_create_skill_versions.ts
│   │   │   │   ├── 007_create_moderation_queue.ts
│   │   │   │   ├── 008_create_skill_related.ts
│   │   │   │   ├── 009_create_badges.ts
│   │   │   │   └── 010_create_fts_indexes.ts
│   │   │   ├── seeds/
│   │   │   │   ├── 001_users.ts
│   │   │   │   ├── 002_categories.ts
│   │   │   │   └── 003_skills.ts
│   │   │   └── types.ts          # DB row type definitions
│   │   └── utils/
│   │       ├── password.ts       # bcrypt helpers
│   │       ├── jwt.ts            # Token sign/verify
│   │       └── pdf.ts            # PDF generation (pdfkit)
│   ├── uploads/                  # Local file storage
│   └── test/
│       ├── auth.test.ts
│       ├── skills.test.ts
│       └── search.test.ts
│
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── components.json           # shadcn/ui config
│   ├── index.html
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── manifest.json         # PWA manifest
│   │   └── icons/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx               # Router + providers
│   │   ├── index.css             # Tailwind imports + theme vars
│   │   ├── components/
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── navigation-menu.tsx
│   │   │   │   ├── skeleton.tsx
│   │   │   │   ├── toast.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── avatar.tsx
│   │   │   │   ├── separator.tsx
│   │   │   │   ├── sheet.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   ├── textarea.tsx
│   │   │   │   ├── tooltip.tsx
│   │   │   │   └── pagination.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── MobileNav.tsx
│   │   │   │   └── Layout.tsx
│   │   │   ├── skill/
│   │   │   │   ├── SkillCard.tsx
│   │   │   │   ├── SkillGrid.tsx
│   │   │   │   ├── SkillDetail.tsx
│   │   │   │   ├── SkillForm.tsx
│   │   │   │   ├── SkillSteps.tsx
│   │   │   │   ├── SkillMeta.tsx
│   │   │   │   ├── RelatedSkills.tsx
│   │   │   │   └── SkillOfTheDay.tsx
│   │   │   ├── search/
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   ├── FilterPanel.tsx
│   │   │   │   └── SortSelect.tsx
│   │   │   ├── map/
│   │   │   │   └── WorldMap.tsx  # Interactive map (react-simple-maps)
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── UserMenu.tsx
│   │   │   ├── moderation/
│   │   │   │   ├── ModerationQueue.tsx
│   │   │   │   └── ModerationActions.tsx
│   │   │   └── profile/
│   │   │       ├── ProfileCard.tsx
│   │   │       └── ContributionList.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── SkillDetail.tsx
│   │   │   ├── Search.tsx
│   │   │   ├── Category.tsx
│   │   │   ├── Map.tsx
│   │   │   ├── SubmitSkill.tsx
│   │   │   ├── EditSkill.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Moderation.tsx
│   │   │   ├── About.tsx
│   │   │   └── NotFound.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useSkills.ts
│   │   │   ├── useSearch.ts
│   │   │   ├── useDebounce.ts
│   │   │   └── useTheme.ts
│   │   ├── lib/
│   │   │   ├── api.ts            # Axios/fetch wrapper
│   │   │   ├── utils.ts          # cn() helper, formatters
│   │   │   ├── constants.ts      # Categories, countries, etc.
│   │   │   └── i18n.ts           # i18next setup
│   │   ├── stores/
│   │   │   ├── authStore.ts      # Zustand auth state
│   │   │   └── themeStore.ts     # Theme preference
│   │   ├── types/
│   │   │   └── index.ts          # Shared TypeScript types
│   │   └── locales/
│   │       ├── en.json
│   │       ├── ms.json
│   │       └── id.json
│   └── test/
│       └── setup.ts
│
└── shared/
    └── types.ts                  # Shared types (backend + frontend)
```

**Architecture: Monorepo with npm workspaces**

Root `package.json`:
```json
{
  "name": "warisan",
  "private": true,
  "workspaces": ["backend", "frontend", "shared"],
  "scripts": {
    "dev": "concurrently -n api,web -c blue,green \"npm run dev -w backend\" \"npm run dev -w frontend\"",
    "build": "npm run build -w backend && npm run build -w frontend",
    "db:migrate": "npm run migrate -w backend",
    "db:seed": "npm run seed -w backend",
    "db:reset": "npm run db:migrate -- --rollback && npm run db:migrate && npm run db:seed",
    "lint": "npm run lint -w backend && npm run lint -w frontend",
    "test": "npm run test -w backend",
    "docker:up": "docker compose up -d",
    "docker:down": "docker compose down"
  },
  "devDependencies": {
    "concurrently": "^9.2.1"
  }
}
```

---

## 2. Database Schema (PostgreSQL)

### Migration: 001_create_users.ts
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  bio TEXT,
  avatar_url VARCHAR(500),
  role VARCHAR(20) NOT NULL DEFAULT 'contributor',
  -- role: 'admin' | 'moderator' | 'contributor' | 'viewer'
  country VARCHAR(3),
  language VARCHAR(5),
  skills_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### Migration: 002_create_categories.ts
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(7),
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Migration: 003_create_skills.ts
```sql
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(250) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  country VARCHAR(3),
  language VARCHAR(5) NOT NULL DEFAULT 'en',
  difficulty VARCHAR(20) NOT NULL DEFAULT 'beginner',
  -- difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master'
  learning_time VARCHAR(50),
  content_markdown TEXT NOT NULL,
  video_url VARCHAR(500),
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending',
  -- status: 'draft' | 'pending' | 'published' | 'rejected' | 'archived'
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
```

### Migration: 004_create_skill_images.ts
```sql
CREATE TABLE skill_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(200),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_skill_images_skill ON skill_images(skill_id);
```

### Migration: 005_create_skill_tags.ts
```sql
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
```

### Migration: 006_create_skill_versions.ts
```sql
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
```

### Migration: 007_create_moderation_queue.ts
```sql
CREATE TABLE moderation_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  action VARCHAR(20) NOT NULL,
  -- action: 'create' | 'edit' | 'delete'
  submitted_by UUID NOT NULL REFERENCES users(id),
  reviewed_by UUID REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending',
  -- status: 'pending' | 'approved' | 'rejected'
  notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

CREATE INDEX idx_moderation_status ON moderation_queue(status);
```

### Migration: 008_create_skill_related.ts
```sql
CREATE TABLE skill_related (
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  related_skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  relevance_score FLOAT DEFAULT 1.0,
  PRIMARY KEY (skill_id, related_skill_id)
);
```

### Migration: 009_create_badges.ts
```sql
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
```

### Migration: 010_create_fts_indexes.ts — Full-Text Search
```sql
-- Add tsvector column for full-text search
ALTER TABLE skills ADD COLUMN search_vector tsvector;

-- Populate search_vector from title, description, content_markdown
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

-- GIN index for fast full-text search
CREATE INDEX idx_skills_search ON skills USING GIN(search_vector);

-- Trigram index for fuzzy matching (requires pg_trgm extension)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_skills_title_trgm ON skills USING GIN(title gin_trgm_ops);
```

**Key PostgreSQL FTS queries the backend will use:**
```sql
-- Full-text search with ranking
SELECT *, ts_rank(search_vector, plainto_tsquery('english', $1)) AS rank
FROM skills
WHERE status = 'published'
  AND search_vector @@ plainto_tsquery('english', $1)
ORDER BY rank DESC;

-- Autocomplete with trigram
SELECT title, similarity(title, $1) AS sim
FROM skills
WHERE status = 'published'
  AND title % $1
ORDER BY sim DESC
LIMIT 10;
```

---

## 3. Backend Implementation

### 3.1 Tech Stack & Dependencies

**backend/package.json key dependencies:**
```json
{
  "dependencies": {
    "express": "^5.1.0",
    "knex": "^3.1.0",
    "pg": "^8.13.0",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.24.0",
    "cors": "^2.8.5",
    "helmet": "^8.0.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "pdfkit": "^0.15.0",
    "slugify": "^1.6.6",
    "sanitize-html": "^2.14.0",
    "sharp": "^0.33.0",
    "ioredis": "^5.4.0",
    "openai": "^4.78.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/express": "^5.0.0",
    "@types/bcrypt": "^5.0.2",
    "@types/jsonwebtoken": "^9.0.7",
    "@types/cors": "^2.8.17",
    "@types/morgan": "^1.9.9",
    "@types/multer": "^1.4.12",
    "@types/sanitize-html": "^2.13.0",
    "tsx": "^4.19.0",
    "vitest": "^3.0.0",
    "supertest": "^7.0.0",
    "@types/supertest": "^6.0.2",
    "eslint": "^9.0.0"
  }
}
```

### 3.2 Express App Setup (app.ts)

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import { env } from './config/env';

const app = express();

// Security & parsing
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/ai', aiRoutes);
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

// Error handling
app.use(errorHandler);

export default app;
```

### 3.3 API Endpoints

#### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| POST | `/api/auth/refresh` | Yes | Refresh JWT token |
| GET | `/api/auth/me` | Yes | Get current user profile |

#### Skills
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/skills` | No | List skills (paginated, filterable) |
| GET | `/api/skills/:slug` | No | Get skill by slug |
| POST | `/api/skills` | Yes (contributor+) | Create skill (goes to moderation) |
| PUT | `/api/skills/:id` | Yes (owner/admin) | Update skill |
| DELETE | `/api/skills/:id` | Yes (owner/admin) | Soft-delete skill |
| GET | `/api/skills/:id/versions` | No | Get version history |
| POST | `/api/skills/:id/bookmark` | Yes | Bookmark/unbookmark |
| GET | `/api/skills/featured` | No | Get featured skills |
| GET | `/api/skills/skill-of-day` | No | Get skill of the day |
| GET | `/api/skills/:id/related` | No | Get related skills |

**Query params for GET /api/skills:**
- `page`, `limit` (pagination)
- `category`, `country`, `language`, `difficulty` (filters)
- `search` (full-text search)
- `sort`: `newest` | `popular` | `updated`
- `tag` (filter by tag)

#### Users
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/users/:id` | No | Get user profile |
| PUT | `/api/users/:id` | Yes (self) | Update profile |
| GET | `/api/users/:id/skills` | No | Get user's skills |
| GET | `/api/users/:id/badges` | No | Get user's badges |

#### Categories
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/categories` | No | List all categories |
| GET | `/api/categories/:slug/skills` | No | Skills in category |

#### Search
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/search` | No | Full-text search |
| GET | `/api/search/autocomplete` | No | Autocomplete suggestions |
| GET | `/api/search/stats` | No | Search facets/counts |

#### Moderation (admin/moderator only)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/moderation` | Yes (mod+) | List pending items |
| POST | `/api/moderation/:id/approve` | Yes (mod+) | Approve skill |
| POST | `/api/moderation/:id/reject` | Yes (mod+) | Reject with reason |

#### Export
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/export/skill/:id/pdf` | No | Download PDF |
| GET | `/api/export/skill/:id/html` | No | Download offline HTML |
| GET | `/api/export/skill/:id/json` | No | Download JSON |
| GET | `/api/export/all/json` | No | Bulk JSON export |

#### AI (requires API key or self-hosted model)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/ai/summarize` | Yes | Summarize skill content |
| POST | `/api/ai/translate` | Yes | Translate to target language |
| POST | `/api/ai/extract-metadata` | Yes | Auto-extract tags, difficulty, etc. |
| POST | `/api/ai/generate-steps` | Yes | Generate steps from description |

### 3.4 Auth Implementation

**JWT strategy:**
- Access token: 15 min, in `Authorization: Bearer <token>` header
- Refresh token: 7 days, stored in httpOnly cookie
- Password hashing: bcrypt with 12 rounds
- Roles: admin > moderator > contributor > viewer

**auth.service.ts key functions:**
- `register(name, email, password)` → hash, insert, return tokens
- `login(email, password)` → verify, return tokens
- `refreshToken(refreshToken)` → verify, issue new pair
- `getProfile(userId)` → fetch user without password

**auth.ts middleware:**
```typescript
export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function requireRole(...roles: string[]) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}
```

### 3.5 Search Implementation

**search.service.ts key functions:**
- `fullTextSearch(query, filters, pagination)` → FTS with ts_rank + pg_trgm fallback
- `autocomplete(partial)` → trigram similarity + limit 10
- `getFacets(query)` → counts per category/country/language

### 3.6 Export Implementation

**export.service.ts:**
- `generatePDF(skill)` → pdfkit with markdown rendering, images
- `generateOfflineHTML(skill)` → self-contained HTML with inline CSS/JS
- `generateJSON(skill)` → clean JSON export
- `bulkJSONExport()` → streamed JSON of all published skills

### 3.7 AI Features

**ai.service.ts** (wraps OpenAI or compatible API):
- `summarize(content)` → 3-5 sentence summary
- `translate(content, targetLang)` → translated content
- `extractMetadata(content)` → { tags, difficulty, learningTime, category }
- `generateSteps(description)` → structured step-by-step from description
- `findRelated(skillContent, allSkills)` → cosine similarity matching

---

## 4. Frontend Implementation

### 4.1 Tech Stack & Dependencies

**frontend/package.json key dependencies:**
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.0",
    "@tanstack/react-query": "^5.60.0",
    "zustand": "^5.0.0",
    "axios": "^1.7.0",
    "react-hook-form": "^7.54.0",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.24.0",
    "i18next": "^24.0.0",
    "react-i18next": "^15.1.0",
    "i18next-browser-languagedetector": "^8.0.0",
    "lucide-react": "^0.460.0",
    "react-simple-maps": "^3.0.0",
    "remark-gfm": "^4.0.0",
    "react-markdown": "^9.0.0",
    "date-fns": "^4.1.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.6.0",
    "class-variance-authority": "^0.7.0",
    "next-themes": "^0.4.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^6.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^9.0.0",
    "vitest": "^3.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0"
  }
}
```

### 4.2 Tailwind + shadcn/ui Setup

**tailwind.config.ts:**
```typescript
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
      },
      borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: { 'accordion-down': 'accordion-down 0.2s ease-out', 'accordion-up': 'accordion-up 0.2s ease-out' },
    },
  },
  plugins: [animate],
};
export default config;
```

### 4.3 Routing (App.tsx)

```tsx
<Routes>
  <Route element={<Layout />}>
    {/* Public */}
    <Route index element={<Home />} />
    <Route path="skills/:slug" element={<SkillDetail />} />
    <Route path="search" element={<Search />} />
    <Route path="category/:slug" element={<Category />} />
    <Route path="map" element={<Map />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="about" element={<About />} />

    {/* Authenticated */}
    <Route element={<ProtectedRoute />}>
      <Route path="submit" element={<SubmitSkill />} />
      <Route path="skills/:id/edit" element={<EditSkill />} />
      <Route path="profile" element={<Profile />} />
      <Route path="profile/:id" element={<Profile />} />
    </Route>

    {/* Admin/Moderator */}
    <Route element={<ProtectedRoute roles={['admin', 'moderator']} />}>
      <Route path="moderation" element={<Moderation />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Route>
</Routes>
```

### 4.4 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero, Skill of the Day, featured categories, latest skills, world map preview |
| **Skill Detail** | `/skills/:slug` | Full content, steps, images, video, metadata, related skills, version history |
| **Search** | `/search` | Search bar + filters + results grid |
| **Category** | `/category/:slug` | Skills filtered by category |
| **Map** | `/map` | Interactive world map with skill pins by country |
| **Submit Skill** | `/submit` | Multi-step form: metadata → content (markdown editor) → images → review |
| **Edit Skill** | `/skills/:id/edit` | Edit form with diff preview |
| **Profile** | `/profile/:id` | User info, badges, contributions |
| **Login** | `/login` | Email/password login form |
| **Register** | `/register` | Registration form |
| **Moderation** | `/moderation` | Queue of pending submissions, approve/reject actions |

### 4.5 Key Components

**SkillCard**: Card with thumbnail, title, category badge, difficulty indicator, country flag, learning time, author avatar.

**SearchBar**: Debounced input with autocomplete dropdown. Uses `/api/search/autocomplete`.

**FilterPanel**: Collapsible sidebar with category, country, language, difficulty filters. Each shows facet counts from API.

**WorldMap**: react-simple-maps with country-level pins. Click country → filtered skills list.

**SkillForm**: React Hook Form + Zod validation. Markdown editor for content (react-markdown + textarea or a lightweight MDX editor).

**SkillSteps**: Renders numbered steps from markdown with nice formatting.

**ModerationQueue**: Table with skill preview, submitter info, approve/reject buttons with notes.

### 4.6 State Management (Zustand)

```typescript
// stores/authStore.ts
interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}
```

### 4.7 i18n Setup

```typescript
// lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../locales/en.json';
import ms from '../locales/ms.json';
import id from '../locales/id.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, ms: { translation: ms }, id: { translation: id } },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
```

### 4.8 Dark Mode

Using `next-themes` (works without Next.js):
```tsx
// ThemeProvider wraps app root
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  <App />
</ThemeProvider>
```

Toggle in Header: Sun/Moon icon button that calls `useTheme()`.

---

## 5. Docker & Deployment

### 5.1 Backend Dockerfile (multi-stage)

```dockerfile
FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim AS production
RUN apt-get update && apt-get install -y sharp && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/db ./dist/db
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"
CMD ["node", "dist/index.js"]
```

### 5.2 Frontend Dockerfile (multi-stage)

```dockerfile
FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

### 5.3 nginx.conf

```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;

  location /api {
    proxy_pass http://warisan-api:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /uploads {
    proxy_pass http://warisan-api:3001;
  }

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache static assets
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

### 5.4 docker-compose.yml

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: warisan-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DB_USER:-warisan}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-warisan}
      POSTGRES_DB: ${DB_NAME:-warisan}
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - '127.0.0.1:5432:5432'
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U ${DB_USER:-warisan}']
      interval: 5s
      timeout: 3s
      retries: 5

  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: warisan-api
    restart: unless-stopped
    ports:
      - '127.0.0.1:3001:3001'
    environment:
      NODE_ENV: production
      PORT: 3001
      DATABASE_URL: postgresql://${DB_USER:-warisan}:${DB_PASSWORD:-warisan}@postgres:5432/${DB_NAME:-warisan}
      JWT_SECRET: ${JWT_SECRET:-change-me-in-production}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET:-change-me-too}
      CORS_ORIGIN: ${CORS_ORIGIN:-http://localhost:3000}
      S3_ENABLED: ${S3_ENABLED:-false}
      S3_ENDPOINT: ${S3_ENDPOINT:-}
      S3_BUCKET: ${S3_BUCKET:-}
      S3_ACCESS_KEY: ${S3_ACCESS_KEY:-}
      S3_SECRET_KEY: ${S3_SECRET_KEY:-}
      OPENAI_API_KEY: ${OPENAI_API_KEY:-}
    volumes:
      - uploads-data:/app/uploads
    depends_on:
      postgres:
        condition: service_healthy

  web:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: warisan-web
    restart: unless-stopped
    ports:
      - '127.0.0.1:3000:80'
    depends_on:
      - api

  # Optional: Redis for caching
  redis:
    image: redis:7-alpine
    container_name: warisan-redis
    restart: unless-stopped
    profiles: ['full']
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data

volumes:
  postgres-data:
  uploads-data:
  redis-data:
```

### 5.5 dev Docker Compose Override (docker-compose.dev.yml)

```yaml
services:
  api:
    build:
      context: ./backend
      target: builder
    command: npx tsx watch src/index.ts
    volumes:
      - ./backend/src:/app/src
      - ./backend/uploads:/app/uploads
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://warisan:warisan@postgres:5432/warisan
      JWT_SECRET: dev-secret
      JWT_REFRESH_SECRET: dev-refresh-secret

  web:
    build:
      context: ./frontend
      target: builder
    command: npm run dev -- --host 0.0.0.0
    volumes:
      - ./frontend/src:/app/src
    ports:
      - '5173:5173'
```

---

## 6. Seed Data

### Categories (seed: 002_categories.ts)
```typescript
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
```

### Sample Skills (seed: 003_skills.ts)
```typescript
const sampleSkills = [
  {
    title: 'Batik Tulis — Traditional Hand-Drawn Wax-Resist Dyeing',
    slug: 'batik-tulis-hand-drawn-wax-resist',
    description: 'The art of creating intricate patterns on fabric using hot wax and natural dyes, practiced for centuries in Java, Indonesia.',
    category: 'textile-weaving',
    country: 'ID',
    language: 'ms',
    difficulty: 'advanced',
    learning_time: '6 months to mastery',
    content_markdown: `## Overview\n\nBatik Tulis is the oldest and most respected form of batik...\n\n## Materials\n- Cotton fabric (primissima)\n- Canting (wax pen)\n- Malam (batik wax)\n- Natural indigo dye\n\n## Steps\n1. **Prepare the fabric** — Wash and bleach...\n2. **Draw the pattern (pola)** — Using a pencil...\n3. **Apply wax (mewarna)** — Heat the malam...`,
    tags: ['textile', 'wax-resist', 'indonesian', 'heritage-craft'],
    is_featured: true,
  },
  {
    title: 'Silat — Traditional Malay Martial Art',
    slug: 'silat-traditional-malay-martial-art',
    description: 'Pencak Silat is a martial art originating from the Malay Archipelago, combining self-defense, spirituality, and artistic expression.',
    category: 'martial-arts-games',
    country: 'MY',
    language: 'ms',
    difficulty: 'intermediate',
    learning_time: '1-2 years',
    content_markdown: '...',
    tags: ['martial-arts', 'self-defense', 'malay', 'ungku'],
    is_featured: true,
  },
  {
    title: 'Wau Bulan — Malaysian Moon Kite Making',
    slug: 'wau-bulan-moon-kite-making',
    description: 'Crafting the iconic Wau Bulan (moon kite), a symbol of Malaysian heritage featuring intricate floral patterns.',
    category: 'craft-art',
    country: 'MY',
    language: 'ms',
    difficulty: 'intermediate',
    learning_time: '2-3 weeks',
    content_markdown: '...',
    tags: ['kite', 'paper-craft', 'malaysian', 'aerodynamics'],
  },
  // 20+ more entries covering diverse regions and skills...
];
```

---

## 7. Testing Strategy

### Backend (Vitest + Supertest)
- **Unit tests**: Services (auth, search, export) — mock DB with in-memory SQLite
- **Integration tests**: API endpoints — use supertest against Express app
- **DB tests**: Migrations and raw queries against test PostgreSQL
- Coverage targets: 70%+ lines

### Frontend (Vitest + React Testing Library)
- **Component tests**: SkillCard, SearchBar, FilterPanel, forms
- **Hook tests**: useAuth, useSearch, useSkills
- **Page tests**: Login, Register, SubmitSkill (form validation flows)
- Coverage targets: 60%+ lines

### E2E (Playwright — optional, later phase)
- Critical flows: register → submit skill → moderation approve → skill visible
- Search and filter flows
- Dark mode persistence
- i18n language switching

---

## 8. Verification Steps

### Phase 1: Foundation
1. `npm install` at root — workspaces resolve
2. `docker compose up postgres` — PG starts, healthcheck passes
3. `npm run db:migrate` — all 10 migrations run, tables created
4. `npm run db:seed` — categories and sample skills inserted
5. `npm run dev` — backend on :3001, frontend on :5173
6. `curl http://localhost:3001/api/health` → `{"status":"ok"}`
7. `curl http://localhost:5173` → HTML page loads

### Phase 2: Auth
8. Register via POST /api/auth/register → 201 + tokens
9. Login via POST /api/auth/login → 200 + tokens
10. Access /api/auth/me with token → user profile
11. Access /api/auth/me without token → 401

### Phase 3: Skills CRUD
12. Create skill via POST /api/skills (authenticated) → 201
13. List skills via GET /api/skills → paginated list
14. Get skill by slug → full detail
15. Edit skill → version created in skill_versions
16. Full-text search → ranked results

### Phase 4: Frontend
17. Home page renders with Skill of the Day, categories, featured
18. Search page: type query → results appear with debounce
19. Skill detail page: content, images, metadata, related skills
20. Submit skill form: validation, markdown preview, image upload
21. Dark mode toggle works
22. Language switch (EN/MS/ID) works

### Phase 5: Docker
23. `docker compose up --build` — all 3 services start
24. Frontend accessible at localhost:3000
25. API proxied through nginx at /api
26. Uploads persist across container restarts

### Phase 6: Export
27. PDF download for a skill → valid PDF with formatting
28. HTML export → opens offline, all assets inline
29. JSON export → clean structured data

---

## 9. Implementation Order (Build Phases)

| Phase | Scope | Estimated Time |
|-------|-------|---------------|
| **1. Scaffold** | Project structure, package.json, configs, Docker | 2-3 hours |
| **2. Database** | Migrations, seeds, connection setup | 2-3 hours |
| **3. Auth** | Register, login, JWT, middleware | 3-4 hours |
| **4. Skills API** | CRUD, search, moderation | 4-5 hours |
| **5. Frontend Shell** | Vite + Tailwind + shadcn + routing + layout | 3-4 hours |
| **6. Pages** | Home, Search, Skill Detail, Category | 4-5 hours |
| **7. Auth UI** | Login, Register, profile, auth flow | 2-3 hours |
| **8. Submit/Edit** | Skill submission form, markdown editor | 3-4 hours |
| **9. Search UI** | Search bar, filters, results grid | 2-3 hours |
| **10. Map** | Interactive world map | 2-3 hours |
| **11. Export** | PDF, HTML, JSON generation | 2-3 hours |
| **12. AI** | Summarize, translate, extract metadata | 3-4 hours |
| **13. Moderation** | Queue, approve/reject, notifications | 2-3 hours |
| **14. PWA** | Service worker, manifest, offline support | 2-3 hours |
| **15. Polish** | Dark mode, i18n, badges, Skill of Day | 3-4 hours |
| **16. Testing** | Unit + integration tests | 4-5 hours |
| **17. Docker + Deploy** | Final Docker setup, env config | 2-3 hours |

---

## 10. Key Design Decisions

1. **Monorepo with npm workspaces** — shared types, single install, coordinated scripts. Avoids Nx/Turborepo complexity for this project size.

2. **Express 5 over NestJS** — simpler for this scope. No decorators, more explicit. Consistent with "New project 2" pattern in workspace.

3. **Knex over TypeORM** — SQL-first approach. Better control over PostgreSQL-specific features (tsvector, pg_trgm). Simpler migrations. No entity decorator magic.

4. **shadcn/ui components** — accessible, customizable, no runtime overhead. Pattern already established in workspace.

5. **Zustand over Redux** — lighter state management. Simple API, good TypeScript support, no boilerplate.

6. **PostgreSQL FTS over Elasticsearch** — sufficient for this scale. No additional infrastructure. tsvector + ts_rank + pg_trgm covers search + autocomplete + fuzzy matching.

7. **JWT with refresh tokens** — stateless auth, works with any frontend. Short-lived access tokens + httpOnly refresh cookies for security.

8. **Status workflow for skills** — draft → pending → published. Moderation required before public visibility. Prevents spam while enabling community contributions.

9. **Markdown content** — portable, exportable, easy to render. Avoids custom rich text editor complexity. react-markdown handles rendering.

10. **i18n from day one** — react-i18next with EN/MS/ID. All user-facing strings in translation files. RTL-ready with Tailwind.

---

## 11. Environment Variables

### .env.example
```env
# Database
DB_USER=warisan
DB_PASSWORD=warisan
DB_NAME=warisan
DATABASE_URL=postgresql://warisan:warisan@localhost:5432/warisan

# Auth
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here

# CORS
CORS_ORIGIN=http://localhost:5173

# Storage
S3_ENABLED=false
S3_ENDPOINT=
S3_BUCKET=
S3_ACCESS_KEY=
S3_SECRET_KEY=

# AI (optional)
OPENAI_API_KEY=
AI_MODEL=gpt-4o-mini

# App
NODE_ENV=development
PORT=3001
```

---

*Plan ready for implementation. Start with Phase 1: Scaffold.*
