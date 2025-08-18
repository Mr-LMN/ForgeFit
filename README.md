
# ForgeFit — The Blind PT (PWA)
A mobile-first, offline-capable training app with a 12-week plan, Olympic-lift skill progressions, and a GoWod-style HIIT generator.

## Run locally
Just open `index.html` in a modern browser. For full PWA features (install, offline), serve via any static server.

```bash
# python 3.9+
python -m http.server 8080
# then open http://localhost:8080
```

## Deploy (1‑click-ish)
- **Netlify**: Drag the folder in. Or `netlify deploy --prod` (static site).
- **Vercel**: `vercel` from the folder, or drag-drop in the dashboard.
- **GitHub Pages**: Create a repo, push, then enable Pages (main branch, root).

## Customize branding
Replace files in `assets/brand/` and the PWA icons in `assets/icons/`.
