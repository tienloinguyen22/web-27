window.onload = () => {
	// fetch API get question

	// innerHTML, innerText
	const pathname = window.location.pathname;
	const pathNameParts = pathname.split('/');
	const questionId = pathNameParts[pathNameParts.length - 1];
	fetch(`/get-question-by-id?questionId=${questionId}`, {
		method: 'GET'
	})
		.then()
		.catch();
};
