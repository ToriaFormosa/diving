$(window).on('load', function() {
	let reviewsEl = document.querySelector('.__js_reviews-carousel');

	if (reviewsEl) {
		initReviewsCarousel();

		function initReviewsCarousel() {
			let reviewsCarousel = new Swiper(reviewsEl, {
				slidesPerView: 1,
				speed: 300,
				spaceBetween: 25,
				loop: true,
				navigation: {
					prevEl: '.reviews__prev',
					nextEl: '.reviews__next'
				},
				pagination: {
					el: '.reviews__pagination',
					type: 'bullets',
					clickable: true
				}
			});
		}
	}
})