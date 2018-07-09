const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/login', (req, res) => {
	if (req.session.admin) {
		res.redirect('/admin');
	} else {
		res.render('login', {});
	}
});

router.post('/login', (req, res) => {
	if (req.body.password == process.env.ADMIN_PWD) {
		req.session.admin = true
		res.redirect('/admin');
	} else {
		res.redirect('/admin/login');
	}
})

router.use((req, res, next) => {
	if (req.session.admin) {
		next();
	} else {
		res.redirect('/admin/login');
	}
});

router.use(express.static(path.join(__dirname, '..', 'admin', 'public')));

module.exports = router;