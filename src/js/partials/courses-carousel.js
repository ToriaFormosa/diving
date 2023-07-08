$(window).on('load', function() {
	let coursesEl = document.querySelector('.__js_courses-carousel-2');

	if (coursesEl) {
		initCoursesCarousel();

		function initCoursesCarousel() {
			let coursesCarousel2 = new Swiper(coursesEl, {
				slidesPerView: 1,
				spaceBetween: 10,
				speed: 300,
				loop: true,
				navigation: {
					prevEl: '.courses__prev',
					nextEl: '.courses__next'
				},
				breakpoints: {
					640: {
						slidesPerView: 2
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 25,
					},
					1080: {
						slidesPerView: 3,
						spaceBetween: 25,
					},
				}
			});
		}
	}
})