# AGENT.md - Coding Agent Guidelines

## Build/Test Commands
- **Install all dependencies**: `npm run install:all`
- **Development**: `npm run dev` (starts both frontend:3000 and backend:8000)
- **Build**: `npm run build` (builds both frontend and backend)
- **Test all**: `npm test` or `npm run test:frontend && npm run test:backend`
- **Test single (frontend)**: `cd frontend && npm test -- ComponentName.test.tsx`
- **Test single (backend)**: `cd backend && npm test -- filename.test.js`
- **Lint**: `npm run lint` (runs both frontend and backend)
- **Type check**: `cd frontend && npm run type-check`
- **Database**: `npm run db:migrate && npm run db:seed`

## Architecture & Structure
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + React Query (port 3000)
- **Backend**: Node.js + Express + PostgreSQL + Redis (port 8000)
- **Database**: PostgreSQL (primary), Redis (cache/sessions), optional Elasticsearch
- **File storage**: AWS S3/Google Cloud/MinIO for media uploads
- **Key APIs**: Authentication (JWT), family tree CRUD, story collection, file upload
- **Testing**: Jest for both frontend and backend

## Code Style & Conventions
- **TypeScript**: Strict mode enabled, prefer interfaces over types
- **Imports**: Use path aliases (@/components, @/lib, @/utils) in frontend
- **Components**: PascalCase, functional components with TypeScript props
- **Files**: kebab-case for files, PascalCase for components
- **Colors**: Use Tailwind custom theme (primary, secondary, accent, success, warning, error)
- **Error handling**: Use try-catch blocks, proper HTTP status codes, toast notifications
- **Forms**: React Hook Form + Zod validation
- **State**: React Query for server state, Context for global client state
