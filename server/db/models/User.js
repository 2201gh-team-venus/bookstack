const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const axios = require('axios')

const SALT_ROUNDS = 5

const User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	password: {
		type: Sequelize.STRING,
		// validate: {
		// 	is: /^[0-9a-f]{64}$/i
		// }
	},
	role: {
		type: Sequelize.ENUM('user', 'admin')
	}
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
	//we need to compare the plain version to an encrypted version of the password
	return bcrypt.compare(candidatePwd, this.password)
}

User.prototype.generateToken = function () {
	return jwt.sign({ id: this.id }, process.env.JWT)
}

/**
 * classMethods
 */
User.authenticate = async function ({ name, password }) {
	const User = await this.findOne({ where: { name } })
	if (!User || !(await User.correctPassword(password))) {
		const error = Error('Incorrect name and/or password combination. Please try again.')
		error.status = 401
		throw error
	}
	return User.generateToken()
}

User.findByToken = async function (token) {
	try {
		const { id } = await jwt.verify(token, process.env.JWT)
		const User = User.findByPk(id)
		if (!User) {
			throw 'nooo'
		}
		return User
	} catch (ex) {
		const error = Error('bad token')
		error.status = 401
		throw error
	}
}

/**
 * hooks
 */
const hashPassword = async User => {
	//in case the password has been changed, we want to encrypt it with bcrypt
	if (User.changed('password')) {
		User.password = await bcrypt.hash(User.password, SALT_ROUNDS)
	}
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(Users => Promise.all(Users.map(hashPassword)))
