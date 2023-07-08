
window.addEventListener('load', () => {
  const html = document.documentElement;
  const productsCarousels = document.querySelectorAll('.__js_products-carousel');
  const coursesCarousels = document.querySelectorAll('.__js_courses-carousel-a');
  const thumbsCarouselEl = document.querySelector('.__js_product-thumbs');
  const productFullPhoto = document.querySelector('.product-card__photo')
  const featuresEl = document.querySelector('.__js_features-carousel');

  if (productsCarousels.length) {
    productsCarousels.forEach(it => {
      new Swiper(it, {
        speed: 300,
        slidesPerView: 'auto',
        spaceBetween: 24,
        watchOverflow: true,
        /*breakpoints: {
          // when window width is >= 480px
          560: {
            slidesPerView: 2
          },
          // when window width is >= 640px
          1080: {
            slidesPerView: 3
          },
          1280: {
            slidesPerView: 4
          }
        },*/
        navigation: {
          nextEl: '.__js_next',
          prevEl: '.__js_prev',
          disabledClass: 'button--disabled'
        },
        pagination: {
          el: it.nextElementSibling,
          type: 'bullets',// 'bullets' | 'fraction' | 'progressbar' | 'custom'
          clickable: true
        },
      });
    });
  }

  if (coursesCarousels.length) {
    coursesCarousels.forEach(it => {
      new Swiper(it, {
        speed: 300,
        slidesPerView: 1,
        spaceBetween: 24,
        watchOverflow: true,
        breakpoints: {
          // when window width is >= 640px
          1080: {
            slidesPerView: 2
          },
          1280: {
            slidesPerView: 3
          }
        },
        navigation: {
          nextEl: '.__js_next',
          prevEl: '.__js_prev',
          disabledClass: 'button--disabled'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',// 'bullets' | 'fraction' | 'progressbar' | 'custom'
          clickable: true
        },
      });
    });
  }

  if (thumbsCarouselEl ) {
    const thumbs = thumbsCarouselEl.querySelectorAll('.swiper-slide');

    if (thumbs.length && productFullPhoto) {
      const productImg = productFullPhoto.querySelector('img');

      thumbs.forEach(it => it.addEventListener('click', function() {
        thumbsCarouselEl.querySelector('.active').classList.remove('active');
        productFullPhoto.classList.add('opacity-0');
        
        productFullPhoto.ontransitionend = () => {
          productFullPhoto.ontransitionend = null;

          productImg.src = it.dataset.fullImage;
          productImg.srcset = it.dataset.fullImage2x;
          productImg.alt = it.dataset.alt;
          productImg.parentElement.href = it.dataset.fancyboxImage;
          it.classList.add('active');
          productFullPhoto.classList.remove('opacity-0');
        };
      }));
    }

    let resizeId = null;
    let thumbsCarousel = null;
    let direction = document.documentElement.clientWidth < 768 ? 'horizontal' : 'vertical';

    initThumbCarousel();

    window.addEventListener('resize', () => {
      direction = document.documentElement.clientWidth < 768 ? 'horizontal' : 'vertical';
      clearTimeout(resizeId);
      resizeId = setTimeout(reInit, 150);
    });

    function reInit() {
      thumbsCarousel.destroy();
      initThumbCarousel();
    }

    function initThumbCarousel() {
      thumbsCarousel = new Swiper(thumbsCarouselEl, {
        speed: 300,
        slidesPerView: 'auto',
        watchOverflow: true,
        direction: direction,
        navigation: {
          nextEl: '.__js_next',
          prevEl: '.__js_prev',
        }
      });
    }
  }

  if (featuresEl) {
    let carousel = null;
    const breakpoint = 480;

    if (html.clientWidth < breakpoint && !carousel) {
      initCarousel();
    }

    window.addEventListener('resize', () => {
      if (html.clientWidth < breakpoint && !carousel) {
        initCarousel();
      } else if (html.clientWidth >= breakpoint && carousel) {
        carousel.destroy();
        carousel = null;
      }
    });

    function initCarousel() {
      carousel = new Swiper(featuresEl, {
        speed: 300,
        slidesPerView: 1,
        //spaceBetween: 24,
        watchOverflow: true,
        /*breakpoints: {
          // when window width is >= 640px
          1080: {
            slidesPerView: 2
          },
          1280: {
            slidesPerView: 3
          }
        },*/
        navigation: {
          nextEl: '.__js_next',
          prevEl: '.__js_prev',
          disabledClass: 'button--disabled'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',// 'bullets' | 'fraction' | 'progressbar' | 'custom'
          clickable: true
        },
      });
    }

  }

  /*const test = document.querySelector('.__js_test-carousel');
  new Swiper(test, {
        speed: 300,
        slidesPerView: 1,
        spaceBetween: 24,
        //watchOverflow: true,
        breakpoints: {
          // when window width is >= 480px
          560: {
            slidesPerView: 2
          },
          // when window width is >= 640px
          1080: {
            slidesPerView: 3
          },
          1280: {
            slidesPerView: 4
          }
        },
        navigation: {
          nextEl: test.nextElementSibling.querySelector('.__js_next'),
          prevEl: test.nextElementSibling.querySelector('.__js_prev'),
          disabledClass: 'button--disabled'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',// 'bullets' | 'fraction' | 'progressbar' | 'custom'
          clickable: true
        },
      });*/
});