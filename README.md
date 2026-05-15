# Cooling Care — Policy Note Website

A static, single-page presentation of the policy note _"Cooling Care: Shade on the Last Mile — Regreening Rural Health Clinics in a Hotter Africa."_ Designed to be hosted on GitHub Pages.

## What's in this folder

| File | Purpose |
|---|---|
| `index.html` | The page itself. All structure and content. |
| `styles.css` | All styling. Edit colours and typography in the `:root` block at the top. |
| `chart.js` | The interactive scatter plot. Uses Plotly.js from CDN. |
| `Cooling_Care_Policy_Note.docx` | Downloadable Word version, linked in the page footer. |
| `Cooling_Care_Policy_Note.pdf` | Downloadable PDF version, linked in the page footer. |

No build step. No dependencies to install. Open `index.html` in a browser and it works.

---

## Deploying to GitHub Pages (5 minutes)

1. **Create a new repository on GitHub.** Any name; `cooling-care` is fine. Make it public.

2. **Upload these files.** Either:
   - Drag and drop the contents of this folder into the GitHub web upload, or
   - From a terminal:
     ```bash
     git init
     git add .
     git commit -m "Initial site"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<your-repo>.git
     git push -u origin main
     ```

3. **Enable Pages.** In the repo, go to **Settings → Pages**. Under **Source**, choose **Deploy from a branch**, pick `main` (or `master`) and folder `/ (root)`. Save.

4. **Wait ~1 minute.** GitHub builds the site. The URL appears at the top of the Pages settings — typically `https://<your-username>.github.io/<your-repo>/`.

That's it. Any future `git push` to `main` redeploys automatically.

### Optional: custom domain
If you have a domain (e.g. `coolingcare.org`), add a file called `CNAME` containing only the domain (`coolingcare.org`), commit and push, then point your DNS at GitHub's Pages servers. Full instructions are in GitHub's docs under "Custom domains".

---

## Editing the page

### Text
All copy lives directly in `index.html`. Open it in any text editor and edit the prose between the `<p>` tags. References are at the bottom in an `<ol>` list. The footnote-style numbered links are wired up via `id="ref-..."` attributes — keep the IDs consistent if you renumber.

### Colours and typography
Open `styles.css` and edit the `:root` block at the very top. Every colour and font is declared there as a CSS variable. Change `--forest`, `--terracotta`, etc., and the change propagates through the whole design.

### Replacing or updating the dataset
The chart uses the real clinic-level dataset (n = 220 rural primary care facilities in the Dodoma Region, Tanzania). The data lives as a literal JavaScript array in `chart.js`:

```js
const DATA = [
  { ndvi: 0.281, lst: 43.967 },
  { ndvi: 0.265, lst: 46.833 },
  // ... 218 more
];
```

To swap in a different dataset (e.g. a second region, an updated acquisition date), open `chart.js` and replace the entire `DATA = [...]` block. The regression line, r value, axis range, and tooltip labels all recompute automatically from this array — no other changes required.

### Chart styling
Tooltip wording, axis labels, and the highlighted zones at the corners of the plot are all configured in `chart.js`. Search for the strings to find them; each is well-commented.

---

## Notes on attribution

- The note currently credits the Dodoma analysis as _"authors' analysis, 2026."_ Edit that placeholder in both `index.html` (figure caption) and the body paragraph above the chart when the final sender is decided.
- MetaMeta is deliberately kept out of the body text per the brief. The Green Roads Toolkit is cited institutionally to ADB.

## Browser support

Tested in current Chrome, Firefox, Safari, and Edge. Falls back gracefully on older browsers (the chart will still render; some CSS variable fonts revert to system serif).

## Print

A print stylesheet is included. `Ctrl/Cmd+P` produces a clean black-and-white version of the page suitable for handouts.
