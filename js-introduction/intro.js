console.log('Hello world !!!');

// get button element
const registerButton = document.querySelector('.register-button');
console.log(registerButton);

// add event listener
registerButton.addEventListener('click', () => {
  const usernameElement = document.querySelector('.username-input');
  const username = usernameElement.value;

  if (!username) {
    // show error message
    const errorMessageElement = document.querySelector(`.error-message`);
    errorMessageElement.innerText = 'Please input username'
  }
});