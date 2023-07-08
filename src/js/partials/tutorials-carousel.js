$(window).on('load', function() {
	let tutorialsEl = document.querySelectorAll('.__js_tutorials-carousel');

	if (tutorialsEl.length) {
		initTutorialsCarousel();

		function initTutorialsCarousel() {
			tutorialsEl.forEach(it => {
				let tutorialsCarousel = new Swiper(it, {
					slidesPerView: 'auto',
					speed: 300,
					spaceBetween: 24,
					loop: true,
					navigation: {
						prevEl: it.nextElementSibling.querySelector('.tutorials__prev'),
						nextEl: it.nextElementSibling.querySelector('.tutorials__next')
					},
					pagination: {
						el: it.nextElementSibling.querySelector('.tutorials__pagination'),
						type: 'bullets',
						clickable: true
					},
					/*breakpoints: {
						768: {
							slidesPerView: 2
						},
						1080: {
							slidesPerView: 3,
							spaceBetween: 24
						},
						1280: {
							slidesPerView: 4
						}
					}*/
				});
			})
			
		}
	}
})