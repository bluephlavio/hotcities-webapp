const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: 'Username is required',
		unique: true,
		trim: true,
	},
	salt: String,
	hashed_password: {
		type: String,
		required: 'Password is required',
	},
	created: {
		type: Date,
		default: Date.now,
	},
	updated: Date,
});

UserSchema.virtual('password')
	.set(function(password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function() {
		return this._password;
	});

UserSchema.path('hashed_password')
	.validate(function(v) => {
		if (this._password && this._password.length < 6) {
			this.invalidate('password', 'Password must be at least 6 characters.');
		}
		if (this.isNew && !this._password) {
			this.invalidate('password', 'Password is required');
		}
	});

UserSchema.methods = {
	validatePassword: (password) => {
		return bcrypt.compareSync(password, this.password);
	},
	encryptPassword: (password) => {
		return bcrypt.hashSync(password, this.salt);
	},
	makeSalt: () => {
		return Math.round(new Date()
			.valueOf() * Math.random()) + '';
	},
}

module.exports = mongoose.model('User', UserSchema);