//в файле modal.js описаны функции для работы с модальными окнами: функция открытия модального окна, функция закрытия модального окна, функция-обработчик события нажатия Esc и функция-обработчик события клика по оверлею

import { createCard } from './card.js';
import { cardsContainer } from './index.js';

//==============Глобальные перенменные для реализации попапов==========//
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popTypeNewCard = document.querySelector('.popup_type_new-card');
const allPopups = document.querySelectorAll('.popup');

//=================Функции реализации открытия/закрытия попапов=========//
profileEditBtn.addEventListener('click', () => {
  openPopup(popupTypeEdit);
});
profileAddBtn.addEventListener('click', () => {
  openPopup(popTypeNewCard);
});

export function openPopup(popUpSelector) {
  popUpSelector.classList.add('popup_is-animated', 'popup_is-opened');

  addEventListener();
}
function closePopup(popUpSelector) {
  popUpSelector.classList.remove('popup_is-opened', 'popup_is-animated');

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

//==================Реализация закрытия попапов крестом===========//
allPopups.forEach(popup => {
  const popupCloseBtn = popup.querySelector('.popup__close');
  if (popupCloseBtn) {
    popupCloseBtn.addEventListener('click', () => {
      closePopup(popup);
    });
  }
});
//=================Реализация попапа с картинкой==============//
function popUpWithImg() {
  const cardImgs = document.querySelectorAll('.card__image');
  const popupTypeImage = document.querySelector('.popup_type_image');

  cardImgs.forEach(cardImg => {
    cardImg.addEventListener('click', () => {
      openPopup(popupTypeImage);
      const bigImg = popupTypeImage.querySelector('.popup__image');
      const popupCaption = popupTypeImage.querySelector('.popup__caption');
      bigImg.src = cardImg.src;
      bigImg.alt = cardImg.alt;
      popupCaption.textContent = bigImg.alt.replace('Фотография', '');
    });
  });
}
popUpWithImg();
//=================Реализация логики работы форм============///
const editProfileForm = document.forms['edit-profile'];
const newPlaceForm = document.forms['new-place'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

editProfileForm.name.value = profileTitle.textContent;
editProfileForm.description.value = profileDescription.textContent;

editProfileForm.addEventListener('submit', evt => {
  evt.preventDefault();
  profileTitle.textContent = editProfileForm.name.value;
  profileDescription.textContent = editProfileForm.description.value;
  closePopup(popupTypeEdit);
});

newPlaceForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const dataFromAddForm = {};
  dataFromAddForm.name = newPlaceForm['place-name'].value;
  dataFromAddForm.link = newPlaceForm['link'].value;
  const newUserCard = createCard(dataFromAddForm);
  cardsContainer.prepend(newUserCard);
  newPlaceForm.reset();
  closePopup(popTypeNewCard);
  popUpWithImg();
});
