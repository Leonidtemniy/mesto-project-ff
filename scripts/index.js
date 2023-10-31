// @todo: Темплейт карточки
const templateEl = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
// @todo: DOM узлы
// @todo: Функция удаления карточки
function deleteCard(evt) {
  const cardToDelet = evt.target.closest('.card');
  cardToDelet.remove();
}
// @todo: Функция создания карточки
function createCard(template) {
  const newCardEl = templateEl.querySelector('.card').cloneNode(true);
  const newCardTitle = newCardEl.querySelector('.card__title');
  const newCardImage = newCardEl.querySelector('.card__image');
  newCardTitle.textContent = template.name;
  newCardImage.src = template.link;
  newCardImage.alt = 'Фотография ' + template.name;

  const deleteBtn = newCardEl.querySelector('.card__delete-button');
  deleteBtn.addEventListener('click', deleteCard);
  return newCardEl;
}

// @todo: Вывести карточки на страницу
initialCards.forEach(cards => {
  const newCard = createCard(cards);
  cardsContainer.append(newCard);
});
