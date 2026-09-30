const year = new Date().getFullYear();
document.querySelectorAll('[data-year]').forEach(el => el.textContent = year);
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{document.body.classList.remove('menu-open')}));

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-photo').forEach(photo => {
  photo.addEventListener('click', () => {
    lightboxImage.src = photo.dataset.full;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox(){
  if(!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}

if(lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if(lightbox) lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });
