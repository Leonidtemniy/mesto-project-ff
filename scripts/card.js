//в файле card.js описаны функции для работы с карточками: функция создания карточки, функции-обработчики событий удаления и лайка карточки;

const templateEl = document.querySelector('#card-template').content;

function deleteCard(evt) {
  const cardToDelet = evt.target.closest('.card');
  cardToDelet.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function createCard(template) {
  const newCardEl = templateEl.querySelector('.card').cloneNode(true);
  const newCardTitle = newCardEl.querySelector('.card__title');
  const newCardImage = newCardEl.querySelector('.card__image');
  newCardTitle.textContent = template.name;
  newCardImage.src = template.link;
  newCardImage.alt = 'Фотография ' + template.name;

  const deleteBtn = newCardEl.querySelector('.card__delete-button');
  deleteBtn.addEventListener('click', deleteCard);

  const LikeBtn = newCardEl.querySelector('.card__like-button');
  LikeBtn.addEventListener('click', likeCard);

  return newCardEl;
}
export { createCard, deleteCard };
