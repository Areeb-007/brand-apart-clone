# Admin CMS for Categories & Subcategories — Design

## Context

The site currently serves its Category/Subcategory pages (`/services/[slug]` and
`/services/[slug]/[piece]`) from two static TypeScript files —
`lib/categories.ts` and `lib/subcategories.ts`. Every content change (new
category, new subcategory, copy edits, colors, charm images) currently
requires a code change.

The goal: let a single admin add/edit/delete categories and subcategories
(and their charms, images, portfolio videos, copy) through a web UI, backed
by a real database — while still allowing individual categories to be
hand-built, custom React components when the generic template doesn't fit
(the admin flags this; a developer still has to write the component).

The site is deployed on **Vercel** today; AWS (unspecified service) is a
possible future host. This design is chosen so it works unchanged on either.

## Decisions

| Area | Decision |
|---|---|
| Database | PostgreSQL, via a serverless-friendly provider (Neon / Supabase / Vercel Postgres) — zero infra setup now, swappable to AWS RDS later with no code change (just a connection string) |
| ORM | Prisma |
| File storage | AWS S3 (bucket-only use of AWS; independent of where the app itself runs) |
| Admin auth | Single shared login (env-configured username + bcrypt password hash), signed httpOnly session cookie, no user table |
| Image processing | None server-side — admin uploads already-cropped/transparent PNGs; app stores and serves as-is |
| Data model | Two tables, `Category` and `Subcategory` (not a single self-referencing table) — their field sets diverge too much (credits/testimonial vs. igName/bottomLine/charms/portfolioVideos) for a shared-columns table to stay clean |
| Custom template escape hatch | Code-level registry (`slug → Component`), checked before the DB-driven generic renderer. The category still gets a DB row (for nav listing/ordering) with `usesCustomTemplate = true`; the admin UI hides the content-editing form for it |
| Rendering | Server Components fetch from Prisma; admin saves call `revalidatePath` so live pages update immediately without a redeploy |
| Migration | One-time script inserts today's static data into the DB as-is; existing `/public` asset files keep being served from their current paths (no re-upload) — only new admin uploads go through S3 |

## Data model (Prisma schema, conceptual)

```prisma
model Category {
  id                 String   @id @default(cuid())
  slug               String   @unique
  name               String
  tagline            String
  description        String
  overview           String
  cover              String
  accent             String
  credits            Json     // [{ role, name }]
  testimonial        Json     // { quote, author, role, photo }
  nextSlug           String   // plain slug reference, same as today — not a
                                // real FK; a typo just means a dead "next"
                                // link, easy to catch with ~6 admin-managed rows
  usesCustomTemplate Boolean  @default(false)
  order              Int      @default(0)
  subcategories      Subcategory[]
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}

model Subcategory {
  id              String   @id @default(cuid())
  categoryId      String
  category        Category @relation(fields: [categoryId], references: [id])
  slug            String
  name            String
  gridLabel       String
  igName          String
  igUrl           String
  tagline         String
  bottomLine      String
  services        Json     // string[]
  description     Json     // string[] paragraphs
  bg              String
  logo            String?
  cover           String
  portfolioVideos Json?    // string[] URLs
  charms          Json?    // string[] URLs (replaces today's charmsDir+charmCount convention —
                            // S3 uploads give arbitrary URLs directly, no naming convention needed)
  order           Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([categoryId, slug])
}
```

## Admin auth

- `ADMIN_USERNAME` / `ADMIN_PASSWORD_HASH` env vars — no database table.
- `POST /admin/login` verifies the submitted password against the hash
  (bcrypt), then sets a signed, httpOnly, secure cookie (JWT via `jose`, or
  `iron-session`) as the session.
- `middleware.ts` guards every `/admin/**` route (except `/admin/login`),
  redirecting to login if the cookie is missing or invalid.

## Admin UI & API

- `/admin` — dashboard: list of categories (with order, custom-template flag)
- `/admin/categories/[id]` — edit a category's fields; "Subcategories" list
  nested below with add/edit/delete
- `/admin/categories/[id]/subcategories/[subId]` — edit one subcategory
- Route handlers under `/admin/api/categories`, `/admin/api/subcategories`,
  `/admin/api/uploads` for CRUD + file uploads — all behind the same session
  check as the admin pages

**File upload flow** (needed because portfolio videos can be 10MB+, over
typical serverless function body-size limits):
1. Admin picks a file in the form.
2. Client asks `/admin/api/uploads` for a presigned S3 PUT URL.
3. Browser uploads the file **directly to S3** using that URL (bypasses the
   Next.js server entirely for the heavy bytes).
4. The resulting public S3 URL is what gets saved into the category/
   subcategory record.

## Custom-template escape hatch

```ts
// lib/customCategoryTemplates.tsx
export const CUSTOM_CATEGORY_COMPONENTS: Record<string, ComponentType<{ category: Category }>> = {
  // 'some-slug': SomeHandBuiltComponent,
}
```

`app/services/[slug]/page.tsx` checks this map first. If the slug is
registered, it renders that component directly — completely bypassing the
generic DB-driven template, exactly like today's hand-built pages. Otherwise
it fetches the `Category` (+ its `Subcategory` rows) from the DB and renders
the shared generic template.

Adding a custom category is still a two-step, developer-involved process:
the admin creates the DB row (name/slug/order, `usesCustomTemplate = true`)
so it shows up correctly in navigation, and a developer writes + registers
the component. The admin UI shows "This category uses a custom design — ask
a developer to edit its page" instead of a content form for that row.

## Migration of existing content

A one-time script (`scripts/migrate-static-to-db.ts`) reads the current
`CATEGORIES` / `SUBCATEGORIES` arrays and inserts matching rows via Prisma,
preserving slugs and order. It's run once, locally, against the new
database — not part of the running app. Existing image/video files under
`/public` keep their current paths as the stored URL values; nothing gets
re-uploaded to S3 retroactively. Only new admin-uploaded assets go through
the S3 flow above.

All 6 of today's categories (including all 8 Video Editing subcategories)
migrate as plain DB-driven rows with `usesCustomTemplate = false` — they
already render through the shared generic components (`CategoryDetail.tsx`
/ `SubcategoryDetail.tsx`), so nothing about them needs to become "custom."
The custom-template escape hatch is for a *future* category only.

## Out of scope (for this pass)

- Multiple/named admin accounts, roles, or audit trails
- Server-side image processing (cropping to content, background removal)
- Automatic migration of existing `/public` assets into S3
