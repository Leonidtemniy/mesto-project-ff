// @todo: Темплейт карточки
const templateEl = document.querySelector('#card-template');
const cardsContainer = document.querySelector('.places__list');
// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(name, link) {
  const newCardEl = templateEl.cloneNode(true);
  const newCardTitle = document.querySelector('.card__title');
  const newCardImage = document.querySelector('.card__image');
  newCardTitle.textContent = name;
  newCardImage.src = link;
  newCardImage.alt = 'Фотография' + name;
  return newCardEl;
}
// @todo: Функция удаления карточки
function deleteCard() {}
// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  newCardEl = createCard(card);
  cardsContainer.append(newCardEl);
});
