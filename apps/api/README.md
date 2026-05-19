# Ketovore API

This is the first backend foundation for Ketovore AI.

## Current Scope

The backend currently includes:

- NestJS
- TypeScript
- `/api/v1/health` health check endpoint
- `.env.example` for future environment variables

## Run Locally

Install dependencies:

```powershell
npm install
```

Start the API:

```powershell
npm run start:dev
```

Open:

```text
http://localhost:3000/api/v1/health
```

Expected response:

```json
{
  "service": "ketovore-api",
  "status": "ok",
  "timestamp": "2026-05-18T00:00:00.000Z"
}
```

## Next Step

Add Prisma and the first PostgreSQL schema.
