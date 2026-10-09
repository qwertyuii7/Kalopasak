/**
 * MAHARASHTRIYA KALOPASAK - HEADER & NAVIGATION (js/header.js)
 * Manages sticky scroll state, mobile drawer with focus trap, and active anchor highlighting.
 */

export function initHeader() {
  const header = document.querySelector('.site-header');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const closeDrawerBtn = document.querySelector('.mobile-drawer-close');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  if (!header) return;

  // 1. Sticky Header Scroll Effect
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 2. Mobile Drawer Open/Close with Accessibility & Focus Trap
  let isDrawerOpen = false;
  let previouslyFocusedElement = null;

  function openDrawer() {
    isDrawerOpen = true;
    previouslyFocusedElement = document.activeElement;
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
    if (drawer) drawer.classList.add('is-open');
    if (drawerOverlay) drawerOverlay.classList.add('is-open');
    document.body.classList.add('scroll-locked');

    // Focus first focusable item in drawer
    const focusable = drawer?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    }
  }

  function closeDrawer() {
    isDrawerOpen = false;
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
    if (drawer) drawer.classList.remove('is-open');
    if (drawerOverlay) drawerOverlay.classList.remove('is-open');
    document.body.classList.remove('scroll-locked');

    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      if (isDrawerOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  // Close drawer on link click
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Handle Keyboard Navigation (Esc to close, Tab Trap)
  document.addEventListener('keydown', (e) => {
    if (!isDrawerOpen) return;

    if (e.key === 'Escape') {
      closeDrawer();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = drawer?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusables || focusables.length === 0) return;

      const firstElement = focusables[0];
      const lastElement = focusables[focusables.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });

  // 3. Active Section Nav Highlighting using IntersectionObserver
  const sections = document.querySelectorAll('main section[id]');
  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}` || href === `index.html#${currentId}`) {
              link.classList.add('is-active');
            } else if (href && href.startsWith('#')) {
              link.classList.remove('is-active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));
  }
}
