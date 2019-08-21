let gameInfo = undefined;

// scores: [[1, 2, 3, 4], [1, 2, 3, 4]]
// return: {sos: [10, 20 ,30 ,40], total: 100}
const calculateSos = (scores) => {
  let sos = [0, 0, 0, 0];
  let total = 0;

  for (let i = 0; i < scores.length; i += 1) {
    for (let j = 0; j < scores[i].length; j += 1) {
      total += scores[i][j];
      sos[j] += scores[i][j];
    }
  }

  return {
    sos: sos,
    total: total,
  };
};

const updateScore = (round, player, newScore) => {
  fetch('/update-score', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      round: round,
      player: player,
      value: newScore,
      gameId: gameInfo._id,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      window.alert(err.message);
    });
};

// roundScore: [1, 2, 3, 4]
const addRound = (roundIndex, roundScore) => {
  const trElement = document.createElement('tr');
  const td = document.createElement('td');
  td.innerText = `Round ${roundIndex + 1}`;

  const td0 = document.createElement('td');
  td0.innerHTML = `
    <input
      type='number'
      class='form-control'
      value=${roundScore[0]}
      id='${roundIndex}-${0}'
    />
  `;
  const td1 = document.createElement('td');
  td1.innerHTML = `
    <input
      type='number'
      class='form-control'
      value=${roundScore[1]}
      id='${roundIndex}-${1}'
    />
  `;
  const td2 = document.createElement('td');
  td2.innerHTML = `
    <input
      type='number'
      class='form-control'
      value=${roundScore[2]}
      id='${roundIndex}-${2}'
    />
  `;
  const td3 = document.createElement('td');
  td3.innerHTML = `
    <input
      class='form-control'
      type='number'
      value=${roundScore[3]}
      id='${roundIndex}-${3}'
    />
  `;

  td0.addEventListener('input', (event) => {
    // save to db
    const newScore = event.target.value;
    updateScore(roundIndex, 0, newScore);

    // re-calculate sos
    gameInfo.scores[roundIndex][0] = Number(newScore);
    // render sum of scores
    const totalScore = calculateSos(gameInfo.scores);
    document.querySelector('.thead').innerHTML = `
      <tr>
        <th>#</th>
        <th>${gameInfo.users[0]}</th>
        <th>${gameInfo.users[1]}</th>
        <th>${gameInfo.users[2]}</th>
        <th>${gameInfo.users[3]}</th>
      </tr>
      <tr>
        <th class='bg-primary text-white'>Sum of scores (${totalScore.total})</th>
        <th class='bg-primary text-white'>${totalScore.sos[0]}</th>
        <th class='bg-primary text-white'>${totalScore.sos[1]}</th>
        <th class='bg-primary text-white'>${totalScore.sos[2]}</th>
        <th class='bg-primary text-white'>${totalScore.sos[3]}</th>
      </tr>
    `;
  });
  td1.addEventListener('input', (event) => {
    // save to db
    const newScore = event.target.value;
    updateScore(roundIndex, 1, newScore);

    // re-calculate sos
    gameInfo.scores[roundIndex][1] = Number(newScore);
    // render sum of scores
    const totalScore = calculateSos(gameInfo.scores);
    document.querySelector('.thead').innerHTML = `
      <tr>
        <th>#</th>
        <th>${gameInfo.users[0]}</th>
        <th>${gameInfo.users[1]}</th>
        <th>${gameInfo.users[2]}</th>
        <th>${gameInfo.users[3]}</th>
      </tr>
      <tr>
        <th class='bg-primary text-white'>Sum of scores (${totalScore.total})</th>
        <th class='bg-primary text-white'>${totalScore.sos[0]}</th>
        <th class='bg-primary text-white'>${totalScore.sos[1]}</th>
        <th class='bg-primary text-white'>${totalScore.sos[2]}</th>
        <th class='bg-primary text-white'>${totalScore.sos[3]}</th>
      </tr>
    `;
  });
  td2.addEventListener('input', (event) => {
    // save to db
    const newScore = event.target.value;
    updateScore(roundIndex, 2, newScore);

    // re-calculate sos
    gameInfo.scores[roundIndex][2] = Number(newScore);
    // render sum of scores
    const totalScore = calculateSos(gameInfo.scores);
    document.querySelector('.thead').innerHTML = `
      <tr>
        <th>#</th>
        <th>${gameInfo.users[0]}</th>
        <th>${gameInfo.users[1]}</th>
        <th>${gameInfo.users[2]}</th>
        <th>${gameInfo.users[3]}</th>
      </tr>
      <tr>
        <th class='bg-primary text-white'>Sum of scores (${totalScore.total})</th>
        <th class='bg-primary text-white'>${totalScore.sos[0]}</th>
        <th class='bg-primary text-white'>${totalScore.sos[1]}</th>
        <th class='bg-primary text-white'>${totalScore.sos[2]}</th>
        <th class='bg-primary text-white'>${totalScore.sos[3]}</th>
      </tr>
    `;
  });
  td3.addEventListener('input', (event) => {
    // save to db
    const newScore = event.target.value;
    updateScore(roundIndex, 3, newScore);

    // re-calculate sos
    gameInfo.scores[roundIndex][3] = Number(newScore);
    // render sum of scores
    const totalScore = calculateSos(gameInfo.scores);
    document.querySelector('.thead').innerHTML = `
      <tr>
        <th>#</th>
        <th>${gameInfo.users[0]}</th>
        <th>${gameInfo.users[1]}</th>
        <th>${gameInfo.users[2]}</th>
        <th>${gameInfo.users[3]}</th>
      </tr>
      <tr>
        <th class='bg-primary text-white'>Sum of scores (${totalScore.total})</th>
        <th class='bg-primary text-white'>${totalScore.sos[0]}</th>
        <th class='bg-primary text-white'>${totalScore.sos[1]}</th>
        <th class='bg-primary text-white'>${totalScore.sos[2]}</th>
        <th class='bg-primary text-white'>${totalScore.sos[3]}</th>
      </tr>
    `;
  });

  trElement.appendChild(td);
  trElement.appendChild(td0);
  trElement.appendChild(td1);
  trElement.appendChild(td2);
  trElement.appendChild(td3);

  document.querySelector('.tbody').appendChild(trElement);
};

window.onload = () => {
  console.log('Game detail');

  // get game id
  const pathName = window.location.pathname.split('/');
  const gameId = pathName[pathName.length - 1];

  // get game info
  fetch(`/get-game-by-id?id=${gameId}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      gameInfo = data.data;

      // render sum of scores
      const totalScore = calculateSos(data.data.scores);
      document.querySelector('.thead').insertAdjacentHTML('beforeend', `
        <tr>
          <th>#</th>
          <th>${data.data.users[0]}</th>
          <th>${data.data.users[1]}</th>
          <th>${data.data.users[2]}</th>
          <th>${data.data.users[3]}</th>
        </tr>
        <tr>
          <th class='bg-primary text-white'>Sum of scores (${totalScore.total})</th>
          <th class='bg-primary text-white'>${totalScore.sos[0]}</th>
          <th class='bg-primary text-white'>${totalScore.sos[1]}</th>
          <th class='bg-primary text-white'>${totalScore.sos[2]}</th>
          <th class='bg-primary text-white'>${totalScore.sos[3]}</th>
        </tr>
      `);

      // renser existed rounds
      for (let i = 0; i < data.data.scores.length; i += 1) {
        addRound(i, data.data.scores[i]);
      }
    })
    .catch((err) => {
      console.log(err);
      window.alert(err.message);
    });

  document.querySelector('.add-round').addEventListener('click', (event) => {
    // update db
    fetch('/add-round', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gameId: gameInfo._id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // render new round
        gameInfo.scores.push([0, 0, 0, 0]);
        addRound(gameInfo.scores.length - 1, [0, 0, 0, 0]);
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.message);
      });
  });
};