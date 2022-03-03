const Sequelize = require('sequelize');
const db = require('../db');

const ShoppingSession = db.define('shopping_session', {
	total: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = ShoppingSession;
