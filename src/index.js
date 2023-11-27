import './pages/index.css';
import './scripts/modal.js';
import './scripts/card.js';
import './scripts/cards.js';
import './scripts/validation.js';

import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { openPopup, closePopup, handleImageClick } from './scripts/modal.js';

const cardsContainer = document.querySelector('.places__list');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const allPopups = document.querySelectorAll('.popup');
const editProfileForm = document.forms['edit-profile'];
const newPlaceForm = document.forms['new-place'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

//====================Отрисовка карточек на стронице=============//
initialCards.forEach(cards => {
  const newCard = createCard(cards, { deleteCard, likeCard, handleImageClick });
  cardsContainer.append(newCard);
});
//==================Обработчики кнопок  из modal.js=================//
profileEditBtn.addEventListener('click', () => {
  editProfileForm.name.value = profileTitle.textContent;
  editProfileForm.description.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
});
profileAddBtn.addEventListener('click', () => {
  openPopup(popupTypeNewCard);
});

//==================Реализация закрытия попапов крестом===========//
allPopups.forEach(popup => {
  const popupCloseBtn = popup.querySelector('.popup__close');
  if (popupCloseBtn) {
    popupCloseBtn.addEventListener('click', () => {
      closePopup(popup);
    });
  }
});

//===============Реализация логики работы сабмита форм==========///

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
  const newUserCard = createCard(dataFromAddForm, { deleteCard, likeCard, handleImageClick });
  cardsContainer.prepend(newUserCard);
  newPlaceForm.reset();
  closePopup(popupTypeNewCard);
});
