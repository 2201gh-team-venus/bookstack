const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
	purchased: {
		type: Sequelize.BOOLEAN,
		default: false
	}
});

module.exports = Cart;
