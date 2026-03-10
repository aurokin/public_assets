# simc_guides

Static GitHub Pages guide for a decoded Devastation Evoker SimulationCraft APL.

## Contents

- `index.html`: single-page guide with target-count tabs
- `styles.css`: editorial/tactical layout and diagram styling
- `main.js`: tab state and SVG diagram rendering
- `.github/workflows/deploy.yml`: GitHub Pages deployment via Actions

## Publish

1. Create an empty GitHub repository named `simc_guides`.
2. Add the remote:

```bash
git remote add origin git@github.com:<your-user>/simc_guides.git
```

3. Push the `main` branch:

```bash
git push -u origin main
```

4. In GitHub, open `Settings -> Pages`.
5. Set `Source` to `GitHub Actions`.
6. The workflow will publish the root static site automatically on push.

## Notes

- The guide content is based on the default SimC Devastation Evoker APL, not Assisted Combat.
- The current guide is tailored to the decoded build from this talent string:

```text
CsbBPJc41CfcseY0baneJ1IHrBAAAAAAAAAAgZmZgZ8AzgBGGjZaMzMNjx2MmZmZGzMzAmZmxYmZbmZgBGDWglxox2AyMBYDzgZGMMA
```
