/**
 * MAHARASHTRIYA KALOPASAK - BILINGUAL ARCHITECTURE (js/i18n.js)
 * High-performance instant client-side localization for Marathi (mr) and English (en).
 */

let currentLang = 'mr';
let contentData = null;
const langChangeCallbacks = new Set();

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

/**
 * Converts any Latin number or number string into Devanagari numerals.
 * E.g. 1963 -> १९६३, 60+ -> ६०+, 1000+ -> १०००+
 */
export function toDevanagariDigits(input) {
  if (input === null || input === undefined) return '';
  return String(input).replace(/[0-9]/g, (digit) => DEVANAGARI_DIGITS[parseInt(digit, 10)]);
}

/**
 * Formats a number with its suffix based on the active language.
 */
export function formatLocalizedNumber(num, suffix = '') {
  if (currentLang === 'mr') {
    return `${toDevanagariDigits(num)}${suffix}`;
  }
  return `${num}${suffix}`;
}

/**
 * Retrieves saved language from localStorage safely.
 */
function getSavedLanguage() {
  try {
    const saved = localStorage.getItem('kalopasak_lang');
    if (saved === 'mr' || saved === 'en') {
      return saved;
    }
  } catch (e) {
    console.warn('[i18n] localStorage inaccessible, defaulting to mr', e);
  }
  return 'mr';
}

/**
 * Persists language choice to localStorage.
 */
function saveLanguage(lang) {
  try {
    localStorage.setItem('kalopasak_lang', lang);
  } catch (e) {
    console.warn('[i18n] Could not write to localStorage', e);
  }
}

/**
 * Resolve nested object key path (e.g. "hero.headline" -> contentData.hero.headline[lang])
 */
export function t(keyPath, fallback = '') {
  if (!contentData || !keyPath) return fallback;

  const parts = keyPath.split('.');
  let current = contentData;

  for (const part of parts) {
    if (current === undefined || current === null) return fallback;
    current = current[part];
  }

  if (current && typeof current === 'object' && current[currentLang] !== undefined) {
    return current[currentLang];
  }

  if (typeof current === 'string' || typeof current === 'number') {
    return current;
  }

  return fallback;
}

/**
 * Get active language code ('mr' or 'en')
 */
export function getLanguage() {
  return currentLang;
}

/**
 * Register a listener to execute when the language changes.
 */
export function onLanguageChange(callback) {
  if (typeof callback === 'function') {
    langChangeCallbacks.add(callback);
  }
}

/**
 * Unregister a listener
 */
export function offLanguageChange(callback) {
  langChangeCallbacks.delete(callback);
}

/**
 * Updates DOM text and attributes for all elements marked with data-i18n
 */
export function translateDOM() {
  // Update HTML tag language
  document.documentElement.lang = currentLang;

  // Update Page Title
  if (contentData?.meta?.title) {
    document.title = contentData.meta.title[currentLang] || document.title;
  }

  // Update Meta Description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && contentData?.meta?.description) {
    metaDesc.setAttribute('content', contentData.meta.description[currentLang] || '');
  }

  // Update Text Content
  const textElements = document.querySelectorAll('[data-i18n]');
  textElements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (translation) {
      el.textContent = translation;
    }
  });

  // Update Attributes (e.g. data-i18n-attr="alt:about.imageAlt,aria-label:nav.home")
  const attrElements = document.querySelectorAll('[data-i18n-attr]');
  attrElements.forEach((el) => {
    const attrConfig = el.getAttribute('data-i18n-attr');
    const pairs = attrConfig.split(',');
    pairs.forEach((pair) => {
      const [attrName, key] = pair.split(':').map((s) => s.trim());
      if (attrName && key) {
        const val = t(key);
        if (val) {
          el.setAttribute(attrName, val);
        }
      }
    });
  });

  // Update all Language Switcher Buttons state
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach((btn) => {
    const btnLang = btn.getAttribute('data-lang');
    const isActive = btnLang === currentLang;
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    btn.classList.toggle('is-active', isActive);
  });
}

/**
 * Sets the active language, updates DOM, triggers callbacks, and preserves scroll position.
 */
export function setLanguage(newLang) {
  if (newLang !== 'mr' && newLang !== 'en') return;

  currentLang = newLang;
  saveLanguage(newLang);

  // Preserve scroll position
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  // Translate static DOM nodes
  translateDOM();

  // Notify registered components to re-render dynamic content
  langChangeCallbacks.forEach((cb) => {
    try {
      cb(currentLang, contentData);
    } catch (err) {
      console.error('[i18n] Error executing language change callback:', err);
    }
  });

  // Restore scroll
  window.scrollTo(scrollX, scrollY);
}

/**
 * Initializes i18n system with content data.
 */
export function initI18n(data) {
  contentData = data;
  currentLang = getSavedLanguage();

  // Attach click events to language switcher buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (btn) {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang && targetLang !== currentLang) {
        setLanguage(targetLang);
      }
    }
  });

  // Initial translation
  translateDOM();
}
