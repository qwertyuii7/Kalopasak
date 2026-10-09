/**
 * MAHARASHTRIYA KALOPASAK - STATS COUNTER ANIMATION (js/counter.js)
 * Smooth 0 -> Target easeOutCubic animation triggered once via IntersectionObserver.
 * Bilingual formatting (Devanagari vs Western numerals) with instant language switch support.
 */

import { getLanguage, toDevanagariDigits, onLanguageChange } from './i18n.js';

export function initStatsCounter(statsData) {
  const section = document.querySelector('#stats');
  if (!section || !statsData || !statsData.items) return;

  const statItems = statsData.items;
  let hasAnimated = false;

  // Cubic easing function
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  function formatValue(currentVal, suffix) {
    const lang = getLanguage();
    const rounded = Math.round(currentVal);
    if (lang === 'mr') {
      return `${toDevanagariDigits(rounded)}${suffix}`;
    }
    return `${rounded}${suffix}`;
  }

  function setFinalValues() {
    statItems.forEach((item) => {
      const el = document.querySelector(`[data-stat-id="${item.id}"] .stat-number`);
      if (el) {
        el.textContent = formatValue(item.value, item.suffix || '');
      }
    });
  }

  function animateCounters() {
    if (hasAnimated) return;
    hasAnimated = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setFinalValues();
      return;
    }

    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      statItems.forEach((item) => {
        const el = document.querySelector(`[data-stat-id="${item.id}"] .stat-number`);
        if (el) {
          const currentVal = item.value * easedProgress;
          el.textContent = formatValue(currentVal, item.suffix || '');
        }
      });

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setFinalValues();
      }
    }

    requestAnimationFrame(update);
  }

  // IntersectionObserver to trigger once on scroll
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
  } else {
    // Fallback for older browsers
    setFinalValues();
  }

  // Update numerals formatting when language toggles without replaying animation
  onLanguageChange(() => {
    if (hasAnimated) {
      setFinalValues();
    }
  });
}
