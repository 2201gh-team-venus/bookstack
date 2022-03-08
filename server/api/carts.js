const router = require('express').Router();
const {
	models: { Book, Cart, CartItem, User }
} = require('../db');

// GET /api/carts
router.get('/pending', async (req, res, next) => {
	const token = req.headers.authorization;
	const user = await User.findByToken(token);
	if (user) {
		try {
			const cart = await Cart.findPendingCartForUser(user.id);
			res.json(cart);
		} catch (error) {
			next(error);
		}
	}
});

// POST /api/carts/add/books/:bookId
// Add a book to a cart
router.post('/add/books/:bookId', async (req, res, next) => {
	const token = req.headers.authorization;
	const user = await User.findByToken(token);
	if (user) {
		try {
			const cart = await Cart.findPendingCartForUser(user.id);

			await CartItem.create({
				quantity: 1,
				cart_id: cart.id,
				book_id: req.params.bookId
			});
			res.sendStatus(201);
		} catch (error) {
			next(error);
		}
}});

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
