//==============констатнты импорты конфиги===============//

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-1',
  headers: {
    authorization: '03533c45-7143-442b-96f7-8c08f9c7410a',
    'Content-Type': 'application/json'
  }
};

function renderFetch(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка сервера: ${res.status}`);
  }
}

//======GET карточек с сервера====//
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(res => renderFetch(res));
}

//======GET о юзере с сервера====//
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then(res => renderFetch(res));
}
//========Отправка своей карточки на сервер POST=========//
export function sendMyCard(myCardTitle, myCardUrl) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: myCardTitle,
      link: myCardUrl
    })
  }).then(res => renderFetch(res));
}

//========Редактирование информации профиля PATCH====//
export function editProfileInfo(userName, userAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  }).then(res => renderFetch(res));
}
//========Редактирование фото профиля PATCH====//
export function editProfileAvatar(userAvatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: userAvatar
    })
  }).then(res => renderFetch(res));
}
//=========добавление и удаление лайка PUT и DELETE========//
export function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  }).then(res => renderFetch(res));
}

export function unLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  }).then(res => renderFetch(res));
}
//========Удаление карточки Delete=======//
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  }).then(res => renderFetch(res));
}
