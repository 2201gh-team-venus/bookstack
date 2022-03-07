const Sequelize = require('sequelize');
const db = require('../db');

const CartItem = db.define('cart_item', {
	// JOE CR: Why is this being defined?
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 1
	}
});

module.exports = CartItem;
