$(window).on('load', function() {
	let productsEl = document.querySelector('.__js_products-carousel-2');

	if (productsEl) {
		initProductsCarousel();

		function initProductsCarousel() {
			let productsCarousel = new Swiper(productsEl, {
				slidesPerView: 1,
				speed: 300,
				spaceBetween: 14,
				loop: true,
				navigation: {
					prevEl: '.products__prev',
					nextEl: '.products__next'
				},
				pagination: {
					el: '.products__pagination',
					type: 'bullets',
					clickable: true
				},
				breakpoints: {
					768: {
						slidesPerView: 2
					},
					1080: {
						slidesPerView: 3,
					},
					1280: {
						slidesPerView: 4,
						spaceBetween: 24
					}
				}
			});
		}
	}
})