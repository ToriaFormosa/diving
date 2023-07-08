window.addEventListener('load', () => {
  const orderStatus = document.querySelector('.__js_order-status');
  const discountStatus = document.querySelector('.__js_discount-status');

  if (orderStatus) {
    const steps = orderStatus.querySelectorAll('.order-status__step');
    const separators = orderStatus.querySelectorAll('.order-status__scale-sep');
    const line = orderStatus.querySelector('.order-status__scale-line');
    const currentStatus = parseInt(orderStatus.dataset.status, 10);
    const ModifierClass = {
      STEP_DONE: 'order-status__step--done',
      STEP_ACTIVE: 'order-status__step--active',
      SEP_DONE: 'order-status__scale-sep--done'
    };

    line.style.width = (currentStatus * 25) + '%';

    steps.forEach((it, index) => {
      if (index + 1 < currentStatus) {
        it.classList.add(ModifierClass.STEP_DONE);
      } else if (index + 1 === currentStatus) {
        it.classList.add(ModifierClass.STEP_ACTIVE);
      }
    });

    separators.forEach((it, index, arr) => {
      if (currentStatus < 4) {
        if (index < currentStatus * 4) {
          it.classList.add(ModifierClass.SEP_DONE);
        }
      } else {
        it.classList.add(ModifierClass.SEP_DONE);
      }
      
    });
  }

  if (discountStatus) {
    const separators = discountStatus.querySelectorAll('.discount-status__sep');
    const line = discountStatus.querySelector('.discount-status__line');
    const thumb = discountStatus.querySelector('.discount-status__thumb');
    const currentProgress = parseInt(discountStatus.dataset.progress, 10);

    const ModifierClass = {
      THUMB_SHIFT: 'discount-status__thumb--shifted',
      SEP_ACTIVE: 'discount-status__sep--active',
      SEP_DONE: 'discount-status__sep--done'
    };

    const ValidIndex = {
      START: 2,
      END: 23
    };

    const index = Math.floor(currentProgress / 4);
    const lastDoneSepOffset = separators[index - 1].offsetLeft;
    const percent = lastDoneSepOffset * 100  / discountStatus.offsetWidth;

    line.style.width = percent + '%';

    separators.forEach((it, i) => {
      
        if (i < index) {
          it.classList.add(ModifierClass.SEP_DONE);
        }
      
      
    });

    if (index >= ValidIndex.START && index <= ValidIndex.END) {
      thumb.classList.add(ModifierClass.THUMB_SHIFT);
      thumb.style.left = percent + '%';

    } else if (index > ValidIndex.END) {
      thumb.style.left = 'auto';
      thumb.style.right = '0';
    }

    if (index === ValidIndex.END - 2 || index === ValidIndex.END - 1) {
      thumb.style.bottom = '65px';
    } else if (index >= ValidIndex.END) {
      thumb.style.bottom = '80px';
    }
  }
});