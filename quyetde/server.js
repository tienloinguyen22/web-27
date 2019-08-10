const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const QuestionModel = require('./model');

mongoose.connect('mongodb://localhost:27017/quyetde', {useNewUrlParser: true}, (e) => {
	if (e) {
		console.log(e);
		process.exit();
	} else {
		console.log('Connect to mongodb sucess ...');

		// start app
		const app = express();

		// public folder
		app.use(express.static('public'));
		app.use(bodyParser.json());

		// method + address
		// get/post/put/delete
		app.get('/', (req, res) => {
			// index.html
			res.sendFile(path.resolve(__dirname, './public/index.html'));
		});

		// dirname: current working folder
		app.get('/ask', (req, res) => {
			res.sendFile(path.resolve(__dirname, './public/ask.html'));
		});

		app.post('/create-question', (req, res) => {
			const newQuestion = {
				content: req.body.questionContent,
			};

			QuestionModel.create(newQuestion, (error, data) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message
					});
				} else {
					res.status(201).json({
						success: true,
						data: {
							...data._doc,
							id: data._doc._id,
						},
					});
				}
			});
		});

		app.get('/questions/:questionId', (req, res) => {
			res.sendFile(path.resolve(__dirname, './public/question-detail.html'));
		});

		app.get('/get-question-by-id', (req, res) => {
			const questionId = req.query.questionId;

			QuestionModel.findById(questionId, (error, data) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message,
					});
				} else {
					if (!data) {
						res.status(404).json({
							success: false,
							message: `Question not found`,
						});
					} else {
						res.status(200).json({
							success: true,
							data: {
								...data._doc,
								id: data._id,
							},
						});
					}
				}
			});
		});

		app.get('/get-random-question', (req, res) => {
			QuestionModel.aggregate([
				{$sample: {size: 1}},
			], (error, data) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message,
					});
				} else {
					const selectedQuestion = data[0];
					res.status(200).json({
						success: true,
						data: {
							...selectedQuestion,
							id: selectedQuestion._id,
						},
					});
				}
			});
		});

		app.put('/vote-question', (req, res) => {
			const questionId = req.body.questionId;
			const selectedVote = req.body.selectedVote;

			QuestionModel.findByIdAndUpdate(questionId, {$inc: {
				[selectedVote]: 1,
			}}, (error) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message,
					});
				} else {
					res.status(201).json({
						success: true,
					})
				}
			});
		});

		app.get('/search', (req, res) => {
			res.sendFile(path.resolve(__dirname, './public/search.html'));
		});

		app.get('/search-question', (req, res) => {
			const keyword = req.query.keyword;

			QuestionModel.find({
				content: {$regex: keyword, $options: 'i'},
			}, (error, data) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message,
					});
				} else {
					res.status(200).json({
						success: true,
						data: data,
					});
				}
			});
		});

		app.listen(3000, error => {
			if (error) {
				console.log(error);
			} else {
				console.log('Server listen on port 3000 ...');
			}
		});
	}
});


