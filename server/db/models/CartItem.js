const Sequelize = require('sequelize');
const db = require('../db');

const CartItem = db.define('cart_item', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
})

module.exports = CartItem;
