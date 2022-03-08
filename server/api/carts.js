const router = require('express').Router();
const {
	models: { Cart, CartItem, User }
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

// POST /api/carts/add/books
// Add a book to a cart
router.post('/add/books', async (req, res, next) => {
	console.log('API BOOK ----->', req.body);
	console.log('TOKEN---->', req.headers.authorization);
	const token = req.headers.authorization;
	const user = await User.findByToken(token);
	if (user) {
		try {
			const cart = await Cart.findPendingCartForUser(user.id);

			await CartItem.findOrCreate({
				where: {
					cart_id: cart.id,
					book_id: req.body.id
				},
				defaults: {
					cart_id: cart.id,
					book_id: req.body.id
				}
			});
			res.sendStatus(201);
		} catch (error) {
			next(error);
		}
	}
});

// DELETE /api/carts/remove/books
// Remove book(s) from a cart
router.delete('/remove/books', async (req, res, next) => {
	const token = req.headers.authorization;
	const user = await User.findByToken(token);
	if (user) {
		try {
			const cart = await Cart.findPendingCartForUser(user.id);
			await CartItem.destroy({
				where: {
					cart_id: cart.id,
					book_id: req.body.id
				}
			});
			res.sendStatus(204);
		} catch (error) {
			next(error);
		}
	}
});

// PUT /api/carts/books/quantity
// Edit quantity in a cart
router.put('/books/quantity', async (req, res, next) => {
	const token = req.headers.authorization;
	const user = await User.findByToken(token);
	if (user) {
		try {
			const cart = await Cart.findPendingCartForUser(user.id);
			if (cart) {
				const cartItem = await CartItem.findOne({
					where: {
						cart_id: cart.id,
						book_id: req.body.id
					}
				});
				res.json(await cartItem.update(req.body));
			}
		} catch (error) {
			next(error);
		}
	}
});

module.exports = router;
