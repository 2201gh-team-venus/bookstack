const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
// const axios = require('axios');

const SALT_ROUNDS = 5;

const User = db.define('user', {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		// validate: {
		// 	isEmail: false
		// },
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
		// validate: {
		// 	is: /^[0-9a-f]{64}$/i
		// }
	},
	role: {
		type: Sequelize.ENUM('user', 'admin'),
		default: 'user'
	}
});

/**
 * instanceMethods
 */

const secretSigningPhrase = process.env.BOOKSTACK_AUTH_JWT;

User.prototype.correctPassword = function (candidatePwd) {
	//we need to compare the plain version to an encrypted version of the password
	return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
	return jwt.sign({ id: this.id }, secretSigningPhrase);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
	const User = await this.findOne({ where: { username } });
	if (!User || !(await User.correctPassword(password))) {
		const error = Error(
			'Incorrect name and/or password combination. Please try again.'
		);
		error.status = 401;
		throw error;
	}
	return User.generateToken();
};

User.findByToken = async function (token) {
	try {
		const { id } = jwt.verify(token, secretSigningPhrase);
		const user = await User.findByPk(id);

		if (!user) {
			throw 'nooo';
		}
		return user;
	} catch (ex) {
		const error = Error('bad token');
		error.status = 401;
		throw error;
	}
};

/**
 * hooks
 */
const hashPassword = async User => {
	//in case the password has been changed, we want to encrypt it with bcrypt
	if (User.changed('password')) {
		User.password = await bcrypt.hash(User.password, SALT_ROUNDS);
	}
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate(Users => Promise.all(Users.map(hashPassword)));

module.exports = User;
