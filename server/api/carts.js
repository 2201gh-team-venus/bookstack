const router = require('express').Router();
const {
	models: { Book, Cart, CartItem, User }
} = require('../db');

// GET /api/carts/:cartId
router.get('/:cartId', async (req, res, next) => {
	try {
		const cartItems = await Cart.findAll({
			include: [Book, User],
			where: { id: req.params.cartId }
		});
		res.json(cartItems);
	} catch (error) {
		next(error);
	}
});

// POST /api/carts/:cartId/books/:bookId
// Add a book to a cart
router.post('/:cartId/books/:bookId', async (req, res, next) => {
	try {
		const cart_item = await CartItem.create({
			quantity: 1,
			cart_id: req.params.cartId,
			book_id: req.params.bookId
		});
		res.status(201).json(cart_item);
	} catch (error) {
		next(error);
	}
});

// DELETE /api/carts/:cartId/books/:bookId
// remove book(s) from a cart
router.delete('/:cartId/books/:bookId', async (req, res, next) => {
	try {
		await CartItem.destroy({
			where: {
				cart_id: req.params.cartId,
				book_id: req.params.bookId
			}
		});
		res.status(204).send('book removed from your cart');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
