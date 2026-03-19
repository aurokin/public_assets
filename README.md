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
- `artifacts/crown_of_the_cosmos_cast_timing_agent_convo/index.html`: rendered transcript page for the Crown of the Cosmos markdown artifact
- `artifacts/crown_of_the_cosmos_cast_timing_agent_convo/styles.css`: styling for the rendered transcript page
- `artifacts/crown_of_the_cosmos_cast_timing_agent_convo/main.js`: markdown loading and rendering behavior
- `artifacts/crown_of_the_cosmos_cast_timing_agent_convo/crown_of_the_cosmos_cast_timing_agent_convo.md`: preserved markdown transcript artifact
- `artifacts/warlock_demo_early_agent_convo/index.html`: rendered transcript page for the Warlock markdown artifact
- `artifacts/warlock_demo_early_agent_convo/styles.css`: styling for the rendered transcript page
- `artifacts/warlock_demo_early_agent_convo/main.js`: markdown loading and rendering behavior
- `artifacts/warlock_demo_early_agent_convo/warlock_demo_early_agent_convo.md`: preserved markdown transcript artifact
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
- Prefer local `index.html`, `styles.css`, and `main.js` inside each artifact folder when the artifact is an interactive page.
- Markdown-only artifacts are acceptable when the markdown file itself is the published deliverable.
- The Devoker guide content is based on the default SimC Devastation Evoker APL, not Assisted Combat.
- The current Devoker guide is tailored to the decoded build from this talent string:

```text
CsbBPJc41CfcseY0baneJ1IHrBAAAAAAAAAAgZmZgZ8AzgBGGjZaMzMNjx2MmZmZGzMzAmZmxYmZbmZgBGDWglxox2AyMBYDzgZGMMA
```
