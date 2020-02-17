//переменные
const placesList = document.querySelector('.places-list');

const form = document.forms.new;
const formEdit = document.forms.edit;


//слушатели
document.body.addEventListener('click', openAndClose);
placesList.addEventListener('click', likeHandler);
placesList.addEventListener('click', deleteCard);
form.addEventListener('submit', addNew);
formEdit.addEventListener('submit', edit);
placesList.addEventListener('click', openImage);
form.addEventListener('input', setEventListeners);
formEdit.addEventListener('input', setEventListeners);




//Функции-обработчики

function checkInputValidity(elem, errorMessage) {
  const errorElem = document.querySelector(`#error-${elem.name}`);

  // console.dir(elem);
  if (elem.validity.typeMismatch) {
    return errorElem.textContent = errorMessage.link;
  }
  if (elem.validity.valueMissing) {
    return errorElem.textContent = errorMessage.must;
  } 
  if ((elem.value.length < 2 || elem.value.length > 30) && elem.name !== 'link') {
    return errorElem.textContent = errorMessage.length;
  }
}


function activateError(elem) {
  elem.parentElement.classList.add('popup__input-container_invalid');
}
function resetError(elem) {
  elem.parentElement.classList.remove('popup__input-container_invalid');
}

function setSubmitButtonState(elem, state) {
  if (!state) elem.setAttribute('disabled', true);
  else elem.removeAttribute('disabled');
}


function setEventListeners(event) {
  const errorMessage = {
    must: 'Это обязательное поле',
    length: 'Должно быть от 2 до 30 символов',
    link: 'Здесь должна быть ссылка'
  };

  const inputs = Array.from(event.currentTarget.elements);
  const button = inputs[2];

  let isValid = true;

  inputs.forEach((item) => {
    if (!item.matches('.button')) {
      if (checkInputValidity(item, errorMessage)) {
        activateError(item);
        isValid = false;
      } else {
        resetError(item);
      }
    }
  });

  if (isValid) setSubmitButtonState(button, true);
  else setSubmitButtonState(button, false);
}




function initial(arr) {
  let currentCard;

  arr.forEach(({name, link}) => {
    currentCard = createCard(name, link);
    placesList.insertAdjacentHTML('beforeend', currentCard);
  });

}

function createCard(name, link){
  return (
    `<div class="place-card">
      <div class="place-card__image" style="background: url(${link})">
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name">${name}</h3>
        <button class="place-card__like-icon"></button>
      </div>
    </div>`
  );
}




function openImage(event) {
  const divRoot = document.querySelector('.root');
  let urlImage;
  let currentPopup;

  if (event.target.matches('.place-card__image')) {
    urlImage = event.target.style.backgroundImage.slice(5, -2);
    currentPopup = createPopupCard(urlImage);
    divRoot.insertAdjacentHTML('beforeend', currentPopup);
  }
}

function createPopupCard(url) {
  return (
    `<div class="popup popup_image popup_is-opened">
      <div class="popup__image-wrapper">
        <img class="popup__close" src="./images/close.svg">
        <img src="${url}" class="popup__item">
      </div>
  </div> `
  );
}

function deletePopupCard(target) {
  const current = target.parentElement.parentElement;
  current.remove();
}




function openAndClose(event) {
  if (event.target.matches('.user-info__button')) {
    openAndCloseForm();
  }
  if (event.target.classList.contains('user-info__edit-button')) {
    openAndCloseEditForm();
  }
  if (event.target.matches('.popup_add .popup__close')) {
    openAndCloseForm();
  }
  if (event.target.matches('.popup_edit .popup__close')) {
    openAndCloseEditForm();
  }
  if (event.target.matches('.popup_image .popup__close')) {
    deletePopupCard(event.target);
  }
}



function openAndCloseForm() {
  const popup = document.querySelector('div[class*="popup"]');

  popup.classList.toggle('popup_is-opened');
  form.reset();
}



function openAndCloseEditForm() {
  const fullName = document.querySelector('.user-info__name').textContent;
  const job = document.querySelector('.user-info__job').textContent;
  const popupEdit = document.querySelector('div[class*=popup_edit]');

  formEdit.elements.fullName.value = fullName;
  formEdit.elements.infoJob.value = job;

  popupEdit.classList.toggle('popup_is-opened');
}



function edit(event) {
  event.preventDefault();

  const fullName = document.querySelector('.user-info__name');
  const job = document.querySelector('.user-info__job');
  const popupEdit = document.querySelector('div[class*=popup_edit]');

  fullName.textContent = formEdit.elements.fullName.value;
  job.textContent = formEdit.elements.infoJob.value;

  popupEdit.classList.toggle('popup_is-opened');
}





function likeHandler(event) {
  if (event.target.classList.contains('place-card__like-icon'))
    event.target.classList.toggle('place-card__like-icon_liked');
}




function addNew(event) {
  event.preventDefault();

  const name = form.elements.name.value;
  const link = form.elements.link.value;
  const newCard = createCard(name, link);

  placesList.append(newCard);

  openAndCloseForm();
  form.reset();
}



function deleteCard(event) {
  if (event.target.classList.contains('place-card__delete-icon')) {
    const current = event.target.parentElement.parentElement;
    current.remove();
  }
}



initial(initialCards);
