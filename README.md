# Picsum Explorer

An airy React + Vite experience for browsing Lorem Picsum’s open photo feed. The UI leans into cream tones, fluid typography, and tactile cards so every “Next” click feels like flipping through a curated gallery.

https://github.com/user-attachments/assets/fd2a0c18-e50a-4b36-a715-444c347b228a

## Features

- **Live photo feed** – Fetches 20 shots per page from the public `https://picsum.photos/v2/list` API via Axios.
- **Loading shimmer** – Minimal spinner + copy keeps the layout balanced while new assets stream in.
- **Cream aesthetic** – Warm gradients, Playfair/Inter typography, and soft shadows for a premium editorial feel.
- **Responsive grid** – Auto-fit card layout adapts smoothly from phones to large monitors.
- **Accessible cards** – Each author card is a semantic link with alt text, lazy-loaded imagery, and call-to-action badge.
- **Sticky pagination** – Frosted-glass control pill stays anchored near the viewport bottom for quick navigation.

## Tech Stack

| Layer    | Tools |
|----------|-------|
| Framework | React 19 + Vite 7 |
| Styling  | Tailwind CSS 4 (utility-first) + custom CSS variables |
| Data     | Axios client consuming Lorem Picsum |
| Quality  | ESLint 9 with React Hooks + React Refresh plugins |

## Getting Started

```bash
# install dependencies
npm install

# start the dev server on http://localhost:5173
npm run dev

# lint the project
npm run lint

# production build & preview
npm run build
npm run preview
```

## Project Structure

```
src/
├─ App.jsx          # Layout shell, fetching logic, pagination
├─ components/
│  └─ Card.jsx      # Author card with hover states & metadata
├─ index.css        # Tailwind import + global gradient + fluid fonts
└─ main.jsx         # React entry point
```

## Design Notes

- Typography scales use CSS `clamp()` variables (`.fluid-headline`, `.fluid-subhead`) defined in `index.css`.
- Card styles rely on Tailwind utilities; future palette tweaks should update the class tokens in `App.jsx` + `Card.jsx`.
- The background gradient and font imports live in `index.css`, making it the quickest place to re-theme the app.

## API Reference

- `GET https://picsum.photos/v2/list?page={page}&limit=20`
  - Returns: `{ id, author, width, height, url, download_url }[]`
  - Rate limits are generous, but consider caching if you poll aggressively.

## Roadmap Ideas

- Add search/filter by author or dominant color.
- Support masonry layout toggle or infinite scroll.
- Surface download buttons with direct resolution options.

Enjoy the gallery! Contributions and design experiments welcome. ✨
