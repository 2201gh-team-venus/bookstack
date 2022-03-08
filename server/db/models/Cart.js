const Sequelize = require('sequelize');
const db = require('../db');
const CartItem = require('./CartItem');
const Book = require('./Book');

const Cart = db.define('cart', {
	purchased: {
		type: Sequelize.BOOLEAN,
		default: false
	}
});

Cart.findPendingCartForUser = async function(userId) {
	let cart = await Cart.findOne({
		include: [
			{ model: CartItem, include: [ Book ] }
		],
		where: {
			purchased: false,
			userId: userId
		}
	});

	if (!cart) {	
		cart = await Cart.create({
			purchased: false,
			userId: userId
		})
	}

	return cart;
}

module.exports = Cart;
