const templateEl = document.querySelector('#card-template').content;

function createCard(data, { deleteCard, likeCard, unLikeCard, handleImageClick, myId }) {
  const newCardEl = templateEl.querySelector('.card').cloneNode(true);
  const newCardTitle = newCardEl.querySelector('.card__title');
  const newCardImage = newCardEl.querySelector('.card__image');
  const likeBtn = newCardEl.querySelector('.card__like-button');
  const deleteBtn = newCardEl.querySelector('.card__delete-button');
  const likeCounter = newCardEl.querySelector('.card__likecount');
  const cardId = data._id;

  newCardTitle.textContent = data.name;
  newCardImage.src = data.link;
  newCardImage.alt = 'Фотография ' + data.name;
  likeCounter.textContent = data.likes.length;

  // ===========   проверка есть ли мой лайк на карточке==============//
  if (data.likes.some(like => like._id === myId)) {
    likeBtn.classList.add('card__like-button_is-active');
  }
  //============= проверка моя ли карточка если да то оставляем урну======//
  if (data.owner._id === myId) {
    deleteBtn.addEventListener('click', () => {
      deleteCard(cardId)
        .then(data => {
          newCardEl.remove();
          console.log(`Удаление успешно${data}`);
        })
        .catch(err => {
          console.log(`Ошибка${err}`);
        });
    });
  } else {
    deleteBtn.remove();
  }
  //=========Реализация обработчиков, функции передаються вторым параметром(объетом)=======//

  likeBtn.addEventListener('click', () => {
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

export { createCard };
