# public_assets

Static public asset hosting repo for small, separate HTML/CSS/JS artifacts.

## Contents

- `index.html`: root asset index for published artifacts
- `index.css`: styling for the root asset index
- `artifacts/`: container for standalone published assets
- `artifacts/devoker_dung_build_early_test_simc_guide/index.html`: Devoker SimC guide
- `artifacts/devoker_dung_build_early_test_simc_guide/styles.css`: styling for the Devoker guide
- `artifacts/devoker_dung_build_early_test_simc_guide/main.js`: tab state and SVG diagram rendering
- `artifacts/tbc-hunter-rotation-guide/index.html`: TBC Hunter field guide
- `artifacts/tbc-hunter-rotation-guide/styles.css`: styling for the TBC Hunter guide
- `artifacts/tbc-hunter-rotation-guide/main.js`: calculator and guide behavior
- `.github/workflows/deploy.yml`: GitHub Pages deployment via Actions

## Publish

1. Create an empty GitHub repository named `public_assets`.
2. Add the remote:

```bash
git remote add origin git@github.com:<your-user>/public_assets.git
```

3. Push the `main` branch:

```bash
git push -u origin main
```

4. In GitHub, open `Settings -> Pages`.
5. Set `Source` to `GitHub Actions`.
6. The workflow will publish the root static site automatically on push.

## Notes

- Each artifact should stay self-contained under `artifacts/<slug>/`.
- Prefer local `index.html`, `styles.css`, and `main.js` inside each artifact folder.
- The Devoker guide content is based on the default SimC Devastation Evoker APL, not Assisted Combat.
- The current Devoker guide is tailored to the decoded build from this talent string:

```text
CsbBPJc41CfcseY0baneJ1IHrBAAAAAAAAAAgZmZgZ8AzgBGGjZaMzMNjx2MmZmZGzMzAmZmxYmZbmZgBGDWglxox2AyMBYDzgZGMMA
```
