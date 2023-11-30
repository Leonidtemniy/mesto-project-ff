const templateEl = document.querySelector('#card-template').content;

function deleteCard(evt) {
  const cardToDelete = evt.target.closest('.card');
  cardToDelete.remove();
}

// function likeCard(evt) {
// evt.target.classList.toggle('card__like-button_is-active');
// }

function createCard(data, { deleteCard, likeCard, unLikeCard, handleImageClick }) {
  const newCardEl = templateEl.querySelector('.card').cloneNode(true);
  const newCardTitle = newCardEl.querySelector('.card__title');
  const newCardImage = newCardEl.querySelector('.card__image');
  const likeBtn = newCardEl.querySelector('.card__like-button');
  const deleteBtn = newCardEl.querySelector('.card__delete-button');
  const likeCounter = newCardEl.querySelector('.card__likecount');

  newCardTitle.textContent = data.name;
  newCardImage.src = data.link;
  newCardImage.alt = 'Фотография ' + data.name;
  likeCounter.textContent = data.likes.length;

  //=========Реализация обработчиков, функции передаються вторым параметром(объетом)=======//
  deleteBtn.addEventListener('click', deleteCard);

  likeBtn.addEventListener('click', () => {
    const cardId = data._id;
    if (likeBtn.classList.contains('card__like-button_is-active')) {
      unLikeCard(cardId)
        .then(updData => {
          likeBtn.classList.remove('card__like-button_is-active');
          likeCounter.textContent = updData.likes.length;
        })
        .catch(err => {
          console.log('Ошибка отмены лайка:' + err);
        });
    } else {
      likeCard(cardId)
        .then(updData => {
          likeBtn.classList.add('card__like-button_is-active');
          likeCounter.textContent = updData.likes.length;
        })
        .catch(err => {
          console.log('Ошибка лайка:' + err);
        });
    }
  });

  newCardImage.addEventListener('click', () => {
    handleImageClick(newCardImage);
  });

  return newCardEl;
}

export { createCard, deleteCard };
