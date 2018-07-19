const express = require('express');
const path = require('path');

const router = express.Router();

router.use((req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/auth/login');
	}
});

router.use(express.static(path.join(__dirname, '..', 'admin', 'build')));

router.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'admin', 'build', 'index.html'));
});

module.exports = router;