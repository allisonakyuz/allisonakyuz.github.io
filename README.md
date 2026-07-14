# Allie's BME Portfolio, Setup & Content Guide

A 2-page portfolio site (Home + Projects) styled like an engineering spec sheet, in cool-toned
shades of brown with a Times New Roman type stack. This file tells you exactly what to do to get
it live on GitHub Pages, what's already filled in, and what's still missing.

---

## 1. Put it on GitHub Pages

1. Create a new repository on GitHub. Two naming options:
   - `yourusername.github.io`, your site becomes live at `https://yourusername.github.io/`
   - any other name, e.g. `bme-portfolio`, your site becomes live at
     `https://yourusername.github.io/bme-portfolio/`
2. Upload **all files in this folder** (keeping the folder structure intact) to that repo, either
   by dragging them into "Add file > Upload files" on the repo page, or with git if you're
   comfortable with the command line.
3. Commit straight to the **main** branch (no need for a separate branch for a solo portfolio).
4. In the repo, go to **Settings > Pages**. Under "Build and deployment," set **Source: Deploy
   from a branch**, branch **main**, folder **/(root)**. Save.
5. Wait 1 to 2 minutes, then visit the URL from step 1.

Every time you push a change, the live site updates automatically within a minute or two.

---

## 2. What's already filled in

- **Home:** your headshot, About Me text (Duffield College of Engineering, Integrative Design
  subteam, Clarius + Olea internships), résumé and LinkedIn buttons, both fully wired up.
- **Projects:** both cards, with real thumbnails and corrected descriptions.
- **Vein Finder:** your full capstone essay (with citations), a 5-image CAD gallery, and the full
  build journal video (19MB, a custom cover card instead of a random video frame).
- **Hearing Aid:** the About section, a clean high-resolution export of your actual poster file,
  3 circuit images (your schematic, the breadboard/multimeter testing photo, and a crop of the
  poster's electrical specifications section), and your presenting photo.

## 3. Still needed from you

1. **Construction and final build photos of the vein finder.** You mentioned you'll take these
   later. See section 5 below for exactly how to add them once you have them.

---

## 4. Folder structure, where everything goes

```
index.html                     Home page
projects.html                  Projects landing page (2 cards)
vein-finder.html               Vein finder project detail page
hearing-aid.html               Hearing aid project detail page
css/style.css                  All styling, the cool-brown theme (colors are variables
                                at the very top if you want to retint further)
js/main.js                     Gallery + lightbox + placeholder behavior
assets/
  img/
    profile/
      profile.jpg               Your headshot (filled in)
    vein-finder/
      cad/                      5 CAD renders (filled in), add more here anytime
      construction/             empty, add build/final photos here later
    hearing-aid/
      poster/
        poster.jpg               Clean export from your poster file (filled in)
      circuits/                  3 circuit images (filled in)
      presenting/
        presenting.jpg            Your presenting photo (filled in)
  video/
    vein-finder-video-essay.mp4  Full build journal video (filled in, 19MB)
  resume/
    resume.pdf                  Your résumé (filled in)
```

---

## 5. Adding more images later (CAD angles, construction photos, circuit shots)

Each gallery (CAD, construction, poster, circuits) is built from a short list of filenames at the
bottom of its page, instead of repeated HTML. To add a new photo:

1. Drop the file into the matching folder, e.g. `assets/img/vein-finder/construction/final-1.jpg`.
2. Open the page in a text editor, scroll to the bottom `<script>` block, and add the filename to
   the list, for example in `vein-finder.html`:

   ```js
   const constructionPhotos = [
     'final-1.jpg',
     'final-2.jpg'   // just add a line like this
   ];
   ```

The gallery grid resizes itself automatically, no need to touch the CSS. Recommended image size:
1200 to 1800px on the long edge is plenty for web.

---

## 6. Text you may still want to personalize

- **`index.html`**, there's a second, empty paragraph slot under the About Me text if you want to
  add something more personal (what you're looking for next, interests outside the lab, etc).

---

## 7. Retinting or restyling

All colors live as CSS variables at the top of `css/style.css` under `:root`. Change a hex value
there and it updates everywhere (`--copper` is the accent used for links and highlights, `--paper`
is the background). The main font is a Times New Roman stack; the small monospace labels (nav,
tags, captions) use IBM Plex Mono for the technical/drafting feel, both are also set at the top of
that file if you want to change them.

---

Questions or something breaks? The most common issue is a filename mismatch, the path in the
HTML/JS has to match the actual filename exactly, including capitalization and `.jpg` vs `.jpeg`
vs `.png`.
