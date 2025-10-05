# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with **HonoX** (a meta-framework for Hono) and deployed to **Cloudflare Workers**. The blog uses Vite for building, MDX for blog posts, and Biome for linting/formatting.

## Tech Stack

- **Framework**: HonoX (Hono + file-based routing)
- **Runtime**: Cloudflare Workers
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Styling**: TailwindCSS
- **Content**: MDX with frontmatter
- **Type Checker**: TypeScript (native TypeScript compiler via `tsgo`)
- **Linter/Formatter**: Biome

## Development Commands

```bash
# Start development server (with network access via --host)
bun dev

# Build the project (runs client build first, then SSG)
bun run build

# Preview the built site using Wrangler
bun run preview

# Deploy to Cloudflare Workers
bun run deploy

# Format code with Biome
bun run format

# Lint code with Biome
bun run lint

# Format and lint (with auto-fix)
bun run check

# CI check (no auto-fix)
bun run check:ci

# Type check
bun typecheck

# Create a new blog post (interactive)
bun run create:post

# Update RSS feed
bun run update-rss
```

## Architecture

### Build Process

The build uses a dual-mode Vite configuration (`vite.config.ts:14-41`):

1. **Client mode** (`--mode client`): Builds only the CSS assets (`/app/style.css`)
2. **Server mode** (default): Builds the full application with HonoX SSG

Build command: `vite build --mode client && vite build`

### Application Structure

```
app/
├── server.ts          # HonoX app entry point
├── client.ts          # Client-side hydration entry
├── routes/            # File-based routing (HonoX convention)
│   ├── _renderer.tsx  # Layout renderer with meta tags, header, footer
│   ├── index.tsx      # Home page with post listing
│   └── posts/         # Blog posts as .mdx files
├── components/        # Server components
├── islands/           # Interactive client components (HonoX islands)
├── libs/              # Utilities and plugins
│   ├── posts/         # Post generation scripts
│   ├── rss/           # RSS feed utilities
│   └── vite-remark-toc-plugin.ts  # Custom rehype plugin for TOC
├── constants/         # App constants (links, etc.)
└── hooks/             # React hooks
```

### Key Concepts

- **HonoX Routing**: File-based routing under `app/routes/`. Each file exports a default component/handler.
- **Islands Architecture**: Client-interactive components live in `app/islands/` and are hydrated on the client.
- **MDX Posts**: Blog posts in `app/routes/posts/*.mdx` with frontmatter (title, date, description, published, ogImage).
- **SSG**: Uses `@hono/vite-ssg` to pre-render pages at build time.
- **Custom Rehype Plugin**: `vite-remark-toc-plugin.ts` auto-generates a table of contents from h2/h3 headings.

### Post Format

Blog posts use MDX with the following frontmatter structure:

```yaml
---
title: "Post Title"
emoji: "😀"
description: "Post description"
ogImage: "/ogp/profile-image.png"
date: "YYYY/MM/DD"
published: true
---
```

Posts are displayed on the home page (`app/routes/index.tsx:27-141`) and filtered by `published` flag (WIP posts shown in dev mode only).

### MDX Processing Pipeline

MDX files are processed with the following plugins (configured in `vite.config.ts:32-36`):

1. **remark-frontmatter**: Parse YAML frontmatter
2. **remark-mdx-frontmatter**: Expose frontmatter as exports
3. **rehype-highlight**: Syntax highlighting with highlight.js
4. **rehypeTOC**: Custom plugin to generate table of contents

### Deployment

- **Platform**: Cloudflare Workers
- **Config**: `wrangler.toml` with assets directory pointing to `./dist`
- **CI/CD**: GitHub Actions workflow (`.github/workflows/pull_request.yml`) runs on PRs:
  - Installs dependencies with Bun
  - Builds project
  - Type checks with `tsgo`
  - Runs Biome checks
  - Deploys preview to Cloudflare Workers
  - Posts preview URL as PR comment

## Common Tasks

### Creating a New Blog Post

Run `bun run create:post` and follow the interactive prompts. This will:
1. Ask for title, description, and optional filename
2. Generate a new `.mdx` file in `app/routes/posts/` from `app/libs/posts/template.mdx`
3. Pre-fill frontmatter with current date

### Modifying the Layout

Edit `app/routes/_renderer.tsx` which contains:
- HTML head with meta tags (OG, Twitter cards)
- Header with site title and links
- Footer
- Global style imports

### Adding a New Route

Create a new file in `app/routes/` following HonoX conventions:
- `app/routes/foo.tsx` → `/foo`
- `app/routes/foo/bar.tsx` → `/foo/bar`
- `app/routes/[slug].tsx` → Dynamic route

### Testing Changes Locally

1. `bun dev` - Start dev server
2. `bun run preview` - Preview production build with Wrangler
3. `bun typecheck` - Verify TypeScript types
4. `bun run check` - Format and lint

## Type Checking Notes

This project uses `tsgo` (native TypeScript compiler) instead of `tsc`. The `tsconfig.json` enables `isolatedDeclarations` mode for faster type checking.

## Important Files

- `vite.config.ts`: Dual-mode build configuration
- `app/server.ts`: HonoX app entry point
- `app/routes/_renderer.tsx`: Layout wrapper with meta tags
- `app/routes/index.tsx`: Home page with yearly post aggregation
- `app/libs/vite-remark-toc-plugin.ts`: TOC generation plugin
- `wrangler.toml`: Cloudflare Workers configuration
