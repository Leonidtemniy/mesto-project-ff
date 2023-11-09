// в файле index.js описана инициализация приложения и основная логика страницы: поиск DOM-элементов на странице и навешивание на них обработчиков событий; обработчики отправки форм, функция-обработчик события открытия модального окна для редактирования профиля; функция открытия модального окна изображения карточки. Также в index.js находится код, который отвечает за отображение шести карточек при открытии страницы.
import '../pages/index.css';
import '../scripts/modal.js';
import '../scripts/card.js';
import '../scripts/cards.js';

import { initialCards } from '../scripts/cards.js';
import { createCard } from '../scripts/card.js';
import { popUpWithImg } from '../scripts/modal.js';

export const cardsContainer = document.querySelector('.places__list');

//====================Отрисовка карточек на стронице=============//
initialCards.forEach(cards => {
  const newCard = createCard(cards);
  popUpWithImg();
  cardsContainer.append(newCard);
});
