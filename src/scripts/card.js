const templateEl = document.querySelector('#card-template').content;

function deleteCard(evt) {
  const cardToDelete = evt.target.closest('.card');
  cardToDelete.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function createCard(data, { deleteCard, likeCard, handleImageClick }) {
  const newCardEl = templateEl.querySelector('.card').cloneNode(true);
  const newCardTitle = newCardEl.querySelector('.card__title');
  const newCardImage = newCardEl.querySelector('.card__image');
  const likeBtn = newCardEl.querySelector('.card__like-button');
  const deleteBtn = newCardEl.querySelector('.card__delete-button');

  newCardTitle.textContent = data.name;
  newCardImage.src = data.link;
  newCardImage.alt = 'Фотография ' + data.name;

  //=========Реализация обработчиков, функции передаються вторым параметром(объетом)=======//
  deleteBtn.addEventListener('click', deleteCard);
  likeBtn.addEventListener('click', likeCard);
  newCardImage.addEventListener('click', () => {
    handleImageClick(newCardImage);
  });

  return newCardEl;
}
export { createCard, deleteCard, likeCard };
