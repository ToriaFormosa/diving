window.addEventListener('load', () => {
  const html = document.documentElement;
  const menuSubtitles = document.querySelectorAll('.footer__menu-subtitle');
  const menuTitles = document.querySelectorAll('.footer__menu-title');
  const breakpoint = 480;
  const modifierClass = 'is-open';
  const duration = 300;
  let timeoutId = null;

  if (menuSubtitles.length) {
    if (html.clientWidth <= breakpoint) {
      menuSubtitles.forEach(it => {
        it.onclick = open;
      })
    }
  }
  
  if (menuTitles.length) {
    if (html.clientWidth <= breakpoint) {
      menuTitles.forEach(it => {
        it.onclick = open;
      })
    }
  }

  window.addEventListener('resize', () => {
    if (menuTitles.length) {
      changeStateHandler(menuTitles);
    }
    if (menuSubtitles.length) {
      changeStateHandler(menuSubtitles);
    }
  })

  function changeStateHandler(arr) {
    arr.forEach(it => {
      if (html.clientWidth <= breakpoint) {
        it.onclick = it.classList.contains(modifierClass) ? close : open;
      } else {
        it.onclick = null;
        it.classList.remove(modifierClass);
      }
    });
  }

  function open(e) {
    e.preventDefault();

    const next = this.nextElementSibling;
    this.classList.add(modifierClass);
    gsap.from(next, {height: 0, duration: (duration / 1000)});
    gsap.to(this, {'margin-bottom': '20px', duration: (duration / 1000)});

    setTimeout(() => {
      next.removeAttribute('style');
      this.removeAttribute('style');
      this.onclick = close;
    }, duration + 50);

  }

  function close(e) {
    e.preventDefault();

    const next = this.nextElementSibling;
    gsap.to(next, {height: 0, duration: (duration / 1000)});
    gsap.to(this, {'margin-bottom': 0, duration: (duration / 1000)});

    setTimeout(() => {
      this.classList.remove(modifierClass);
      next.removeAttribute('style');
      this.removeAttribute('style');
      this.onclick = open;
    }, duration + 50);
 
  }

  function debounce(func, wait, immediate) {
    let timeout;

    return function executedFunction() {
      const context = this;
      const args = arguments;

      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      const callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  };
});