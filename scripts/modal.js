//в файле modal.js описаны функции для работы с модальными окнами: функция открытия модального окна, функция закрытия модального окна, функция-обработчик события нажатия Esc и функция-обработчик события клика по оверлею
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popTypeNewCard = document.querySelector('.popup_type_new-card');
const allPopups = document.querySelectorAll('.popup');

profileEditBtn.addEventListener('click', () => {
  openPopup(popupTypeEdit);
});
profileAddBtn.addEventListener('click', () => {
  openPopup(popTypeNewCard);
});

function openPopup(popUpSelector) {
  popUpSelector.classList.add('popup_is-opened');
  addEventListener();
}
function closePopup(popUpSelector) {
  popUpSelector.classList.remove('popup_is-opened');
  removeEventListener();
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}
function closeByOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}
function addEventListener() {
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByOverlayClick);
}
function removeEventListener() {
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('click', closeByOverlayClick);
}

allPopups.forEach(popup => {
  const popupCloseBtn = popup.querySelector('.popup__close');
  if (popupCloseBtn) {
    popupCloseBtn.addEventListener('click', () => {
      closePopup(popup);
    });
  }
});
