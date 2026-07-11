function initBounceCards(selector, options = {}) {
  const container = document.querySelector(selector);
  if (!container) return;

  const {
    animationDelay = 0.5,
    animationStagger = 0.06,
    easeType = 'elastic.out(1, 0.8)',
    cardStyles = [
      { rotation: -8, x: -90 },
      { rotation: 4, x: 0 },
      { rotation: -3, x: 90 }
    ],
    enableHover = true
  } = options;

  const cards = container.querySelectorAll('.card');

  cards.forEach(function (card, i) {
    const s = cardStyles[i] || { rotation: 0, x: 0 };
    gsap.set(card, { rotation: s.rotation, x: s.x, scale: 0 });
  });

  gsap.to(cards, {
    scale: 1,
    stagger: animationStagger,
    ease: easeType,
    delay: animationDelay
  });

  if (!enableHover) return;

  cards.forEach(function (card, hoveredIdx) {
    card.addEventListener('mouseenter', function () {
      cards.forEach(function (target, i) {
        gsap.killTweensOf(target);
        const s = cardStyles[i] || { rotation: 0, x: 0 };
        if (i === hoveredIdx) {
          gsap.to(target, { rotation: 0, x: s.x, duration: 0.4, ease: 'back.out(1.4)', overwrite: 'auto' });
        } else {
          const offset = i < hoveredIdx ? -160 : 160;
          const delay = Math.abs(hoveredIdx - i) * 0.05;
          gsap.to(target, { rotation: s.rotation, x: s.x + offset, duration: 0.4, ease: 'back.out(1.4)', delay, overwrite: 'auto' });
        }
      });
    });

    card.addEventListener('mouseleave', function () {
      cards.forEach(function (target, i) {
        gsap.killTweensOf(target);
        const s = cardStyles[i] || { rotation: 0, x: 0 };
        gsap.to(target, { rotation: s.rotation, x: s.x, duration: 0.4, ease: 'back.out(1.4)', overwrite: 'auto' });
      });
    });
  });
}
