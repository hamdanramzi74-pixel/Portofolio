function initSplitText(selector, options = {}) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  const {
    delay = 50,
    duration = 1.25,
    ease = 'power3.out',
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = '-100px'
  } = options;

  elements.forEach(el => {
    const text = el.textContent;
    el.innerHTML = text.split('').map(ch =>
      ch === ' ' ? ' ' : '<span class="split-char">' + ch + '</span>'
    ).join('');

    const chars = el.querySelectorAll('.split-char');
    gsap.set(chars, from);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(chars, {
            ...to,
            duration: duration,
            ease: ease,
            stagger: delay / 1000
          });
          observer.unobserve(el);
        }
      });
    }, { threshold: threshold, rootMargin: rootMargin });

    observer.observe(el);
  });
}
