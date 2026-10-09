/**
 * MAHARASHTRIYA KALOPASAK - MAIN APPLICATION ENTRY POINT (js/main.js)
 * Coordinates data fetching, bilingual i18n, header, hero slider, stats, testimonials, and footer.
 */

import { getContent } from './data.js';
import { initI18n, getLanguage, toDevanagariDigits, onLanguageChange } from './i18n.js';
import { initHeader } from './header.js';
import { initHeroCarousel } from './carousel.js';
import { initStatsCounter } from './counter.js';
import { initTestimonialsSlider } from './testimonials.js';
import { initVideoFacades } from './video-facade.js';

async function bootstrap() {
  try {
    // 1. Fetch content dictionary
    const content = await getContent();

    // 2. Initialize i18n subsystem
    initI18n(content);

    // 3. Initialize Header & Mobile Drawer
    initHeader();

    // 4. Initialize Hero Carousel
    if (content.hero) {
      initHeroCarousel(content.hero);
    }

    // 5. Initialize Statistics Counter
    if (content.stats) {
      initStatsCounter(content.stats);
    }

    // 6. Initialize Testimonials Multi-card Slider
    if (content.testimonials) {
      initTestimonialsSlider(content.testimonials);
    }

    // 7. Handle Upcoming Event Announcement & Empty State Configuration
    setupUpcomingSection(content.upcoming);

    // 8. Dynamic Copyright Year
    setupFooterCopyright();

    // 9. Initialize Video Facades
    initVideoFacades();

  } catch (error) {
    console.error('[App Bootstrap] Fatal error initializing application:', error);
  }
}

/**
 * Renders or updates the upcoming banner based on active flag & fallback configuration
 */
function setupUpcomingSection(upcomingData) {
  const section = document.querySelector('#upcoming');
  const navLink = document.querySelector('a[href="#upcoming"], a[href="index.html#upcoming"]');
  const mobileNavLink = document.querySelector('.mobile-nav-link[href="#upcoming"], .mobile-nav-link[href="index.html#upcoming"]');

  if (!section || !upcomingData) return;

  function renderUpcoming() {
    const lang = getLanguage();
    const isActive = Boolean(upcomingData.active);

    if (!isActive) {
      if (upcomingData.fallback_behavior === 'hide') {
        section.style.display = 'none';
        if (navLink) navLink.parentElement.style.display = 'none';
        if (mobileNavLink) mobileNavLink.style.display = 'none';
        return;
      }

      // Empty State View
      const emptyInfo = upcomingData.emptyState || {
        badge: { mr: "सूचना", en: "Notice" },
        title: { mr: "पुढील उपक्रमाची घोषणा लवकरच", en: "Next Event Announcement Soon" },
        description: { mr: "नवीन स्पर्धा आणि कार्यक्रमांच्या तारखा लवकरच जाहीर केल्या जातील.", en: "New competition schedules will be announced shortly." },
        btn: { text: { mr: "आमच्याशी संपर्क साधा", en: "Contact Us" }, url: "#contact" }
      };

      section.innerHTML = `
        <div class="container">
          <div class="upcoming-box">
            <div class="upcoming-empty-state">
              <span class="badge-gold">${emptyInfo.badge?.[lang] || ''}</span>
              <h2 class="upcoming-empty-title">${emptyInfo.title?.[lang] || ''}</h2>
              <p class="upcoming-empty-desc">${emptyInfo.description?.[lang] || ''}</p>
              <a href="${emptyInfo.btn?.url || '#contact'}" class="btn btn-gold">${emptyInfo.btn?.text?.[lang] || ''}</a>
            </div>
          </div>
        </div>
      `;
      return;
    }

    // Active Event View
    const title = upcomingData.title?.[lang] || '';
    const badge = upcomingData.badge?.[lang] || '';
    const dateVal = upcomingData.pills?.date?.value?.[lang] || '';
    const dateLabel = upcomingData.pills?.date?.label?.[lang] || 'दिनांक';
    const venueVal = upcomingData.pills?.venue?.value?.[lang] || '';
    const venueLabel = upcomingData.pills?.venue?.label?.[lang] || 'स्थळ';
    const statusVal = upcomingData.pills?.status?.value?.[lang] || '';
    const statusLabel = upcomingData.pills?.status?.label?.[lang] || 'स्थिती';
    const btnText = upcomingData.btn?.text?.[lang] || 'माहिती व वेळापत्रक पहा';
    const btnUrl = upcomingData.btn?.url || 'pages/activities.html#purushottam';

    section.innerHTML = `
      <div class="container">
        <div class="upcoming-box">
          <div class="upcoming-header">
            <span class="badge-gold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>${badge}</span>
            </span>
            <h2 class="upcoming-title">${title}</h2>
          </div>

          <div class="upcoming-pills-grid">
            <div class="event-pill">
              <svg class="event-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <div class="event-pill-content">
                <span class="event-pill-label">${dateLabel}</span>
                <span class="event-pill-value">${dateVal}</span>
              </div>
            </div>

            <div class="event-pill">
              <svg class="event-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div class="event-pill-content">
                <span class="event-pill-label">${venueLabel}</span>
                <span class="event-pill-value">${venueVal}</span>
              </div>
            </div>

            <div class="event-pill">
              <svg class="event-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <line x1="6" y1="10" x2="6" y2="14"></line>
                <line x1="18" y1="10" x2="18" y2="14"></line>
              </svg>
              <div class="event-pill-content">
                <span class="event-pill-label">${statusLabel}</span>
                <span class="event-pill-value">${statusVal}</span>
              </div>
            </div>
          </div>

          <div class="upcoming-cta-wrapper">
            <a href="${btnUrl}" class="btn btn-gold">
              <span>${btnText}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  renderUpcoming();
  onLanguageChange(renderUpcoming);
}

/**
 * Formats footer copyright with dynamic current year
 */
function setupFooterCopyright() {
  const copyEl = document.querySelector('.footer-copyright-text');
  if (!copyEl) return;

  function updateCopyright() {
    const lang = getLanguage();
    const currentYear = new Date().getFullYear();
    const formattedYear = lang === 'mr' ? toDevanagariDigits(currentYear) : currentYear;

    if (lang === 'mr') {
      copyEl.textContent = `© ${formattedYear} महाराष्ट्रीय कलोपासक, पुणे. सर्व हक्क राखीव.`;
    } else {
      copyEl.textContent = `© ${formattedYear} Maharashtriya Kalopasak, Pune. All Rights Reserved.`;
    }
  }

  updateCopyright();
  onLanguageChange(updateCopyright);
}

// Kick off when DOM is interactive
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
