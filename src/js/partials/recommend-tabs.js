window.addEventListener('load', () => {
	const html = document.documentElement;
	const tabsWrapper = document.querySelector('.recommend__tabs');

	const ModifierClass = {
		ANIMATE: 'animate',
		SHOWN: 'is-shown',
		HIDDEN: 'is-hidden',
		ACTIVE: 'active',
		SELECTED: 'is-selected',
		HIGHLIGHTED: 'is-highlighted'
	};

	const breakpoint = 1079;

	if (tabsWrapper) {
		const tabsRecommend = tabsWrapper.querySelectorAll('.recommend__tabs button');

		const select = document.querySelector('.recommend__wrapper select');
		const choices = document.querySelector('.choices');

		if (html.clientWidth > breakpoint) {
			tabsWrapper.onclick = onTabsWrapperClick;
		} else {
			select.onchange = onSelectChange;
		}

		window.addEventListener('resize', () => {
			if (html.clientWidth > breakpoint) {
				tabsWrapper.onclick = onTabsWrapperClick;
				select.onchange = null;
			} else {
				tabsWrapper.onclick = null;
				select.onchange = onSelectChange;
			}
		})

		

		function changeActive(currentTarget) {
			tabsWrapper.querySelector('.' + ModifierClass.ACTIVE).classList.remove(ModifierClass.ACTIVE);
			tabsWrapper.querySelector('[data-target="' + currentTarget + '"]').classList.add(ModifierClass.ACTIVE);

			const activeContent = document.querySelector('.recommend__content-item.is-shown');
			const targetContent = document.querySelector('.recommend__content-item[data-id="' + currentTarget + '"]');

			if (activeContent !== targetContent) {
				activeContent.classList.add(ModifierClass.ANIMATE);
				activeContent.classList.remove(ModifierClass.SHOWN);

				activeContent.ontransitionend = () => {
					activeContent.ontransitionend = null;
					activeContent.classList.remove(ModifierClass.ANIMATE);
					activeContent.classList.add(ModifierClass.HIDDEN);
					
					targetContent.classList.add(ModifierClass.ANIMATE);
					targetContent.classList.remove(ModifierClass.HIDDEN);
					targetContent.classList.add(ModifierClass.SHOWN);

					targetContent.ontransitionend = () => {
						targetContent.ontransitionend = null;
						targetContent.classList.remove(ModifierClass.ANIMATE);
					}
				}
			}
		}

		function onTabsWrapperClick(e) {
			const currentTarget = e.target.closest('button').dataset.target;

			if (currentTarget) {
				changeActive(currentTarget);

				select.options[0].value = currentTarget;
				select.options[0].textContent = e.target.closest('button').textContent;

				const choicesSelected = choices.querySelector('.' + ModifierClass.SELECTED);
				const choicesTarget = choices.querySelector('.choices__item[data-value="' + currentTarget + '"]');
				const choicesCurrent = choices.querySelector('.choices__list--single .choices__item');

				choicesSelected.classList.remove(ModifierClass.SELECTED);
				choicesSelected.classList.remove(ModifierClass.HIGHLIGHTED);
				choicesTarget.classList.add(ModifierClass.SELECTED);
				choicesTarget.classList.add(ModifierClass.HIGHLIGHTED);

				choicesCurrent.textContent = choicesTarget.textContent;
				choicesCurrent.dataset.value = choicesTarget.dataset.value;
				choicesCurrent.dataset.id = choicesTarget.dataset.id;
				
			}
		};

		function onSelectChange() {
			changeActive(this.value);
		}
	}
})