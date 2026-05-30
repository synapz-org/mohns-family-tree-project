# Mohns.ca — Audit & Simplification Plan

*April 2, 2026*

---

## 1. AUDIT: What Exists

### Project A: `mohns-family-tree-project` (~/Projects/mohns-family-tree-project)

**Stack**: Node.js monorepo — Next.js 14 frontend + Express.js backend + PostgreSQL + Redis

**What's actually built** (vs what was planned):

| Feature | Status | Notes |
|---------|--------|-------|
| Auth routes (login/JWT) | Stub | Mock users with hardcoded passwords. No DB integration. |
| Family routes | Stub | Returns empty arrays. "to be implemented" |
| Story routes | Stub | Returns empty arrays. |
| Book routes | Stub | Returns empty arrays. |
| Privacy routes | Stub | Returns empty objects. |
| Reunion routes | Stub | Returns empty objects. |
| Notification routes | Stub | Returns empty arrays. |
| User profile routes | Stub | Returns request context only. |
| Frontend homepage | Stub | Landing page component with feature cards, no data. |
| Frontend layout | Stub | Header/Footer/Providers, Tailwind configured. |

**Verdict**: This is scaffolding. Every single route returns mock data or "to be implemented." The Docker compose spins up 8 services (Postgres, Redis, Backend, Frontend, Nginx, MinIO, MailHog, Elasticsearch/Kibana) for basically stub code. The entire backend has no database layer — it's Express routers returning JSON literals.

**Scrap it completely.** Zero salvageable code. Even the "auth" system is hard-coded mock users.

### Project B: `mohns` (~/Projects/mohns)

**Stack**: Next.js 14 App Router + Supabase (Postgres + Storage + Auth)

**What's actually built**:

| Component | Status | Notes |
|-----------|--------|-------|
| People table | Built | From GEDCOM import. Has name, birth/death data. |
| Families table | Built | Marriage data, parent-child links. |
| Timeline entries table | Built | Photos, stories, events with approval workflow. |
| Contributors table | Built | User tracking with gamification fields. |
| Suggestions table | Built | Collaborative edit suggestions. |
| `/` homepage | Built | Landing with featured ancestor, stats. |
| `/people` page | Built | List of family members. |
| `/person/[id]` page | Built | Individual person detail view. |
| `/contribute` page | Built | Multi-step form with photo upload, person tagging, date picker. |
| `/admin/contributions` | Built | Approve/reject pending submissions. |
| `/privacy` page | Built | Placeholder privacy policy. |
| Family tree viz (NetworkGraph) | Built | D3 network visualization. |
| Timeline view | Built | Infinite scroll decade-by-decade. |
| Activity feed | Built | Real-time contribution activity. |
| API: contributions | Built | POST/GET/PATCH routes. |
| API: timeline | Built | GET by decade, approved entries. |
| API: suggestions | Built | CRUD endpoints. |
| API: upload | Built | Supabase Storage upload. |
| GEDCOM importer | Built | `lib/gedcom.ts` + import script. |

**Verdict**: This project actually works. It has a real database schema, functional components, a contribution flow, and admin review. But it's also *way* too much for what Mary Ellen needs.

**Potentially salvageable**:
- `schema.sql` — the `people` and `families` tables (if we ever want to show the tree)
- `lib/gedcom.ts` — GEDCOM parser (if Mary Ellen has GEDCOM data to import)
- `mohs_data.ged` — sample GEDCOM file in repo root

**Scrap it for this rebuild** — but keep the repo as an archive. The work here proves the data model if a future version needs the tree.

---

## 2. WHAT MARY ELLEN ACTUALLY NEEDS

The requirements are dead simple:
1. A form where family members submit life updates (births, deaths, marriages, divorces, name changes, address changes)
2. An email notification to Mary Ellen on each submission
3. Maybe a page showing recent updates/announcements
4. No user accounts, no family tree visualization, no payment, no blockchain, no video uploads

---

## 3. PROPOSED ARCHITECTURE

**Stack**: Flask + SQLite + Jinja2 — identical pattern to whatsonlive-marketing.

**Why not the complexity**:
- No Node build chain, no webpack, no Vercel dependency
- SQLite is fine for a family of ~50-200 people making occasional updates
- No auth system — the form is open with a simple honeypot/rate-limit for spam
- Email via SMTP env vars (SendGrid, Resend, or just Mailgun — pick one)
- Railway deploys from git. One `Procfile`, one `requirements.txt`.

**Deployment**: Railway (same platform as whats-tonight and whatsonlive-marketing).

**Domain**: mohns.ca (already exists per AGENT.md in project A).

### Directory Structure

```
mohns-simple/
├── app.py                  # Flask app (1-200 lines)
├── requirements.txt        # Flask, gunicorn, python-dotenv
├── Procfile                # web: gunicorn app:app
├── .gitignore
├── .env.example            # SECRET_KEY, MAIL_TO, SMTP_* vars
├── instance/
│   └── mohns.db            # SQLite database (gitignored)
├── templates/
│   ├── base.html           # Shared layout with header/footer
│   ├── index.html          # Home: recent updates + link to form
│   ├── submit.html         # The update submission form
│   ├── thanks.html         # Confirmation page
│   └── admin.html          # (optional) Mary's view — list all updates
└── static/
    └── style.css           # Clean, simple styling
```

### Database Schema (SQLite)

```sql
CREATE TABLE updates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    your_name TEXT NOT NULL,
    your_email TEXT NOT NULL,
    relationship TEXT,           -- e.g. "grandchild of John", "Mary's daughter"
    update_type TEXT NOT NULL,   -- birth|death|marriage|divorce|name_change|address_change|other
    person_name TEXT NOT NULL,   -- who the update is about
    date_of_event TEXT,          -- when it happened (freeform, e.g. "2026-04-02" or "March 2026")
    details TEXT,                -- free-form description
    status TEXT DEFAULT 'new'    -- new|reviewed|posted
);
```

That's it. One table. Mary Ellen gets an email, reviews the entry, and marks it as posted so it appears on the homepage.

### Flask App Design (app.py)

Routes:
- `GET /` — Homepage with recent posted updates
- `GET /submit` — The update form
- `POST /submit` — Process submission, send email, show thanks
- `GET /updates` — All posted updates (or merge into /)
- `GET /admin` — Protected by simple token query param (Mary only) — list all updates, mark reviewed/posted

Email flow on POST /submit:
1. Save to database
2. Send email via SMTP to Mary Ellen with form details
3. Redirect to /thanks with success message

Spam protection:
- Hidden honeypot field (bots fill it, humans don't)
- Rate limiting (flask-limiter or simple session-based)
- No CAPTCHA (family members are the audience, not the public)

### Styling

Keep it warm and family-oriented. Simple CSS, no framework. The whatsonlive-marketing site uses basic templates with Tailwind-like utility classes in the CSS — do the same here. Nothing fancy, just readable and pleasant.

---

## 4. MIGRATION PLAN

### Step 1: Create the new project
- New repo: `mohns-simple` or just rebuild `mohns` with a new branch
- Or better: keep both repos, build the new one separately

### Step 2: Build it
- app.py, templates, SQLite schema
- Test locally
- Email integration (env-driven)

### Step 3: Deploy
- Push to GitHub
- Connect mohns repo on Railway (or new repo)
- Point mohns.ca DNS to Railway

### Step 4: What to keep from existing repos
- `mohs_data.ged` (GEDCOM file in mohns repo) — archive for potential future tree feature
- `schema.sql` (people/families tables) — reference only, not used
- Everything else — scrap

### Step 5: Archive old repos
- Don't delete. Rename both repos or add a DEPRECATED.md to each pointing to the new one.
- `mohns` repo has actual work — the GEDCOM import and people data could be useful later if they want the tree back.

---

## 5. BUILD ORDER (when ready)

1. Create `~/Projects/mohns/` fresh (or new directory, decide repo strategy)
2. Write `app.py` with all routes
3. Write templates (base.html, index.html, submit.html, thanks.html, admin.html)
4. Write `static/style.css`
5. Write `requirements.txt` + `Procfile`
6. Set up SQLite schema (app creates it on first run)
7. Test locally
8. Push to GitHub
9. Deploy to Railway
10. Configure DNS for mohns.ca

Estimated build time: 2-3 hours.

---

## 6. WHAT NOT TO BUILD

- User accounts or login
- Family tree visualization
- Photo uploads / media storage
- Supabase or complex Postgres setup
- Next.js, React, TypeScript
- Blockchain, Web3, zero-knowledge proofs
- AI-powered features
- Audio/video recording
- Book generation
- Reunion planning tools
- Search, Elasticsearch
- Redis caching layer
- Docker compose
- Node.js build pipeline
- Gamification, badges, streaks
- Admin dashboards with analytics

If Mary Ellen later asks for any of these, we revisit. For now: form, email, list of updates. Done.
