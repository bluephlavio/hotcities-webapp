const passport = require('passport');
const LocalStrategy = require('passport-local')
	.Strategy;

const db = require('./db');

passport.use(new LocalStrategy(
	(username, password, done) => {
		db.User.findOne({ username: username })
			.then(user => {
				if (!user) {
					done(null, false);
				} else {
					if (user.password == password) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				}
			})
			.catch(error => {
				return done(error);
			});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	db.User.findById(id, function(err, user) {
		done(err, user);
	});
});