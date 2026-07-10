function initCircularText(selector, options = {}) {
  const container = document.querySelector(selector);
  if (!container) return;

  const {
    text = "TEXT*HERE*",
    spinDuration = 20,
    onHover = "speedUp",
    radius = 50
  } = options;

  const spin = document.createElement('div');
  spin.className = 'ct-spin';
  spin.style.animationDuration = spinDuration + 's';

  const chars = text.split('');
  const angleStep = 360 / chars.length;

  chars.forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    const angle = angleStep * i;
    span.style.transform = 'rotate(' + angle + 'deg) translate(' + radius + 'px) rotate(90deg)';
    span.style.left = '50%';
    span.style.top = '50%';
    spin.appendChild(span);
  });

  container.appendChild(spin);

  if (onHover === 'speedUp') {
    container.addEventListener('mouseenter', function () {
      spin.style.animationDuration = (spinDuration / 4) + 's';
    });
    container.addEventListener('mouseleave', function () {
      spin.style.animationDuration = spinDuration + 's';
    });
  } else if (onHover === 'pause') {
    container.addEventListener('mouseenter', function () {
      spin.style.animationPlayState = 'paused';
    });
    container.addEventListener('mouseleave', function () {
      spin.style.animationPlayState = 'running';
    });
  }
}
