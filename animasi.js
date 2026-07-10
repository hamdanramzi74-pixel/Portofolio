function initBounceCards(selector, options = {}) {
  const container = document.querySelector(selector);
  if (!container) return;

  const {
    animationDelay = 0.5,
    animationStagger = 0.06,
    easeType = 'elastic.out(1, 0.8)',
    transformStyles = [
      'rotate(10deg) translate(-170px)',
      'rotate(5deg) translate(-85px)',
      'rotate(-3deg)',
      'rotate(-10deg) translate(85px)',
      'rotate(2deg) translate(170px)'
    ],
    enableHover = true
  } = options;

  const cards = container.querySelectorAll('.card');

  cards.forEach((card, i) => {
    card.style.transform = transformStyles[i] ?? 'none';
  });

  gsap.fromTo(
    cards,
    { scale: 0 },
    { scale: 1, stagger: animationStagger, ease: easeType, delay: animationDelay }
  );

  function getNoRotationTransform(t) {
    if (/rotate\([\s\S]*?\)/.test(t)) return t.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    if (t === 'none') return 'rotate(0deg)';
    return `${t} rotate(0deg)`;
  }

  function getPushedTransform(base, offsetX) {
    const m = base.match(/translate\(([-0-9.]+)px\)/);
    if (m) {
      const newX = parseFloat(m[1]) + offsetX;
      return base.replace(/translate\([-0-9.]+px\)/, `translate(${newX}px)`);
    }
    return base === 'none' ? `translate(${offsetX}px)` : `${base} translate(${offsetX}px)`;
  }

  if (!enableHover) return;

  cards.forEach((card, hoveredIdx) => {
    card.addEventListener('mouseenter', () => {
      cards.forEach((target, i) => {
        gsap.killTweensOf(target);
        const base = transformStyles[i] || 'none';
        if (i === hoveredIdx) {
          gsap.to(target, { transform: getNoRotationTransform(base), duration: 0.4, ease: 'back.out(1.4)', overwrite: 'auto' });
        } else {
          const offsetX = i < hoveredIdx ? -160 : 160;
          const delay = Math.abs(hoveredIdx - i) * 0.05;
          gsap.to(target, { transform: getPushedTransform(base, offsetX), duration: 0.4, ease: 'back.out(1.4)', delay, overwrite: 'auto' });
        }
      });
    });

    card.addEventListener('mouseleave', () => {
      cards.forEach((target, i) => {
        gsap.killTweensOf(target);
        gsap.to(target, { transform: transformStyles[i] || 'none', duration: 0.4, ease: 'back.out(1.4)', overwrite: 'auto' });
      });
    });
  });
                          }
