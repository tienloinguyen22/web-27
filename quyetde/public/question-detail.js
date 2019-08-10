window.onload = () => {
	// fetch API get question

	// innerHTML, innerText
	const pathname = window.location.pathname;
	const pathNameParts = pathname.split('/');
	const questionId = pathNameParts[pathNameParts.length - 1];
	fetch(`/get-question-by-id?questionId=${questionId}`, {
		method: 'GET'
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			// calculate like/dislike
			let likePercent = 0;
			let dislikePercent = 0;
			if (data.data.like === 0 && data.data.dislike === 0) {
				likePercent = dislikePercent = 50;
			} else {
				likePercent = (data.data.like / (data.data.like + data.data.dislike) * 100).toFixed(2);
				dislikePercent = 100.00 - likePercent;
			}

			// display
			document.querySelector('.question-content').innerHTML = data.data.content;
			document.querySelector('.total-vote').innerHTML = `${data.data.like + data.data.dislike} votes`;
			document.querySelector('.like-percent').innerHTML = `${likePercent}%`;
			document.querySelector('.dislike-percent').innerHTML = `${dislikePercent}%`;

			// listen button click
			document.querySelector('.other-button').addEventListener('click', () => {
				window.location.href = '/';
			});
		})
		.catch((error) => {
			console.log(error);
			window.alert(error.message);
		});
};
