window.addEventListener('load', () => {
	const footerParent = document.querySelector('.footer');
	let expandBtn = footerParent.querySelectorAll('.footer__accordion-item');

	if (window.matchMedia('(max-width: 1079px)').matches) {
		if (footerParent) {
			expandBtn.forEach(function (elem) {
				elem.addEventListener('click', function (e) {
					e.preventDefault();

					let content = elem.nextElementSibling;

					elem.classList.toggle('rotate');

					if (!content.classList.contains('open')) {
						content.classList.add('open');
						content.style.height = 'auto';

						let height = content.clientHeight + 'px';
						content.style.height = '0px';

						setTimeout(function () {
							content.style.height = height;
						}, 0);
					} else {
						content.style.height = '0px';
						content.addEventListener('transitionend', function () {
							content.classList.remove('open');
						}, {once: true});
					}
				});
			});
		}
	}
});