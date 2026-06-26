# Architecture — how Xíu Café is built

This app is deliberately split into **layers**. Each layer has one job, and
each "fact" lives in exactly one place. When you (or Claude Code) want to change
something, this map tells you the single file to open.

```
  BROWSER (what the customer sees)
        │
   ┌────▼─────────────────────────────────────────┐
   │  FRONTEND  — src/app/*/page.tsx, components/  │   pages & UI only
   └────┬─────────────────────────────────────────┘
        │  calls via fetch()
   ┌────▼─────────────────────────────────────────┐
   │  API        — src/app/api/**/route.ts         │   the backend endpoints
   └────┬─────────────────────────────────────────┘
        │  calls
   ┌────▼─────────────────────────────────────────┐
   │  LOGIC      — src/lib/*.ts                     │   the rules of the business
   └────┬─────────────────────────────────────────┘
        │  reads/writes
   ┌────▼─────────────────────────────────────────┐
   │  DATA       — prisma/schema.prisma            │   the database shape
   └───────────────────────────────────────────────┘
```

The rule: a layer only ever talks to the layer directly below it. The UI never
touches the database directly; it goes through the API, which goes through the
logic, which goes through the data layer.

---

## Where everything lives

### DATA layer — `prisma/`
- `schema.prisma` — **the single source of truth** for every table and field.
  Users, menu items, orders, points transactions. Change data shape here only.
- `seed.ts` — the starting menu. Edit this list to change launch drinks.

### LOGIC layer — `src/lib/` (the backend brain, no UI, no HTTP)
| File | Owns | Edit it when… |
|------|------|----------------|
| `db.ts` | the database connection | (rarely) |
| `auth.ts` | hashing & checking passwords | changing password rules |
| `session.ts` | who is logged in (cookies) | changing how login works |
| `points.ts` | **all loyalty rules** | changing earn rate, signup bonus, redemption |
| `orders.ts` | turning a cart into a saved order | changing how orders are placed |

> Want a double-points weekend? Change **one number** in `points.ts`. Nothing
> else in the app needs to know.

### API layer — `src/app/api/`
Thin endpoints. They check who's logged in, call a logic function, return JSON.
- `auth/register`, `auth/login`, `auth/logout` — accounts
- `me` — returns the current user
- `orders` — GET your orders, POST a new one

### FRONTEND layer — `src/app/` + `src/components/`
- `app/page.tsx` — menu & ordering (home)
- `app/login`, `app/signup` — account forms
- `app/account/page.tsx` — points balance + order history
- `components/Nav.tsx` — top bar, shows login state
- `components/MenuBoard.tsx` — the cart + "place order" UI
- `app/globals.css` — all styling and brand colors

---

## Two principles we keep

1. **Money is integers.** Prices are stored in cents (`priceCents`), never as
   decimals. No floating-point rounding bugs on someone's order total.
2. **Never trust the browser on price or identity.** When an order comes in, the
   server looks up the real price from the database and the real user from the
   login cookie. The browser only says *which* drink and *how many*. This is in
   `src/lib/orders.ts` — it's the most security-sensitive file, so it's isolated.

---

## How to add a feature (the pattern)

Say you want **redeeming points for a discount**:
1. **Logic:** add a `redeemPoints()` function in `src/lib/points.ts`.
2. **API:** add a `route.ts` that calls it.
3. **Frontend:** add a button on `account/page.tsx` that hits that route.

Data → Logic → API → Frontend, bottom-up. Every feature follows the same path,
which is what keeps the codebase navigable as it grows.
