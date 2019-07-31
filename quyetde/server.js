const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// public folder
app.use(express.static('public'));
app.use(bodyParser.json());

// method + address
// get/post/put/delete
app.get('/', (req, res) => {
	res.send('Hello world');
});

// dirname: current working folder
app.get('/ask', (req, res) => {
	res.sendFile(path.resolve(__dirname, './public/ask.html'));
});

app.post('/create-question', (req, res) => {
	// content
	// like
	// dislike
	// id
	const newQuestion = {
		content: req.body.questionContent,
		like: 0,
		dislike: 0,
		id: new Date().getTime()
	};

	// readfile
	fs.readFile('data.json', { encoding: 'utf8' }, (error, data) => {
		if (error) {
			res.status(500).json({
				success: false,
				message: error.message
			});
		} else {
			// json
			// push newQuestion
			const questions = JSON.parse(data);
			questions.push(newQuestion);

			// writefile
			fs.writeFile('data.json', JSON.stringify(questions), err => {
				if (err) {
					res.status(500).json({
						success: false,
						message: err.message
					});
				} else {
					res.status(201).json({
						success: true,
						data: newQuestion
					});
				}
			});
		}
	});
});

app.get('/questions/:questionId', (req, res) => {
	// params
	// req.params.questionId
	console.log(req.params);
	res.sendFile(path.resolve(__dirname, './public/question-detail.html'));
});

app.get('/get-question-by-id', (req, res) => {
	// query
	console.log(req.query);
});

app.listen(3000, error => {
	if (error) {
		console.log(error);
	} else {
		console.log('Server listen on port 3000 ...');
	}
});
