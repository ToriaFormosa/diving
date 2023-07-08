$(window).on('load', function() {
	let stockEl = document.querySelector('.__js_stock-carousel');

	if (stockEl) {
		let width = document.documentElement.clientWidth,
				isInit = false,
				stockCarousel = null;
		const breakpoint = 1279;

		if (width <= breakpoint) {
			initStockCarousel();
			isInit = true;
		}

		window.addEventListener('resize', () => {
			width = document.documentElement.clientWidth;

			if (width <= breakpoint && !isInit) {
				initStockCarousel();
				isInit = true;
			} else if (width > breakpoint && isInit) {
				stockCarousel.destroy();
				isInit = false;
			}
		});

		function initStockCarousel() {
			stockCarousel = new Swiper(stockEl, {
				slidesPerView: 1,
				speed: 300,
				spaceBetween: 10,
				loop: true,
				navigation: {
					prevEl: '.stock__prev',
					nextEl: '.stock__next'
				},
				pagination: {
					el: '.stock__pagination',
					type: 'bullets',
					clickable: true
				},
				breakpoints: {
					561: {
						slidesPerView: 2
					},
					768: {
						slidesPerView: 3
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