function initScrollReveal(selector, options = {}) {
  const el = document.querySelector(selector);
  if (!el) return;

  const {
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    rotationEnd = 'bottom bottom',
    wordAnimationEnd = 'bottom bottom'
  } = options;

  const originalText = el.textContent;
  const parts = originalText.split(/(\s+)/);
  el.innerHTML = parts.map(function (w) {
    return w.match(/^\s+$/) ? w : '<span class="word">' + w + '</span>';
  }).join('');

  gsap.fromTo(el,
    { transformOrigin: '0% 50%', rotate: baseRotation },
    {
      ease: 'none',
      rotate: 0,
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: rotationEnd,
        scrub: true
      }
    }
  );

  const words = el.querySelectorAll('.word');

  gsap.fromTo(words,
    { opacity: baseOpacity },
    {
      ease: 'none',
      opacity: 1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: el,
        start: 'top bottom-=20%',
        end: wordAnimationEnd,
        scrub: true
      }
    }
  );

  if (enableBlur) {
    gsap.fromTo(words,
      { filter: 'blur(' + blurStrength + 'px)' },
      {
        ease: 'none',
        filter: 'blur(0px)',
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: true
        }
      }
    );
  }
}
