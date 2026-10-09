/**
 * MAHARASHTRIYA KALOPASAK - VIDEO EMBED FACADE (js/video-facade.js)
 * High-performance click-to-load YouTube / Video facade to avoid loading heavy third-party iframes on page load.
 */

export function initVideoFacades() {
  const facades = document.querySelectorAll('.video-facade[data-video-id]');

  facades.forEach((facade) => {
    facade.addEventListener('click', () => {
      const videoId = facade.getAttribute('data-video-id');
      if (!videoId) return;

      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`);
      iframe.setAttribute('title', facade.getAttribute('data-video-title') || 'Kalopasak Video');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.borderRadius = 'inherit';

      facade.innerHTML = '';
      facade.appendChild(iframe);
      facade.classList.add('is-playing');
    });
  });
}
