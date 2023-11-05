// в файле index.js описана инициализация приложения и основная логика страницы: поиск DOM-элементов на странице и навешивание на них обработчиков событий; обработчики отправки форм, функция-обработчик события открытия модального окна для редактирования профиля; функция открытия модального окна изображения карточки. Также в index.js находится код, который отвечает за отображение шести карточек при открытии страницы.
import { initialCards } from './cards.js';
import { createCard } from './card.js';

const cardsContainer = document.querySelector('.places__list');

initialCards.forEach(cards => {
  const newCard = createCard(cards);
  cardsContainer.append(newCard);
});
