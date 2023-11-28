//==========Валидация===========//

function disableButton(buttonElement, config) {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
}
function enableButton(buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}
function hasInvalidInput(inputList) {
  return inputList.some(input => {
    return !input.validity.valid;
  });
}
function toggleButtonState(buttonElement, inputList, config) {
  hasInvalidInput(inputList)
    ? disableButton(buttonElement, config)
    : enableButton(buttonElement, config);
}

function showError(input, errorElement, config) {
  input.classList.add(config.inputErrorClass);

  errorElement.classList.add(config.errorClass);
  errorElement.textContent = input.validationMessage;
}

function hideError(input, errorElement, config) {
  input.classList.remove(config.inputErrorClass);

  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

function checkInputValidity(input, formElement, config) {
  const spanIdSelector = `#${input.name}--error`;
  const errorElement = formElement.querySelector(spanIdSelector);

  input.validity.patternMismatch
    ? input.setCustomValidity(input.dataset.errorMessage)
    : input.setCustomValidity('');

  input.validity.valid
    ? hideError(input, errorElement, config)
    : showError(input, errorElement, config);
}

function setEventListener(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input, formElement, config);
      toggleButtonState(buttonElement, inputList, config);
    });
  });
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(formElement => {
    setEventListener(formElement, config);
  });
}
function resetValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(formElement => {
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    formElement.reset();
    disableButton(buttonElement, config);
  });
}
export { enableValidation, resetValidation };
