window.addEventListener('load', () => {
  const tagsBlock = document.querySelector('.tags-block');
  const tags = document.querySelectorAll('.tags-block__item');
  const select = document.querySelector('.__js_tags-select');
  const modClass = 'tags-block__item--checked';

  if (tags.length && select && tagsBlock) {
    let choices = window.initChoices(select);

    tagsBlock.addEventListener('click', e => {
      const target = e.target.closest('.tags-block__item');

      if (target) {
        e.preventDefault();

        if (target.classList.contains(modClass)) {
          target.classList.remove(modClass);
          target.blur();
        } else {
          const active = tagsBlock.querySelector('.' + modClass);
          if (active) {
            active.classList.remove(modClass);
          }
          target.classList.add(modClass);
        }
      }
    });
  }
  
});