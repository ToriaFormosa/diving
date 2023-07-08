$(window).on('load', function() {
	var header = $('.header:not(.header--homepage)');

	if (header.length) {
		var headerOffset = header.offset().top;
		var headerHeight = header.outerHeight();
	}

	var classes = 'header--fixed';
	var scroll = $(window).scrollTop();
	var isScroll = false;
	var isNotStatic = header.hasClass('header--half') && $(window).width() >= mobileBreakpoint ? true : false;

	$(window).on('scroll', function() {
		scroll = $(window).scrollTop();

		if (scroll >= headerOffset + headerHeight) {
			isScroll = true;

			headerHeight = isScroll ? header.outerHeight() : null;
			header.addClass(classes);

			if (!header.hasClass('is-fixed')) {
				header.css({'top': -headerHeight + 'px', 'transform': ' translateY(' + headerHeight + 'px)'}).addClass('is-fixed');

				if (!isNotStatic) {
					$('body').css('padding-top', headerHeight + 'px');
				}
			}
		} else {
			isScroll = false;
			header.removeClass(classes + ' is-fixed').removeAttr('style');
			$('body').css('padding-top', 0);

			if (!isNotStatic) {
				//body.css('padding-top', 0);
			}
		}
	});

	$(window).on('resize', function() {
		headerHeight = header.outerHeight();
		isNotStatic = header.hasClass('header--half') && $(window).width() >= mobileBreakpoint ? true : false;

		if (scroll >= headerOffset + headerHeight && isScroll) {
			header.css({'top': -headerHeight + 'px', 'transform': 'translateY(' + headerHeight + 'px)'});
			//body.css('padding-top', headerHeight + 'px');

			if (!isNotStatic) {
				$('body').css('padding-top', headerHeight + 'px');
			}
		}
	});
});