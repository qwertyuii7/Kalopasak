# Maharashtriya Kalopasak (महाराष्ट्रीय कलोपासक)
### 60+ Years of Theatre Legacy (Est. 1963, Pune) - Official Custom-Coded Website

A high-performance, accessible, bilingual (Marathi & English), responsive website built strictly with vanilla HTML5, CSS3, and modern JavaScript (ES modules) with zero external frameworks, jQuery, or animation libraries.

---

## 🎭 Project Structure

```
kalopasak/
├── index.html                  # Master Homepage with all 7 sections + header/footer
├── README.md                   # Technical documentation & developer guide
├── css/
│   ├── tokens.css              # Design tokens (theatre maroon, antique gold, typography, spacing)
│   ├── base.css                # CSS reset, typography, Devanagari line-heights, accessibility
│   ├── components.css          # Reusable buttons, badges, carousel controls, cards, video facade
│   └── sections.css            # Section layouts (header, hero, about, stats, activities, upcoming, testimonials, footer)
├── js/
│   ├── main.js                 # Application bootstrap & lifecycle orchestrator
│   ├── data.js                 # Data layer fetching content.json with offline fallback
│   ├── i18n.js                 # Bilingual manager (mr/en) + Devanagari numerals formatter
│   ├── header.js               # Sticky navigation, mobile drawer with focus trap, anchor observer
│   ├── carousel.js             # Hero touch-swipe photo slider with autoplay & keyboard support
│   ├── counter.js              # Stats counter with easeOutCubic & Devanagari numerals
│   ├── testimonials.js         # Multi-card quote slider with touch-swipe & ARIA live region
│   └── video-facade.js         # Click-to-load YouTube facade component
├── data/
│   └── content.json            # Centralized bilingual content dictionary
├── pages/                      # Bilingual stub pages sharing header/footer (no 404s)
│   ├── history.html            # History & 60-year heritage
│   ├── activities.html         # Competitions & activities (#purushottam, #kelkar, #natu)
│   ├── gallery.html            # Photo archive
│   ├── news.html               # Press releases & news
│   └── plays.html              # Plays archive
└── assets/
    └── images/                 # Optimized SVG/WebP assets, logo, badges, and avatars
```

---

## 🌐 Bilingual Architecture (मराठी + English)

1. **Default Language**: Marathi (`mr`).
2. **Instant Translation**: Elements with `data-i18n="section.key"` or `data-i18n-attr="attr:section.key"` update dynamically without page reloads.
3. **State Persistence**: Selected language is saved in `localStorage` (`kalopasak_lang`) safely with `try...catch` error protection.
4. **Devanagari Numerals**: The `toDevanagariDigits()` engine converts numbers to Marathi Devanagari numerals (`०, १, २, ३, ४, ५, ६, ७, ८, ९`) for Marathi view and Western numerals for English view.
5. **Dynamic Component Re-rendering**: Language toggles seamlessly re-render carousel captions, testimonial cards, upcoming pills, and stat counters while preserving current scroll position.

---

## 🛠️ How to Edit Content & Settings

All site copy, event announcements, testimonials, and contact information reside inside `data/content.json`.

### 1. Update Upcoming Activity / Ticket Announcements
Open `data/content.json` -> `upcoming`:
```json
"upcoming": {
  "active": true,
  "fallback_behavior": "empty_state",
  "title": {
    "mr": "पुरुषोत्तम करंडक २०२५ स्पर्धा वेळापत्रक व तिकीट विक्री",
    "en": "Purushottam Karandak 2025 Schedule & Ticket Updates"
  },
  "pills": {
    "date": {
      "label": { "mr": "दिनांक", "en": "Date" },
      "value": { "mr": "ऑगस्ट - सप्टेंबर २०२५", "en": "August – September 2025" }
    },
    "venue": {
      "label": { "mr": "स्थळ", "en": "Venue" },
      "value": { "mr": "भरत नाट्य मंदिर, पुणे", "en": "Bharat Natya Mandir, Pune" }
    },
    "status": {
      "label": { "mr": "स्थिती", "en": "Status" },
      "value": { "mr": "नोंदणी व तिकीट विक्री सुरू", "en": "Registration & Tickets Open" }
    }
  }
}
```
- Set `"active": false` to show the empty state or hide the section (controlled by `"fallback_behavior": "empty_state" | "hide"`).

### 2. Swap Images & Avatars
Replace or add images inside `/assets/images/`:
- **Logo**: `assets/images/logo.svg`
- **Hero Slides**: `assets/images/hero-1.svg`, `hero-2.svg`, `hero-3.svg`
- **Archival Photo**: `assets/images/about-archival.svg`
- **Activity Banners**: `assets/images/karandak-purushottam.svg`, `karandak-kelkar.svg`, `karandak-natu.svg`
- **Testimonial Avatars**: `assets/images/avatar-1.svg` to `avatar-6.svg`

### 3. Connect to a Real REST API / Headless CMS
In `js/data.js`, replace the `fetch('./data/content.json')` call with your API endpoint:
```javascript
export async function getContent() {
  if (cachedContent) return cachedContent;
  try {
    const response = await fetch('https://api.kalopasak-pune.org/v1/homepage-content');
    cachedContent = await response.json();
    return cachedContent;
  } catch (error) {
    console.warn('[Data Layer] API unreachable, falling back to embedded dataset', error);
    return getFallbackContent();
  }
}
```

---

## ⚡ Performance & Accessibility
- **Zero External JS/CSS Libraries**: Lightweight unminified JS < 25KB, CSS < 35KB.
- **First Contentful Paint (FCP)**: Hero image loads with `fetchpriority="high"`, subsequent images are `loading="lazy"`.
- **WCAG AA Contrast**: Deep maroon background (`#1A090C`, `#4A0D12`), antique gold accents (`#D4AF37`, `#FCE182`), warm off-white (`#FCFBF7`).
- **Focus Management**: Complete focus trap in the mobile drawer, visible focus outlines (`outline: 3px solid var(--color-gold-500)`), and keyboard-navigable sliders.
- **`prefers-reduced-motion`**: Disables auto-play on carousels, skips counter animation, and minimizes transitions.
