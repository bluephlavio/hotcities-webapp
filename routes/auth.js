const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/login', (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect('/admin');
	} else {
		res.render('login', {});
	}
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/admin',
	failureRedirect: '/auth/login'
}));

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/auth/login');
});

module.exports = router;