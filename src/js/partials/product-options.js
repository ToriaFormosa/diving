window.addEventListener('load', () => {
  const productCardSelects = document.querySelectorAll('.__js_custom-options-select');

	if (productCardSelects.length) {
    const links = document.querySelectorAll('.__js_show-explain');

    links.forEach(it => it.addEventListener('click', e => {
      e.preventDefault();

      $.fancybox.open({
        src: it.getAttribute('href'),
        type: 'inline'
      });
    }));

		productCardSelects.forEach(it => {
			window.initChoices(it, {
				silent: false,
				searchEnabled: false,
				searchChoices: true,
				shouldSort: false,
				shouldSortItems: false,
				placeholder: true,
				itemSelectText: '',//'Press to select',
			});
		});
	}
})