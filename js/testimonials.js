/**
 * MAHARASHTRIYA KALOPASAK - TESTIMONIALS SLIDER (js/testimonials.js)
 * Multi-card responsive quote slider (3 on desktop, 2 on tablet, 1 on mobile)
 * with touch-swipe, keyboard controls, aria-live accessibility, and i18n support.
 */

import { getLanguage, onLanguageChange } from './i18n.js';

export function initTestimonialsSlider(testimonialsData) {
  const container = document.querySelector('.testimonials-slider-wrap');
  const track = document.querySelector('.testimonials-track');
  const dotsContainer = document.querySelector('.testimonials-dots');
  const prevBtn = document.querySelector('.testimonials-prev-btn');
  const nextBtn = document.querySelector('.testimonials-next-btn');
  const liveRegion = document.querySelector('.testimonials-live-region');

  if (!container || !track || !testimonialsData || !testimonialsData.items) return;

  const items = testimonialsData.items;
  let currentIndex = 0;
  let timer = null;
  const AUTOPLAY_INTERVAL = 7000;
  let isPaused = false;

  function getCardsPerView() {
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  function getMaxIndex() {
    const perView = getCardsPerView();
    return Math.max(0, items.length - perView);
  }

  // Render Cards HTML
  function renderSlider() {
    const lang = getLanguage();

    track.innerHTML = items
      .map((item, idx) => {
        const quoteText = item.quote?.[lang] || '';
        const authorName = item.author?.[lang] || '';
        const roleText = item.role?.[lang] || '';

        return `
          <div class="testimonial-card" data-testimonial-id="${item.id}" role="group" aria-roledescription="slide" aria-label="${idx + 1} of ${items.length}">
            <svg class="testimonial-quote-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <p class="testimonial-quote">“${quoteText}”</p>
            <div class="testimonial-author-row">
              <img 
                class="testimonial-avatar" 
                src="${item.avatar}" 
                alt="${authorName}" 
                width="52" 
                height="52" 
                loading="lazy" 
              />
              <div class="testimonial-author-info">
                <span class="testimonial-author-name">${authorName}</span>
                <span class="testimonial-author-role">${roleText}</span>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    renderDots();
    updateTrackPosition();
  }

  function renderDots() {
    if (!dotsContainer) return;
    const maxIdx = getMaxIndex();
    const dotsCount = maxIdx + 1;
    const lang = getLanguage();

    dotsContainer.innerHTML = Array.from({ length: dotsCount })
      .map((_, idx) => {
        const isActive = idx === currentIndex;
        return `
          <button 
            type="button" 
            class="carousel-dot ${isActive ? 'is-active' : ''}" 
            data-testimonial-dot="${idx}"
            aria-label="${lang === 'mr' ? `अभिप्राय गट ${idx + 1} वर जा` : `Go to testimonial slide ${idx + 1}`}"
            aria-current="${isActive ? 'true' : 'false'}"
          ></button>
        `;
      })
      .join('');
  }

  function updateTrackPosition() {
    const maxIdx = getMaxIndex();
    if (currentIndex > maxIdx) {
      currentIndex = maxIdx;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    }

    const perView = getCardsPerView();
    // Card width + gap percentage
    const gapPx = 24;
    const containerWidth = container.clientWidth;
    const cardWidth = (containerWidth - (perView - 1) * gapPx) / perView;
    const shift = currentIndex * (cardWidth + gapPx);

    track.style.transform = `translateX(-${shift}px)`;

    // Update Dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        const active = idx === currentIndex;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-current', active ? 'true' : 'false');
      });
    }

    // Update Live Region for Accessibility
    if (liveRegion) {
      const activeCard = items[currentIndex];
      const lang = getLanguage();
      if (activeCard) {
        liveRegion.textContent = `${activeCard.author?.[lang] || ''}: ${activeCard.quote?.[lang] || ''}`;
      }
    }
  }

  function nextSlide() {
    const maxIdx = getMaxIndex();
    if (currentIndex >= maxIdx) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateTrackPosition();
  }

  function prevSlide() {
    const maxIdx = getMaxIndex();
    if (currentIndex <= 0) {
      currentIndex = maxIdx;
    } else {
      currentIndex--;
    }
    updateTrackPosition();
  }

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
        currentIndex = parseInt(dot.getAttribute('data-testimonial-dot'), 10);
        updateTrackPosition();
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

  // Touch Swipe on mobile
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
    const threshold = 40;

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

  // Window resize handler
  let resizeTimeout = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      renderDots();
      updateTrackPosition();
    }, 100);
  });

  // Initial render
  renderSlider();
  startAutoplay();

  // Language change update
  onLanguageChange(() => {
    renderSlider();
  });
}
