$(window).on('load', function() {
	

	const defaultChoicesOptions = {
		silent: false,
		items: [],
		choices: [],
		renderChoiceLimit: -1,
		maxItemCount: -1,
		addItems: true,
		addItemFilter: null,
		removeItems: true,
		removeItemButton: false,
		editItems: false,
		duplicateItemsAllowed: true,
		delimiter: ',',
		paste: true,
		searchEnabled: false,
		searchChoices: true,
		searchFloor: 1,
		searchResultLimit: 4,
		searchFields: ['label', 'value'],
		position: 'auto',
		resetScrollPosition: true,
		shouldSort: false,
		shouldSortItems: false,
		placeholder: true,
		placeholderValue: null,
		searchPlaceholderValue: null,
		prependValue: null,
		appendValue: null,
		renderSelectedChoices: 'auto',
		loadingText: 'Loading...',
		noResultsText: 'No results found',
		noChoicesText: 'No choices to choose from',
		itemSelectText: '',//'Press to select',
		/*addItemText: (value) => {
			return `Press Enter to add <b>"${value}"</b>`;
		},
		maxItemText: (maxItemCount) => {
			return `Only ${maxItemCount} values can be added`;
		},
		valueComparer: (value1, value2) => {
			return value1 === value2;
		},*/
		classNames: {
			containerOuter: 'choices',
			containerInner: 'choices__inner',
			input: 'choices__input',
			inputCloned: 'choices__input--cloned',
			list: 'choices__list',
			listItems: 'choices__list--multiple',
			listSingle: 'choices__list--single',
			listDropdown: 'choices__list--dropdown',
			item: 'choices__item',
			itemSelectable: 'choices__item--selectable',
			itemDisabled: 'choices__item--disabled',
			itemChoice: 'choices__item--choice',
			placeholder: 'choices__placeholder',
			group: 'choices__group',
			groupHeading: 'choices__heading',
			button: 'choices__button',
			activeState: 'is-active',
			focusState: 'is-focused',
			openState: 'is-open',
			disabledState: 'is-disabled',
			highlightedState: 'is-highlighted',
			selectedState: 'is-selected',
			flippedState: 'is-flipped',
			loadingState: 'is-loading',
			noResults: 'has-no-results',
			noChoices: 'has-no-choices'
		},
		// Choices uses the great Fuse library for searching. You
		// can find more options here: https://github.com/krisk/Fuse#options
		fuseOptions: {
			include: 'score'
		},
		callbackOnInit: null,
		callbackOnCreateTemplates: null
	};

	function initChoices(it, options) {
		return new Choices(it, options || defaultChoicesOptions);
	}

	const selects = document.querySelectorAll('.__js_custom-select');

	if (selects.length) {
		selects.forEach(it => {
			initChoices(it);
		});
	}

	window.initChoices = initChoices;

	document.querySelectorAll('.anchor').forEach(function(el) {
		el.onclick = function(e) {
			e.preventDefault();
			let hash = this.getAttribute('href');
			let target = document.querySelector(hash);
			let elementPosition = target.offsetTop;

			window.scrollTo({
				top: elementPosition,
				behavior: "smooth"
			});
		};
	});

	// Close preloader
	document.body.classList.add('hide-preloader-opacity');
	window.setTimeout(function () {
		document.body.classList.add('loaded');
		document.body.classList.remove('hide-preloader-opacity');
	}, 600);

	// Shop menu
	document.querySelectorAll('.shop-categories__submenu').forEach(function (el) {
		el.style.minHeight = document.querySelector('.shop-categories__menu').offsetHeight + 'px';
	});

	// Filters
	if (window.matchMedia('(max-width: 1079px)').matches) {
		var filter = $('.filters'),
				showFilter = $('.inner-page__filter-btn');

		if (filter) {
			showFilter.click(function () {
				filter.slideToggle(300);
			});
		}
	}
});