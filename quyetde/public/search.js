window.onload = () => {
  document.querySelector('.search').addEventListener('submit', (event) => {
    event.preventDefault();

    // get keyword
    const searchKeyword = document.querySelector('.search-input').value;

    // fetch to server
    fetch(`/search-question?keyword=${searchKeyword}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const resultElement = document.querySelector('.search-result');

        if (data.data.length === 0) {
          resultElement.innerHTML = '';

          resultElement.insertAdjacentHTML('beforeend', `
            <div>
              No question found
            </div>
          `);
        } else {
          for (const item of data.data) {
            resultElement.innerHTML = '';

            resultElement.insertAdjacentHTML('beforeend', `
              <div>
                <div>${item.content}</div>
                <div>Like: ${item.like}</div>
                <div>Dislike: ${item.dislike}</div>
                <div>-------------------------------------------------</div>
              </div>
            `);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      });
  });
};