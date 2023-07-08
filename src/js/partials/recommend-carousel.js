window.addEventListener('load', () => {
	const elems = document.querySelectorAll('.__js_recommend-carousel');

	if (elems.length) {
		elems.forEach(elem => {
			if (elem) {
				initRecommendCarousel(elem);
			}
		});
	}

	function initRecommendCarousel(el) {
		let recommendCarousel = new Swiper(el, {
			slidesPerView: 'auto',
			speed: 300,
			spaceBetween: 24,
			observer: true,
			observeParents: true,
			pagination: {
				el: el.nextElementSibling.querySelector('.recommend__pagination'),
				type: 'bullets',
				clickable: true
			},
			navigation: {
				prevEl: el.nextElementSibling.querySelector(' .recommend__prev'),
				nextEl: el.nextElementSibling.querySelector(' .recommend__next')
			},
		});
	}
})