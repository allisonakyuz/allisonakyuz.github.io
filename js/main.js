/* ============================================================
   Shared site behavior.

   1. buildGallery(): turns a plain array of filenames into a
      gallery grid. To add another CAD angle or photo, you only
      ever edit the array at the top of the page's own <script>
      block — never this file, never the HTML.

   2. Lightbox: click any gallery image to see it full-size.

   3. Placeholder fallback: any <img> that fails to load (because
      you haven't added the real file yet) is swapped for a
      dashed-border placeholder box that names the exact path
      it's expecting, so the site always tells you what's missing.
   ============================================================ */

function buildGallery(containerId, folder, filenames){
  const container = document.getElementById(containerId);
  if(!container) return;
  filenames.forEach(name => {
    const fig = document.createElement('figure');
    const img = document.createElement('img');
    img.src = folder + name;
    img.alt = name.replace(/\.[a-z]+$/i,'').replace(/[-_]/g,' ');
    img.loading = 'lazy';
    img.addEventListener('click', () => openLightbox(img.src));
    img.addEventListener('error', () => {
      fig.classList.add('placeholder-img');
      fig.style.aspectRatio = '4/3';
      fig.innerHTML = `<span style="padding:14px;display:block;">MISSING FILE<br>${folder}${name}</span>`;
    });
    const cap = document.createElement('figcaption');
    cap.textContent = name;
    fig.appendChild(img);
    fig.appendChild(cap);
    container.appendChild(fig);
  });
}

// Variant for transparent-background renders (CAD drawings): no crop,
// no card border, just the drawing and a caption underneath.
function buildCadGallery(containerId, folder, filenames){
  const container = document.getElementById(containerId);
  if(!container) return;
  filenames.forEach(name => {
    const fig = document.createElement('figure');
    const img = document.createElement('img');
    img.src = folder + name;
    img.alt = name.replace(/\.[a-z]+$/i,'').replace(/[-_]/g,' ');
    img.loading = 'lazy';
    img.addEventListener('click', () => openLightbox(img.src));
    img.addEventListener('error', () => {
      fig.innerHTML = `<span class="placeholder-img" style="aspect-ratio:4/3;display:flex;">MISSING FILE<br>${folder}${name}</span>`;
    });
    const cap = document.createElement('figcaption');
    cap.textContent = name.replace(/\.[a-z]+$/i,'').replace(/[-_]/g,' ')
      .replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1));
    fig.appendChild(img);
    fig.appendChild(cap);
    container.appendChild(fig);
  });
}

function openLightbox(src){
  let lb = document.querySelector('.lightbox');
  if(!lb){
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<img>';
    lb.addEventListener('click', () => lb.classList.remove('open'));
    document.body.appendChild(lb);
  }
  lb.querySelector('img').src = src;
  lb.classList.add('open');
}

// Generic fallback: any image anywhere on the site (not just
// galleries) that 404s gets replaced with a labeled placeholder,
// so pages never show a broken-image icon.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img[data-fallback-label]').forEach(img => {
    img.addEventListener('error', function handler(){
      img.removeEventListener('error', handler);
      const wrap = document.createElement('div');
      wrap.className = 'placeholder-img ' + (img.dataset.shape || '');
      wrap.innerHTML = img.dataset.fallbackLabel;
      img.replaceWith(wrap);
    });
  });
});
