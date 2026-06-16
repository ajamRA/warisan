# Warisan — Library of Human Skills

A full-stack web application preserving and sharing practical human knowledge and traditional skills.

## Mission

Preserve and share practical human knowledge and traditional skills before they disappear. From traditional crafts to agricultural techniques, martial arts to cooking methods — Warisan is a living archive of human expertise.

## Tech Stack

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express 5, Knex (SQL-first)
- **Database:** PostgreSQL (full-text search)
- **Auth:** JWT with refresh tokens
- **Deployment:** Netlify (frontend) + Render (backend) + Supabase (database) — **100% Free**

## Features

- 📝 Skill entries with step-by-step instructions
- 🔍 Full-text search with autocomplete
- 🗺️ Interactive world map
- 🌐 Multi-language support (EN, MS, ID)
- 🌙 Dark mode
- 📄 PDF, HTML, and JSON export
- 🤖 AI-powered summarization and translation
- 👥 Community contributions with moderation
- 📱 Progressive Web App (PWA)

## Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (or use Docker)

### Development

```bash
# Clone the repository
git clone https://github.com/your-username/warisan.git
cd warisan

# Install dependencies
npm install

# Start PostgreSQL
docker compose up -d postgres

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed

# Start development server
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Docker

```bash
# Start all services
docker compose up --build

# Access the app
open http://localhost:3000
```

## Project Structure

```
warisan/
├── backend/           # Express API server
│   ├── src/
│   │   ├── config/    # Database, env, CORS
│   │   ├── middleware/ # Auth, validation, upload
│   │   ├── routes/    # API endpoints
│   │   ├── services/  # Business logic
│   │   ├── db/        # Migrations & seeds
│   │   └── utils/     # Helpers
│   └── uploads/       # File storage
├── frontend/          # React SPA
│   ├── src/
│   │   ├── components/# UI components
│   │   ├── pages/     # Route pages
│   │   ├── hooks/     # Custom hooks
│   │   ├── stores/    # Zustand stores
│   │   ├── lib/       # Utilities
│   │   └── types/     # TypeScript types
│   └── public/        # Static assets
├── shared/            # Shared types
├── docker-compose.yml
└── README.md
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user

### Skills
- `GET /api/skills` - List skills (paginated, filterable)
- `GET /api/skills/:slug` - Get skill by slug
- `POST /api/skills` - Create skill (authenticated)
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Search
- `GET /api/search?q=query` - Full-text search
- `GET /api/search/autocomplete?q=partial` - Autocomplete

### Export
- `GET /api/export/skill/:id/pdf` - Download PDF
- `GET /api/export/skill/:id/html` - Download HTML
- `GET /api/export/skill/:id/json` - Download JSON

## Database Schema

- **users** - User accounts with roles
- **categories** - Skill categories
- **skills** - Skill entries with full-text search
- **skill_images** - Associated images
- **tags** - Skill tags
- **skill_tags** - Skill-tag relationships
- **skill_versions** - Edit history
- **moderation_queue** - Pending submissions
- **skill_related** - Related skills
- **badges** - Community badges
- **user_badges** - Awarded badges

## Deployment (100% Free)

### Step 1: Supabase (Database)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to **Settings → Database → Connection string**
4. Copy the **Transaction** mode URL (it looks like `postgresql://postgres.xxxxx:password@aws-0-xxx.pooler.supabase.com:6543/postgres`)

### Step 2: Render (Backend)

1. Create account at [render.com](https://render.com)
2. Create **New Web Service** → Connect GitHub repo
3. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node dist/index.js`
4. Add environment variables (see `.env.render.example`):
   - `DATABASE_URL` → Supabase connection string
   - `JWT_SECRET` → random string
   - `JWT_REFRESH_SECRET` → random string
   - `CORS_ORIGIN` → your Netlify URL (fill after Step 3)
5. After deploy, run migrations:
   ```bash
   # Install Render CLI first
   npm install -g @anthropic-ai/render-cli
   render login
   render run --service warisan-api -- npm run db:migrate
   render run --service warisan-api -- npm run db:seed
   ```

### Step 3: Netlify (Frontend)

1. Create account at [netlify.com](https://netlify.com)
2. **Import from Git** → Select your repo
3. Settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Add environment variable:
   - `VITE_API_URL` → your Render backend URL (e.g., `https://warisan-api.onrender.com`)
5. Go back to Render and update `CORS_ORIGIN` with your Netlify URL

### Environment Variables Summary

| Service | Variable | Value |
|---------|----------|-------|
| **Render** | `DATABASE_URL` | Supabase connection string |
| **Render** | `JWT_SECRET` | Random string |
| **Render** | `JWT_REFRESH_SECRET` | Random string |
| **Render** | `CORS_ORIGIN` | Your Netlify URL |
| **Netlify** | `VITE_API_URL` | Your Render URL |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

Built with ❤️ for cultural preservation.