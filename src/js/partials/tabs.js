window.addEventListener('load', () => {
  const html = document.documentElement;
  const tabs = document.querySelectorAll('.tabs__item button');
  const tabContents = document.querySelectorAll('.tab-content');
  let choices = null;
  let resizeId = null;

  if (tabs.length && tabContents.length) {

    tabs.forEach(it => it.addEventListener('click', function() {
      const firstLet = this.dataset.target[0];
      const target = this.dataset.target.slice(1);
      
      if (document.querySelector(firstLet + target)) {
        

        if (html.clientWidth < 768 && this.parentElement.classList.contains("active")) {
          this.parentElement.classList.remove('active');
          document.querySelector('.tab-content.active').classList.remove('active');
        } else {
          changeActive(this, target);
        }
      }
    }));

    function changeActive(current, target) {
      tabs.forEach(it => it.parentElement.classList[it === current ? 'add' : 'remove']('active'));

      tabContents.forEach(it => {
        it.classList[it.id === target ? 'add' : 'remove']('active');
      });
    }

    if (html.clientWidth < 768) {
      //choices = window.initChoices(select);
    }

    window.addEventListener('resize', () => {
      //resetTabs();
      //clearTimeout(resizeId);
      //resizeId = setTimeout(changeChoicesState, 150);
    });



    function resetTabs() {
 
      document.querySelector('.tabs__item.active').classList.remove('active');
      tabs[0].parentElement.classList.add('active');
      document.querySelector('.tab-content.active').classList.remove('active');
      tabContents[0].classList.add('active');
    }
  }
});