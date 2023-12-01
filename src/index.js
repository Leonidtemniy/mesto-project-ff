////=======Импорты, конфиги, константы======////
import './pages/index.css';
import './scripts/modal.js';
import './scripts/card.js';
import './scripts/validation.js';
import './scripts/api.js';

import { createCard } from './scripts/card.js';
import {
  openPopup,
  closePopup,
  handleImageClick,
  duringLoadingText,
  afterLoadingText
} from './scripts/modal.js';
import { enableValidation, resetValidation } from './scripts/validation.js';
import {
  myId,
  getInitialCards,
  getUserInfo,
  editProfileInfo,
  editProfileAvatar,
  sendMyCard,
  likeCard,
  unLikeCard,
  deleteCard
} from './scripts/api.js';

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardsContainer = document.querySelector('.places__list');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const allPopups = document.querySelectorAll('.popup');
const editProfileForm = document.forms['edit-profile'];
const editProfileAvatarForm = document.forms['new-avatar'];
const newPlaceForm = document.forms['new-place'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeNewAvatar = document.querySelector('.popup_type_new-avatar');
const profileImage = document.querySelector('.profile__image');

//====================Отрисовка карточек на стронице c сервера=============//

getInitialCards()
  .then(data => {
    console.log(data);
    data.forEach(card => {
      const newCard = createCard(card, {
        deleteCard,
        likeCard,
        unLikeCard,
        handleImageClick,
        myId
      });
      cardsContainer.append(newCard);
      console.log(card);
    });
  })
  .catch(err => {
    console.log(`Ошибка сервера: ${err}`);
  });
//=========Получение данных userInfo===========//
getUserInfo().then(data => {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
});

//==================Обработчики кнопок  из modal.js=================//
profileEditBtn.addEventListener('click', () => {
  resetValidation(validationSettings);
  openPopup(popupTypeEdit);
});

profileAddBtn.addEventListener('click', () => {
  openPopup(popupTypeNewCard);
});
profileImage.addEventListener('click', () => {
  openPopup(popupTypeNewAvatar);
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
editProfileAvatarForm.addEventListener('submit', evt => {
  evt.preventDefault();
  duringLoadingText(editProfileAvatarForm);
  editProfileAvatar(editProfileAvatarForm.link.value)
    .then(data => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closePopup(popupTypeNewAvatar);
      resetValidation(validationSettings);
      afterLoadingText(editProfileAvatarForm);
    })
    .catch(err => {
      console.log(`Ошибка сервера: ${err}`);
    });
});

editProfileForm.addEventListener('submit', evt => {
  evt.preventDefault();
  duringLoadingText(editProfileForm);
  editProfileInfo(editProfileForm.name.value, editProfileForm.description.value)
    .then(data => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupTypeEdit);
      afterLoadingText(editProfileForm);
    })
    .catch(err => {
      console.log(`Ошибка сервера: ${err}`);
    });
});

newPlaceForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const myCardName = newPlaceForm['place-name'].value;
  const myCardLink = newPlaceForm['link'].value;

  sendMyCard(myCardName, myCardLink).then(data => {
    const newCard = createCard(data, { deleteCard, likeCard, unLikeCard, handleImageClick, myId });
    cardsContainer.prepend(newCard);
    resetValidation(validationSettings);
    closePopup(popupTypeNewCard);
  });
});

enableValidation(validationSettings);
