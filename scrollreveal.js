gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.scroll-reveal').forEach((el) => {
  const words = el.textContent.split(/(\s+)/).map(w =>
    w.match(/^\s+$/) ? w : `<span class="word">${w}</span>`
  ).join('');
  el.innerHTML = words;

  const wordEls = el.querySelectorAll('.word');

  gsap.fromTo(el,
    { transformOrigin: '0% 50%', rotate: 3 },
    {
      rotate: 0,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: true }
    }
  );

  gsap.fromTo(wordEls,
    { opacity: 0.1, filter: 'blur(4px)' },
    {
      opacity: 1,
      filter: 'blur(0px)',
      ease: 'none',
      stagger: 0.05,
      scrollTrigger: { trigger: el, start: 'top bottom-=20%', end: 'bottom bottom', scrub: true }
    }
  );
});
