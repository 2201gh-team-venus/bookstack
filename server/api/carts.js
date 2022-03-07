const router = require('express').Router();
const {
	models: { Book, Cart, CartItem, User }
} = require('../db');

// GET /api/carts/:cartId
router.get('/:cartId', async (req, res, next) => {
	try {
		// JOE CR: It's strange that this variable is called cartItems when it uses the Cart (and not CartItem) model.
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
		// JOE CR: Camel case variable names! Conventions!
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

// PUT /api/carts/:cartId/books/:bookId
// Edit quantity in a cart
router.put('/:cartId/books/:bookId', async (req, res, next) => {
	try {
		const cart_item = await CartItem.findOne({
			where: {
				cart_id: req.params.cartId,
				book_id: req.params.bookId
			}
		})
		res.json(await cart_item.update(req.body));
	} catch (error) {
		next(error);
	}
});

module.exports = router;
