# JobTrackr API

REST API for tracking job applications. Built with NestJS, Prisma, and PostgreSQL.

## Stack

NestJS • Prisma • PostgreSQL • JWT • Docker • Swagger

## Quick Start

```bash
# Install
npm install

# Setup .env
DATABASE_URL="postgresql://jobtrackr:jobtrackr@localhost:5432/jobtrackr_db"
JWT_SECRET=<generate-with-crypto>

# Start database
docker-compose up -d

# Run migrations
npx prisma generate
npx prisma migrate dev

# Start server
npm run start:dev
```

API: `http://localhost:3000`  
Docs: `http://localhost:3000/api`

## Endpoints

**Auth**

- `POST /auth/register` - Sign up
- `POST /auth/login` - Login

**Users** (protected)

- `GET /users/me` - Get profile

**Applications** (protected)

- `GET /applications?page=1&limit=10` - List (paginated)
- `GET /applications/:id` - Get by ID
- `POST /applications` - Create
- `PUT /applications/:id` - Update
- `DELETE /applications/:id` - Soft delete

## Commands

```bash
npm run start:dev          # Dev server
npx prisma studio          # DB GUI
docker-compose logs -f     # View logs
```

## License

MIT
