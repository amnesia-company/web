<<<<<<< HEAD

# Amnesia

Client-server system.

## Tech Stack

**Frontend:**

- TypeScript
- React 19
- Vite
- Vike (SSR, routing)
- SCSS Modules
- Redux Toolkit
- TanStack Query
- i18next
- Vitest
- Playwright

**Backend** _(in development):_

- Java
- Spring Boot

**Infrastructure:**

- Docker
- Docker Compose
- Nginx

## Environment Variables

Copy `.env.example` to `.env` and fill in the values.

| Variable         | Description                                |
| ---------------- | ------------------------------------------ |
| `SITE_URL`       | Public site URL                            |
| `SERVER_ADDRESS` | Game server address                        |
| `PORT`           | Frontend HTTP server port (default `3000`) |

## Quick Start

### 1. Clone

The project uses git submodules for frontend and backend:

```bash
git clone --recursive https://github.com/Bitsulov/Amnesia-server.git
cd Amnesia-server
```

If already cloned without `--recursive`:

```bash
git submodule update --init --recursive
```

### 2. Configure environment

```bash
cp .env.example .env
```

Fill in the values in `.env`.

### 3. Run

**Production** — optimised SSR build, Nginx on port `80`:

```bash
docker compose -f tools/docker/docker-compose.yml --env-file .env -p amnesia up --build -d
```

## Repository Structure

```
Amnesia/
├── frontend/          # React 19 SSR (git submodule)
├── backend/           # Java Spring Boot (git submodule, coming soon)
└── tools/
    └── docker/        # Docker Compose files, Nginx configs
```

## Submodules

| Submodule   | Repository                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------------- |
| `frontend/` | [Amnesia-server-frontend](https://github.com/Bitsulov/Amnesia-server-frontend)                  |
| `backend/`  | [Amnesia-server-backend](https://github.com/Bitsulov/Amnesia-server-backend) _(in development)_ |

=======

# web

This repository is used for web part of project and deploy

> > > > > > > d4f85789724596088981bbbe5e896bc043778259
