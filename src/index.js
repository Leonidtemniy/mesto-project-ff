////=======Импорты, конфиги, константы======////
import './pages/index.css';

import { createCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import {
  getInitialCards,
  getUserInfo,
  editProfileInfo,
  editProfileAvatar,
  sendMyCard,
  likeCard,
  unLikeCard,
  deleteCard
} from './scripts/api.js';

//========Конфиг для валидации=========//
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

const popupTypeImage = document.querySelector('.popup_type_image');
const bigImg = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

//====================Отрисовка карточек на стронице c сервера=============//

//============Два промиса=========//
Promise.all([getInitialCards(), getUserInfo()])
  .then(([cardsData, userData]) => {
    console.log(cardsData);
    console.log(userData);

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    const myId = userData._id;

    cardsData.forEach(card => {
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

//==================Обработчики кнопок  из modal.js=================//
profileEditBtn.addEventListener('click', () => {
  clearValidation(popupTypeEdit, validationSettings);
  openPopup(popupTypeEdit);
});

profileAddBtn.addEventListener('click', () => {
  clearValidation(popupTypeNewCard, validationSettings);
  openPopup(popupTypeNewCard);
});
profileImage.addEventListener('click', () => {
  clearValidation(popupTypeNewAvatar, validationSettings);
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

  sendMyCard(myCardName, myCardLink)
    .then(data => {
      const myId = data.owner._id;
      const newCard = createCard(data, {
        deleteCard,
        likeCard,
        unLikeCard,
        handleImageClick,
        myId
      });
      cardsContainer.prepend(newCard);
      closePopup(popupTypeNewCard);
    })
    .catch(err => {
      console.log(`Ошибка сервера: ${err}`);
    });
});

//=============Открытие картинки карточки на весь экран=====///
function handleImageClick(newCardImage) {
  openPopup(popupTypeImage);
  bigImg.src = newCardImage.src;
  bigImg.alt = newCardImage.alt;
  popupCaption.textContent = bigImg.alt.replace('Фотография', '');
}

//=========Изменение надписи на кнопки сабмита======//
function duringLoadingText(form) {
  const submitBtn = form.querySelector('.popup__button');
  submitBtn.textContent = 'Сохранение...';
}
function afterLoadingText(form) {
  const submitBtn = form.querySelector('.popup__button');
  submitBtn.textContent = 'Сохранить';
}
//=========Запуск Валидации=======//
enableValidation(validationSettings);
