window.onload = () => {
  console.log('Score keeper');

  document.querySelector('.create-game-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const player1 = document.querySelector('.player1').value;
    const player2 = document.querySelector('.player2').value;
    const player3 = document.querySelector('.player3').value;
    const player4 = document.querySelector('.player4').value;

    if (!player1 || !player2 || !player3 || !player4) {
      document.querySelector('.error').insertAdjacentHTML('beforeend', `
        <div class="alert alert-danger" role="alert">
          Please input player name !!
        </div>
      `);
    } else {
      document.querySelector('.error').innerHTML = '';

      // fetch to server
      fetch(`/create-game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          users: [player1, player2, player3, player4],
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          window.location.href = `/games/${data.data._id}`;
        })
        .catch((err) => {
          console.log(err);
          window.alert(err.message);
        });
    }
  });
};