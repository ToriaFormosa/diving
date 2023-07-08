$(window).on('load', function() {
	let articlesEl = document.querySelector('.__js_articles-carousel');

	if (articlesEl) {
		let width = document.documentElement.clientWidth,
				isInit = false,
				articlesCarousel = null;
		const breakpoint = 1279;

		if (width <= breakpoint) {
			initArticlesCarousel();
			//setEqualHeight($('.articles-card__content'));
			isInit = true;
		}

		window.addEventListener('resize', () => {
			width = document.documentElement.clientWidth;

			if (width <= breakpoint && !isInit) {
				initArticlesCarousel();
				//setEqualHeight($('.articles-card__content'));
				isInit = true;
			} else if (width > breakpoint && isInit) {
				articlesCarousel.destroy();
				isInit = false;
			}
		});

		function setEqualHeight(el) {
			if (window.matchMedia('(max-width: 1279px)')) {
				var tallestcolumn = 0;

				el.each(function() {
					var currentHeight = $(this).height();

					if (currentHeight > tallestcolumn) {
						tallestcolumn = currentHeight;
					}
				});

				el.height(tallestcolumn);
			} else {
				el.height('auto');
			}
		}

		function initArticlesCarousel() {
			articlesCarousel = new Swiper(articlesEl, {
				slidesPerView: 1,
				speed: 300,
				spaceBetween: 24,
				loop: true,
				navigation: {
					prevEl: '.articles__prev',
					nextEl: '.articles__next'
				},
				pagination: {
					el: '.articles__pagination',
					type: 'bullets',
					clickable: true
				},
				breakpoints: {
					561: {
						slidesPerView: 2
					},
					1080: {
						slidesPerView: 3,
						spaceBetween: 24
					}
				}
			});
		}
	}
})