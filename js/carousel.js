/**
 * MAHARASHTRIYA KALOPASAK - HERO CAROUSEL (js/carousel.js)
 * Custom lightweight touch-enabled carousel with auto-play, keyboard controls, and zero dependencies.
 */

import { getLanguage, onLanguageChange } from './i18n.js';

export function initHeroCarousel(heroData) {
  const container = document.querySelector('.hero-carousel-container');
  const slidesTrack = document.querySelector('.hero-carousel-slides');
  const dotsContainer = document.querySelector('.hero-carousel-dots');
  const prevBtn = document.querySelector('.hero-prev-btn');
  const nextBtn = document.querySelector('.hero-next-btn');

  if (!container || !slidesTrack || !heroData || !heroData.slides) return;

  const slides = heroData.slides;
  let currentIndex = 0;
  let timer = null;
  const AUTOPLAY_INTERVAL = 6000;
  let isPaused = false;

  // Render Slides and Dots
  function renderCarousel() {
    const lang = getLanguage();

    // Render slides HTML
    slidesTrack.innerHTML = slides
      .map((slide, idx) => {
        const isActive = idx === currentIndex;
        const altText = slide.alt?.[lang] || 'Theatre Play Scene';
        const isFirst = idx === 0;

        return `
          <div class="carousel-slide ${isActive ? 'is-active' : ''}" data-slide-index="${idx}" role="group" aria-roledescription="slide" aria-label="${idx + 1} of ${slides.length}">
            <img 
              class="carousel-slide-img" 
              src="${slide.image}" 
              alt="${altText}" 
              width="1600" 
              height="900"
              ${isFirst ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'}
            />
          </div>
        `;
      })
      .join('');

    // Render Dots HTML
    if (dotsContainer) {
      dotsContainer.innerHTML = slides
        .map((_, idx) => {
          const isActive = idx === currentIndex;
          return `
            <button 
              type="button" 
              class="carousel-dot ${isActive ? 'is-active' : ''}" 
              data-dot-index="${idx}"
              aria-label="${lang === 'mr' ? `छायाचित्र ${idx + 1} वर जा` : `Go to slide ${idx + 1}`}"
              aria-current="${isActive ? 'true' : 'false'}"
            ></button>
          `;
        })
        .join('');
    }
  }

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // Update Slide active classes
    const slideEls = slidesTrack.querySelectorAll('.carousel-slide');
    slideEls.forEach((slide, idx) => {
      const active = idx === currentIndex;
      slide.classList.toggle('is-active', active);
    });

    // Update Dots
    if (dotsContainer) {
      const dotEls = dotsContainer.querySelectorAll('.carousel-dot');
      dotEls.forEach((dot, idx) => {
        const active = idx === currentIndex;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-current', active ? 'true' : 'false');
      });
    }
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Auto-play management
  function startAutoplay() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    stopAutoplay();
    timer = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // Event Listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel-dot');
      if (dot) {
        const targetIdx = parseInt(dot.getAttribute('data-dot-index'), 10);
        goToSlide(targetIdx);
        startAutoplay();
      }
    });
  }

  // Pause on hover / focus
  container.addEventListener('mouseenter', () => { isPaused = true; });
  container.addEventListener('mouseleave', () => { isPaused = false; });
  container.addEventListener('focusin', () => { isPaused = true; });
  container.addEventListener('focusout', () => { isPaused = false; });

  // Keyboard navigation
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      startAutoplay();
    }
  });

  // Touch Swipe via Pointer Events
  let startX = 0;
  let currentX = 0;
  let isSwiping = false;

  container.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    currentX = e.clientX;
    isSwiping = true;
    isPaused = true;
  }, { passive: true });

  container.addEventListener('pointermove', (e) => {
    if (!isSwiping) return;
    currentX = e.clientX;
  }, { passive: true });

  const endSwipe = () => {
    if (!isSwiping) return;
    isSwiping = false;
    isPaused = false;
    const diff = currentX - startX;
    const threshold = 45; // 45px swipe threshold

    if (diff > threshold) {
      prevSlide();
      startAutoplay();
    } else if (diff < -threshold) {
      nextSlide();
      startAutoplay();
    }
  };

  container.addEventListener('pointerup', endSwipe, { passive: true });
  container.addEventListener('pointercancel', endSwipe, { passive: true });

  // Initial render
  renderCarousel();
  startAutoplay();

  // Re-render alt tags and titles when language switches
  onLanguageChange(() => {
    const lang = getLanguage();
    const slideEls = slidesTrack.querySelectorAll('.carousel-slide');
    slideEls.forEach((slideEl, idx) => {
      const img = slideEl.querySelector('img');
      if (img && slides[idx]?.alt) {
        img.alt = slides[idx].alt[lang] || '';
      }
    });

    if (dotsContainer) {
      const dotEls = dotsContainer.querySelectorAll('.carousel-dot');
      dotEls.forEach((dotEl, idx) => {
        dotEl.setAttribute(
          'aria-label',
          lang === 'mr' ? `छायाचित्र ${idx + 1} वर जा` : `Go to slide ${idx + 1}`
        );
      });
    }
  });
}
