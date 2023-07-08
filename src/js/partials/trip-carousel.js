$(window).on('load', function() {
	let tripEl = document.querySelector('.__js_trip-carousel');

	if (tripEl) {
		initTripCarousel();

		function initTripCarousel() {
			let tripCarousel = new Swiper(tripEl, {
				slidesPerView: 1,
				speed: 300,
				spaceBetween: 14,
				loop: true,
				navigation: {
					prevEl: '.trip__prev',
					nextEl: '.trip__next'
				},
				breakpoints: {
					768: {
						slidesPerView: 2,
						spaceBetween: 24
					},
				}
			});
		}
	}
})