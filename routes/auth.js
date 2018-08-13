const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

const db = require('../db');

router.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	db.User.findOne({ username }, (err, user) => {
		if (err || !user) {
			return res.status(401)
				.json({
					error: 'User not found'
				});
		}
		if (!user.authenticate(password)) {
			return res.status(401)
				.json({
					error: 'Username and password don\'t match'
				});
		}
		const token = jwt.sign({
			_id: user._id
		}, config.jwtSecret);
		res.cookie('t', token {
			expire: new Date() + 9999
		});
		return res.json({
			token,
			user: {
				_id: user._id,
				username: user.username,
			},
		});
	});
});

router.get('/logout', (req, res) => {
	res.clearCookie('t');
	res.status(200)
		.json({
			message: 'logged out succesfully',
		});
})

module.exports = router;