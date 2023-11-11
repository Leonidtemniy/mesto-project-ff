//=================Функции реализации открытия/закрытия попапов=========//
const popupTypeImage = document.querySelector('.popup_type_image');
const bigImg = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

export function openPopup(popUpSelector) {
  popUpSelector.classList.add('popup_is-animated', 'popup_is-opened');
  setCloseEventListener();
}
export function closePopup(popUpSelector) {
  popUpSelector.classList.remove('popup_is-opened', 'popup_is-animated');
  removeCloseEventListener();
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
function setCloseEventListener() {
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByOverlayClick);
}
function removeCloseEventListener() {
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('click', closeByOverlayClick);
}

//
export function handleImageClick(newCardImage) {
  openPopup(popupTypeImage);
  bigImg.src = newCardImage.src;
  bigImg.alt = newCardImage.alt;
  popupCaption.textContent = bigImg.alt.replace('Фотография', '');
}