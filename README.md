# Allie's BME Portfolio — Setup & Content Guide

A 2-page portfolio site (Home + Projects) styled like an engineering spec sheet, in
shades of brown. This file tells you exactly what to do to get it live on GitHub Pages
and where every photo/video/file goes.

---

## 1. Put it on GitHub Pages

1. Create a new repository on GitHub. Two naming options:
   - `yourusername.github.io` → site becomes live at `https://yourusername.github.io/`
   - any other name, e.g. `bme-portfolio` → site becomes live at
     `https://yourusername.github.io/bme-portfolio/`
2. Upload **all files in this folder** (keeping the folder structure intact) to that repo.
   Easiest way: on the repo page, click **Add file → Upload files**, drag the whole
   contents of this folder in, and commit.
   (If you're comfortable with git: `git init`, `git add .`, `git commit -m "portfolio"`,
   `git remote add origin <your repo url>`, `git push -u origin main`.)
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**, branch **main**,
   folder **/(root)**. Save.
5. Wait 1–2 minutes, then visit the URL from step 1. Refresh a couple times if it's not
   there yet — first deploys can take a few minutes.

Every time you push a change (new photo, edited text), the live site updates
automatically within a minute or two.

---

## 2. Folder structure — where everything goes

```
index.html                     ← Home page
projects.html                  ← Projects landing page (2 cards)
vein-finder.html               ← Vein finder project detail page
hearing-aid.html                ← Hearing aid project detail page
css/style.css                  ← All styling / the brown theme (colors are defined
                                  as variables at the very top if you want to retint)
js/main.js                     ← Gallery + lightbox + placeholder behavior (you
                                  shouldn't need to touch this)
assets/
  img/
    profile/
      profile.jpg              ← YOUR PORTRAIT — home page
    thumbnails/
      vein-finder-thumb.jpg    ← small preview image, Projects page card
      hearing-aid-thumb.jpg    ← small preview image, Projects page card
    vein-finder/
      cad/                     ← all CAD angle screenshots go here
        cad-1.jpg, cad-2.jpg, cad-3.jpg, cad-4.jpg, ...
      construction/            ← build progress + final device photos
        build-1.jpg, build-2.jpg, final-1.jpg, final-2.jpg, ...
    hearing-aid/
      poster/
        poster.jpg             ← your conference poster, high-res
      circuits/
        circuit-1.jpg, circuit-2.jpg, circuit-3.jpg, ...
      presenting/
        presenting.jpg         ← photo of you presenting the poster
  video/
    vein-finder-video-essay.mp4  ← your video essay
  resume/
    resume.pdf                 ← your résumé
```

**Every image and video path above is already wired up in the HTML.** You don't need to
edit any code to add the *first* copy of each file — just drop the file in with the
exact name shown, and it appears. Until you do, every spot shows a labeled placeholder
box telling you the exact path it's waiting on, so you'll always know what's missing
just by looking at the live site.

---

## 3. Adding MULTIPLE CAD angles (or extra construction/circuit photos)

The CAD gallery, construction gallery, poster gallery, and circuit gallery are all built
from a short list of filenames at the bottom of each page, instead of repeated HTML. This
means adding a 5th, 6th, 10th CAD angle is a two-step process and nothing else:

1. Drop the new image file into the matching folder (e.g.
   `assets/img/vein-finder/cad/cad-5.jpg`).
2. Open `vein-finder.html` in a text editor, scroll to the bottom `<script>` block, and
   add the filename to the list:

   ```js
   const caseAngles = [
     'cad-1.jpg',
     'cad-2.jpg',
     'cad-3.jpg',
     'cad-4.jpg',
     'cad-5.jpg'   // ← just add a line like this
   ];
   ```

The gallery grid resizes itself automatically — no need to touch the CSS. The same
pattern applies to `constructionPhotos` (vein-finder.html) and `posterImages` /
`circuitImages` (hearing-aid.html).

Recommended image sizes: 1200–1800px on the long edge is plenty for web — no need to
upload full-resolution camera/render exports, since that just slows the site down.

---

## 4. The video essay

Drop your file in as exactly:

```
assets/video/vein-finder-video-essay.mp4
```

It must be an `.mp4` for the widest browser support. If your export is from a different
app and comes out as `.mov`, either re-export as `.mp4`, or rename the file **and** update
the `<source src="...">` path near the top of `vein-finder.html`.

**A note on file size:** GitHub has a 100MB per-file hard limit (and pages load slowly
over ~20–30MB of video). If your export is large, compress it first. Two easy options:

- **HandBrake** (free, drag-and-drop, handbrake.fr) — use the "Fast 1080p30" preset.
- Or if you have `ffmpeg`: `ffmpeg -i input.mov -vcodec libx264 -crf 26 vein-finder-video-essay.mp4`

I also added a `poster` attribute on the video player pointing to
`assets/img/vein-finder/construction/video-poster.jpg` — an optional still frame shown
before the video plays. Drop any photo in there with that name, or ignore it (the
browser will just show the first video frame instead).

---

## 5. Text you need to fill in

- **`index.html`** — About Me paragraph is drafted from what I know about your work; read
  it over and adjust the voice/details. There's a second empty paragraph slot if you
  want to add something more personal. Also replace:
  - the LinkedIn URL (currently a placeholder `#`-style link)
  - `Allie [Last Name]` in the title block
- **`vein-finder.html`** — the "Reasoning & Background" section has a dashed placeholder
  box. Delete it and paste your mini essay in as plain paragraphs
  (`<p>your text</p>` for each paragraph).
- **`hearing-aid.html`** — one bracketed sentence to fill in about the team's goal and
  your individual contribution.

---

## 6. Retinting or restyling

All colors live as CSS variables at the top of `css/style.css` under `:root`. Change a
hex value there and it updates everywhere (e.g. `--copper` is the rust/copper accent
used for links and highlights, `--paper` is the background). Fonts (Zilla Slab for
headings, Inter for body text, IBM Plex Mono for the technical labels) are also loaded
in that same file if you ever want to swap them.

---

Questions or something breaks? The most common issue is a filename mismatch — the path
in the HTML/JS has to match the actual filename exactly, including capitalization and
`.jpg` vs `.jpeg` vs `.png`.
