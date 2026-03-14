# Agent Instructions

## Package Manager
- None at the repo root
- Prefer direct edits to static files
- Do not add build tooling unless the task explicitly requires it

## Commit Attribution
- AI commits MUST include:
```text
Co-Authored-By: Codex GPT-5 <codex@openai.com>
```

## Key Conventions
- Store published artifacts under `artifacts/<slug>/`
- Keep changes scoped to the requested artifact
- Preserve root static hosting compatibility
- Prefer relative asset paths
- Use per-artifact `index.html`, `styles.css`, and `main.js` inside each artifact folder
- Keep the root `index.html` and `index.css` limited to the repo catalog page
- Treat `.github/workflows/*`, `.gitignore`, and `README.md` as repo-wide files

## Local Skills
- No repo-local skills discovered under this repository today
