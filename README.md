# Xíu Café — App

Full-stack web app for Xíu Café: menu, online ordering, customer accounts,
and a loyalty points system. Built to be extended cleanly — see
[`ARCHITECTURE.md`](./ARCHITECTURE.md) for the system map.

**Stack:** Next.js 14 (frontend + backend) · Prisma + SQLite (database) ·
TypeScript throughout. No build tooling to wrangle, deploys in one click.

---

## Run it locally (first time)

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install          # install dependencies
cp .env.example .env # create your local config
npm run setup        # create the database + load the menu
npm run dev          # start the app
```

Open **http://localhost:3000**. Sign up, place an order, watch points land in
your account. That's the whole loop working.

> If `npm run setup` is your very first run, it both creates the database and
> seeds the menu. After that, use `npm run dev` to start.

### Everyday commands
| Command | Does |
|---------|------|
| `npm run dev` | start the app for development |
| `npm run db:seed` | reload the menu from `prisma/seed.ts` |
| `npm run db:studio` | open a visual editor for the database |
| `npm run build` | production build |

---

## What works today

- Customer **accounts** — sign up, log in, log out (passwords hashed, sessions in secure cookies)
- **Menu** served from the database
- **Online ordering** — add to cart, place order
- **Points** — earn on every order, 50-point signup bonus, balance + history on the account page

## Clear next steps (not built yet — by design)

These are deliberately left as clean extension points, not half-finished code:
- **Real payment** (Stripe) at checkout — orders are created but not charged yet
- **Redeeming** points for a discount (the rule already exists in `points.ts`)
- **Admin view** for staff to see incoming orders and mark them ready
- **Pickup location / time** selection tied to your pop-up schedule
- **Email or SMS** order confirmations

Each follows the same Data → Logic → API → Frontend pattern in `ARCHITECTURE.md`.

---

## Going to production

1. **Database:** SQLite is great for local dev. For a live site, switch to
   Postgres — in `prisma/schema.prisma` change `provider = "sqlite"` to
   `"postgresql"` and point `DATABASE_URL` at a hosted Postgres (Supabase and
   Neon both have free tiers). Run `npm run db:push` once against it.
2. **Secret:** set a real `SESSION_SECRET` (run `openssl rand -base64 32`).
3. **Deploy:** push to GitHub and import the repo on **Vercel** (made by the
   Next.js team — zero config). Add the two env vars in the Vercel dashboard.

---

## Working with the team

This is the shared source of truth, so: put it in one GitHub repo, add all
co-founders as collaborators, and make changes through normal commits + pushes.
To change anything, open the folder in VS Code and tell Claude Code what you
want — the architecture doc tells it (and you) exactly which file to touch.
