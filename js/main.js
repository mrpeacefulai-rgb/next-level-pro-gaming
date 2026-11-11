
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.nav');
if(menuToggle && mobileNav){
  menuToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  });
  document.querySelectorAll('.links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    });
  });
}
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


// Shop product image enlargement
document.querySelectorAll('.product-zoom').forEach(photo => {
  photo.setAttribute('tabindex', '0');
  photo.setAttribute('role', 'button');
  photo.setAttribute('aria-label', 'Enlarge ' + (photo.alt || 'product image'));
  const openProductImage = () => {
    if(!lightbox || !lightboxImage) return;
    lightboxImage.src = photo.currentSrc || photo.src;
    lightboxImage.alt = photo.alt || 'Enlarged product image';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  photo.addEventListener('click', openProductImage);
  photo.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProductImage();
    }
  });
});
