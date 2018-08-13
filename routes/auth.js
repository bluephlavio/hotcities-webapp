const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/login', passport.authenticate('local', {
	successRedirect: '/admin',
	failureRedirect: '/auth/login'
}));

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/auth/login');
});

module.exports = router;