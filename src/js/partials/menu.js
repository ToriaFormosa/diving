window.addEventListener('load', () => {
  const html = document.documentElement;
  const submenuLists = document.querySelectorAll('.menu__submenu-list');
  const breakpoint = 1280;
  const secondBreakpoint = 1600;
  const header = document.querySelector('.header');
  let isSubmenuSimplebar = false;

  if (header) {
    const canvas = header.querySelector('.header__canvas');
    const profile = header.querySelector('.header__profile');
    const openBtn = header.querySelector('.header__burger');
    const closeBtn = canvas.querySelector('.header__canvas-close');
    const secondMenu = header.querySelector('.header__second-menu');
    const secondMenuMenu = secondMenu.querySelector('.menu');
    const secondMenuToggle = secondMenu.querySelector('.header__second-menu-toggle');
    const dropdownLinks = canvas.querySelectorAll('.menu__item--expand > a');

    const ModifierClass = {
      HEADER: 'is-menu-open',
      ANIMATE: 'animate',
      SHOWN: 'shown'
    };

    let overlay = null;

    if (html.clientWidth < breakpoint) {
      openBtn.onclick = openMenu;
      //secondMenuToggle.onclick = null;

      if (dropdownLinks.length) {
        changeStateSubmenuHandler(true);
      }
    }

    if (html.clientWidth >= breakpoint && html.clientWidth < secondBreakpoint) {
      secondMenuToggle.onclick = showSecondMenu;
    }

    //appendProfile();

    function openMenu() {
      blockScroll();
      overlay = setOverlay(closeMenu);
      header.appendChild(overlay);
      canvas.classList.add(ModifierClass.ANIMATE);
      canvas.classList.add(ModifierClass.SHOWN);

      canvas.ontransitionend = () => {
        canvas.ontransitionend = null;
        canvas.classList.remove(ModifierClass.ANIMATE);
        header.classList.add(ModifierClass.HEADER);

        closeBtn.onclick = closeMenu;
        openBtn.onclick = null;
      }
    }

    function closeMenu() {
      hideSubmenu();

      header.classList.remove(ModifierClass.HEADER);
      canvas.classList.add(ModifierClass.ANIMATE);
      canvas.classList.remove(ModifierClass.SHOWN);
      
      canvas.ontransitionend = () => {
        canvas.ontransitionend = null;
        canvas.classList.remove(ModifierClass.ANIMATE);

        overlay.remove();
        overlay = null;

        closeBtn.onclick = null;
        openBtn.onclick = openMenu;
        unblockScroll();
      }
    }

    function resetMenu() {
      header.classList.remove(ModifierClass.HEADER);
      canvas.classList.remove(ModifierClass.SHOWN);

      openBtn.onclick = null;
      closeBtn.onclick = null;

      if (overlay) {
        overlay.remove();
        overlay = null;
      }
    
      unblockScroll();
    }

    function showSecondMenu() {
      secondMenu.classList.add(ModifierClass.ANIMATE);
      secondMenu.classList.add(ModifierClass.SHOWN);

      secondMenuMenu.ontransitionend = () => {
        secondMenu.classList.remove(ModifierClass.ANIMATE);
        this.onclick = hideSecondMenu;
      };
    }

    function hideSecondMenu() {
      secondMenu.classList.add(ModifierClass.ANIMATE);
      secondMenu.classList.remove(ModifierClass.SHOWN);

      secondMenuMenu.ontransitionend = () => {
        secondMenu.classList.remove(ModifierClass.ANIMATE);
        this.onclick = showSecondMenu;
      };
    }

    function resetSecondMenu() {
      secondMenu.classList.remove(ModifierClass.SHOWN);
      secondMenuToggle.onclick = null;
    }

    function showSubmenu(e) {
      e.preventDefault();
      const submenu = this.nextElementSibling;

      header.classList.remove(ModifierClass.HEADER);
      submenu.classList.add(ModifierClass.ANIMATE);
      submenu.classList.add(ModifierClass.SHOWN);

      submenu.ontransitionend = () => {
        submenu.ontransitionend = null;
        submenu.classList.remove(ModifierClass.ANIMATE);
        submenu.querySelector('.menu__back').onclick = hideSubmenu;
      }
    }

    function hideSubmenu() {
      const submenu = canvas.querySelector('.menu__submenu.shown');

      if (submenu) {
        const back = submenu.querySelector('.menu__back');

        back.onclick = null;
        
        submenu.classList.add(ModifierClass.ANIMATE);
        submenu.classList.remove(ModifierClass.SHOWN);

        submenu.ontransitionend = () => {
          submenu.ontransitionend = null;
          header.classList.add(ModifierClass.HEADER);
          submenu.classList.remove(ModifierClass.ANIMATE);
        }
      }

    }

    function resetSubmenu() {
      dropdownLinks.forEach(it => {
        it.nextElementSibling.classList.remove(ModifierClass.SHOWN);
        it.nextElementSibling.querySelector('.menu__back').onclick = null;
      });
    }

    function changeStateSubmenuHandler(addIt) {
      dropdownLinks.forEach(it => {
        it.onclick = addIt ? showSubmenu : null;
      });
    }

    function setOverlay(cb) {
      const overlay = document.createElement('div');
      overlay.classList.add('header__overlay');
      overlay.addEventListener('click', cb);
      return overlay;
    }

    function blockScroll() {
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = getScrollbarWidth() + 'px';
    }

    function unblockScroll() {
      document.body.style.overflow = '';
      document.body.style.marginRight = '';
    }

    function appendProfile() {
      if (header.classList.contains('header--homepage')) {
        if (html.clientWidth >= breakpoint) {
          canvas.appendChild(profile);
        } else {
          header.querySelector('.header__container').appendChild(profile);
        }
        
      }
    }

    window.addEventListener('resize', () => {
      if (html.clientWidth < breakpoint) {
        openBtn.onclick = openMenu;
          
        if (dropdownLinks.length) {
          changeStateSubmenuHandler(true);
        }
      } else {
        resetMenu();
        resetSubmenu();

        if (dropdownLinks.length) {
          changeStateSubmenuHandler(false);
        }
      }

      if (html.clientWidth >= breakpoint && html.clientWidth < secondBreakpoint) {
        secondMenuToggle.onclick = secondMenu.classList.contains('shown') ? hideSecondMenu : showSecondMenu;
      } else {
        resetSecondMenu();
      }
      //appendProfile();
    });
  }


  if (submenuLists.length) {
    
    if (html.clientWidth < breakpoint && !isSubmenuSimplebar) {
      submenuLists.forEach(it => {
        initSimplebar(it);
      });
      
      isSubmenuSimplebar = true;
    }

    window.addEventListener('resize', () => {
      if (html.clientWidth < breakpoint && !isSubmenuSimplebar) {
        submenuLists.forEach(it => {
          initSimplebar(it);
        });
        isSubmenuSimplebar = true;
      } else if (html.clientWidth >= breakpoint) {
        submenuLists.forEach(it => {
          destroySimplebar(it);
        });
        isSubmenuSimplebar = false;
      }
    });

    function initSimplebar(el) {
      new SimpleBar(el, { autoHide: false });
    }

    function destroySimplebar(el) {
      const items = el.querySelectorAll('.menu__submenu-item');
      el.removeAttribute('data-simplebar');
      el.innerHTML = '';

      items.forEach(it => el.appendChild(it));
    }
  }



  function getScrollbarWidth() {
    const block = document.createElement('div');
    block.style.width = '50px';
    block.style.height = '50px';
    block.style.overflow = 'auto';

    const innerBlock = document.createElement('div');
    innerBlock.style.height = '200px';

    block.appendChild(innerBlock);
    document.body.appendChild(block);

    const width = block.offsetWidth - block.clientWidth;

    block.remove();
    return width;
  }

});