window.onload = () => {
  const submitButton = document.querySelector('.submit-button');
  if (submitButton) {
    submitButton.addEventListener('click', (event) => {
      event.preventDefault();

      const textAreaValue = document.querySelector('.question-content').value;
      // send request to server
      // . create new question
      // . question content
      fetch('/create-question', {
        method: 'POST', // POST | PUT
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionContent: textAreaValue,
        }),
      })
        .then((response) => {
          // response.json() => only when server response with json
          // response.text() => only when server response with string
          return response.json();
        })
        .then((data) => {
          // redirect
          window.location.href = `/questions/${data.data.id}`;
        })
        .catch((error) => {
          console.log(error);
          window.alert(error.message);
        });
    });
  }
};