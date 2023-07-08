window.addEventListener('load', () => {
  const html = document.documentElement;
  const filtersSectionBtns = document.querySelectorAll('.filters__section-title');
  const modClass = 'is-hide';
  let resizeId = null;

  const Breakpoint = {
    MD: 1079,
    SM: 767,
    XS: 600
  };

  if (filtersSectionBtns.length) {
    const filtersSections = document.querySelectorAll('.filters__section');
    setBorder();

    filtersSectionBtns.forEach(it => {
      addHandler(it);
    });

    window.addEventListener('resize', () => {
      setBorder();

      clearTimeout(resizeId);
      resizeId = setTimeout(() => {
        filtersSectionBtns.forEach(it => {
          addHandler(it);
        });
      }, 150);
    });
    
    function addHandler(it) {
          
      const parent = it.parentElement;
      const next = it.nextElementSibling;

      parent.removeAttribute('style');
      next.removeAttribute('style');
      parent.classList.remove(modClass);

      const nextHeight = next.offsetHeight;

      it.onclick = function () {
        if (parent.classList.contains(modClass)) {
          showFiltersSection(next, nextHeight, parent);
        } else {
          hideFiltersSection(next, parent);
        }
      };
    }

    function hideFiltersSection(next, parent) {
      gsap.to(next, {'height': 0, 'padding-top': 0, 'padding-bottom': 0, duration: .3});
      gsap.to(parent, {'padding-bottom': '20px', duration: .3});

      parent.classList.add(modClass);
    }

    function showFiltersSection(next, nextHeight, parent) {
      gsap.to(next, {'height': nextHeight, 'padding-top': '20px', 'padding-bottom': '2px', duration: .3})
      gsap.to(parent, {'padding-bottom': '23px', duration: .3});

      parent.classList.remove(modClass);
    }

    function setBorder() {
      if (html.clientWidth <= Breakpoint.MD && html.clientWidth > Breakpoint.SM) {
        setSectionBorder(3);
      } else if (html.clientWidth <= Breakpoint.SM && html.clientWidth > Breakpoint.XS) {
        setSectionBorder(2);
      } else if (html.clientWidth <= Breakpoint.XS) {
        setSectionBorder(1);
      } else {
        setSectionBorder(0);
      }
    }

    function setSectionBorder(x) {
      const remainder = filtersSections.length % x || x;
      const validIndex = filtersSections.length - remainder;

      filtersSections.forEach((it, index) => {
        if (index >= validIndex) {
          it.classList.add('no-border');
        } else {
          it.classList.remove('no-border');
        }
      });
      
      
      
    }
  }
});