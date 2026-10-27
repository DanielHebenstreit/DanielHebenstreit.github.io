# Daniel Hebenstreit — personal academic website

A dependency-free static website designed for GitHub Pages. The visual language deliberately keeps the restrained academic character of the original prototype: a paper-like canvas, serif headings, quiet blue accents, editorial photography, and conventional publication listings.

## Preview locally

From this directory, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. A local server is recommended because the reading page fetches its data from a JSON file; browsers often block that request when an HTML file is opened directly from disk.

No installation or build step is required.

## Deploy to GitHub Pages

This directory is intended to be the root of its own GitHub repository.

1. Create an empty repository on GitHub.
2. Commit the contents of this directory, including `.github/workflows/deploy.yml`.
3. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Push to the `main` branch. The included workflow uploads the static files and deploys them.

All links and asset paths are relative, so the site works both at `username.github.io` and under a repository path such as `username.github.io/repository-name/`.

## Update content

- General biography and homepage highlights: edit `index.html`.
- Research interests and publications: edit `research.html`.
- Competitions and Data Team material: edit `competitions.html`.
- Shared colors, typography, spacing, and responsive behavior: edit `assets/css/styles.css`.
- Selected photographs: replace files in `assets/images/website/` while retaining the filenames, or update the relevant image paths and `width`, `height`, and `alt` text.

### Add a reading note

Edit `assets/data/reading-notes.json`. Each entry uses this shape:

```json
{
  "title": "Paper title",
  "authors": "Author One, Author Two",
  "url": "https://example.org/paper",
  "area": "Mechanistic Interpretability",
  "dateRead": "October 2026",
  "summary": "A concise, factual summary.",
  "thoughts": "Personal observations or questions.",
  "interest": "High"
}
```

Keep entries inside the top-level JSON array, separated by commas. HTML markup is intentionally not supported in this file.

## Publication checklist

- Confirm permission from identifiable Data Team members before publishing the group photograph and collage.
- Confirm permission or applicable event-photo rights for the Paris and LEC award images.
- A CV is intentionally not included. Prepare a public-safe version before adding one.

## Project structure

```text
site/
├── .github/workflows/deploy.yml
├── assets/
│   ├── css/styles.css
│   ├── data/reading-notes.json
│   ├── images/website/
│   ├── js/
│   └── favicon.svg
├── index.html
├── research.html
├── competitions.html
├── reading.html
└── README.md
```
