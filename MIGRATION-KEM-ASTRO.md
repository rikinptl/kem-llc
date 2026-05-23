# KEM LLC optional Astro experiment (`kem-astro/`)

`kem-astro/` holds a Jetstream-derived Astro sandbox for **motion/UI reference** — it is **`gitignored`** (heavy `node_modules` / template tree). Restore tracking by deleting the matching line from **`.gitignore`** if you want it on GitHub.

**Production:** the marketing site deployed from this repo is the **React + Vite** app at the root (`npm run build` → **`dist`**), wired in root **`vercel.json`**.

## Commands (when you clone or keep `kem-astro/` locally)

```bash
cd kem-astro
npm install        # Node 22+ per upstream
npm run dev        # http://localhost:4321
npm run build
```

The former **`staging/jetstream-astro-template/`** checkout was removed locally to avoid doubling the upstream tree.
