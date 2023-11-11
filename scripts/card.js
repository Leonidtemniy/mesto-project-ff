import { openPopup } from './modal.js';
const templateEl = document.querySelector('#card-template').content;

function deleteCard(evt) {
  const cardToDelete = evt.target.closest('.card');
  cardToDelete.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function createCard(data) {
  const newCardEl = templateEl.querySelector('.card').cloneNode(true);
  const newCardTitle = newCardEl.querySelector('.card__title');
  const newCardImage = newCardEl.querySelector('.card__image');
  newCardTitle.textContent = data.name;
  newCardImage.src = data.link;
  newCardImage.alt = 'Фотография ' + data.name;
  //=======Реализация кнопки удаления=====//

  const deleteBtn = newCardEl.querySelector('.card__delete-button');
  deleteBtn.addEventListener('click', deleteCard);

  //=======Реализация кнопки лайк======//

  const LikeBtn = newCardEl.querySelector('.card__like-button');
  LikeBtn.addEventListener('click', likeCard);

  //=======Реализация  попапа с большой картинкой=====//

  const popupTypeImage = document.querySelector('.popup_type_image');
  newCardImage.addEventListener('click', () => {
    openPopup(popupTypeImage);
    const bigImg = popupTypeImage.querySelector('.popup__image');
    const popupCaption = popupTypeImage.querySelector('.popup__caption');
    bigImg.src = newCardImage.src;
    bigImg.alt = newCardImage.alt;
    popupCaption.textContent = bigImg.alt.replace('Фотография', '');
  });

  return newCardEl;
}
export { createCard, deleteCard };
