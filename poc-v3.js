/* Story edition (v3). The interactive storyboard was replaced by recorded demo videos of the local app. */
(() => {
  'use strict';
  // Chapter chips jump the full demo video to that moment.
  const full = document.querySelector('.demo-video video');
  document.querySelectorAll('.vid-chapters button[data-t]').forEach(b => b.addEventListener('click', () => {
    if (!full) return; full.currentTime = Number(b.dataset.t); full.play().catch(() => {});
  }));
  // Pause the looping highlight when it scrolls out of view; respect reduced motion.
  const hl = document.querySelector('.ov-video video');
  if (!hl) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hl.removeAttribute('autoplay'); hl.pause(); hl.setAttribute('controls', '');
    return;
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) hl.play().catch(() => {}); else hl.pause(); }), { threshold: 0.2 }).observe(hl);
  }
})();
