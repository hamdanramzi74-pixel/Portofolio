function initTextType(selector, options = {}) {
  const el = document.querySelector(selector);
  if (!el) return;

  const {
    texts = ["Hello!"],
    typingSpeed = 50,
    deletingSpeed = 30,
    pauseDuration = 2000,
    cursorCharacter = "|",
    showCursor = true
  } = options;

  el.innerHTML = `<span class="type-text"></span>${showCursor ? `<span class="cursor">${cursorCharacter}</span>` : ''}`;
  const textEl = el.querySelector('.type-text');

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      charIndex++;
      textEl.textContent = currentText.slice(0, charIndex);
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(tick, pauseDuration);
        return;
      }
      setTimeout(tick, typingSpeed);
    } else {
      charIndex--;
      textEl.textContent = currentText.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(tick, typingSpeed);
        return;
      }
      setTimeout(tick, deletingSpeed);
    }
  }

  tick();
}

function typeOnce(el, text, speed = 25) {
  el.textContent = '';
  let i = 0;
  clearInterval(el._typeInterval);
  el._typeInterval = setInterval(() => {
    i++;
    el.textContent = text.slice(0, i);
    if (i >= text.length) clearInterval(el._typeInterval);
  }, speed);
}
