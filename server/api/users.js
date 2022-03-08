const router = require('express').Router();
const {
	models: { User, Cart, Book }
} = require('../db');

/* Find all users. */
router.get('/', async (req, res, next) => {
	const token = req.headers.authorization;
	console.log('token in route-->', token);
	const user = await User.findByToken(token);
	if (user.role === 'admin') {
		try {
			const users = await User.findAll({
				// explicitly select only the id and username fields - even though
				// users' passwords are encrypted, it won't help if we just
				// send everything to anyone who asks!
				attributes: ['id', 'username', 'email', ]
			});
			res.json(users);
		} catch (err) {
			next(err);
		}
	} 
});

/* Add user. */
router.post('/', async (req, res, next) => {
	try {
		const userData = {
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			role: req.body.role || 'user'
		};

		/* Checks if email already in database. */
		const findEmail = await User.findOne({ where: { email: req.body.email } });

		if (findEmail) {
			return res.sendStatus(406);
		} else {
			await User.create(userData);
			res.sendStatus(201);
		}
	} catch (err) {
		next(err);
	}
});

/* Find users with admin access. */
router.get('/admin', async (req, res, next) => {
	try {
		const admins = await User.findAll({ where: { role: 'admin' } });
		res.json(admins);
	} catch (err) {
		next(err);
	}
});

/* Find users without admin access. */
router.get('/users', async (req, res, next) => {
	try {
		const users = await User.findAll({ where: { role: 'user' } });
		res.json(users);
	} catch (err) {
		next(err);
	}
});

/* Find user by id. */
router.get('/:userId', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.userId);

		if (user) return res.json(user);
		else res.sendStatus(404); /* User not in database. */
	} catch (err) {
		next(err);
	}
});

// PUT /api/users/:userId
// Update user
router.put('/:userId', async (req, res, next) => {
	try {
		const userData = {
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			role: req.body.role
		};

		const user = await User.findByPk(req.params.userId);

		/* Checks if updating a valid user. */
		if (user) {
			await user.update({ ...userData });
			return res.sendStatus(200);
		} else {
			res.sendStatus(404);
		}
	} catch (err) {
		next(err);
	}
});

// DELETE /api/users/userId
// Remove user
router.delete('/:userId', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.userId);

		if (user) {
			User.destroy({ where: { id: user.id } });
			res.sendStatus(200);
		} else {
			res.sendStatus(404);
		}
	} catch (err) {
		next(err);
	}
});

// GET /api/users/:userId/carts
// Find all carts that belong to a user
router.get('/:userId/carts', async (req, res, next) => {
	try {
		const cartItems = await Cart.findAll({
			include: [
				{ model: Book },
				{
					model: User,
					where: {
						id: req.params.userId
					}
				}
			]
		});
		res.json(cartItems);
	} catch (err) {
		next(err);
	}
});

// GET /api/users/:userId/carts/pending
// Find a cart that belong to a user by cartId (create a new cart for a new user)
router.get('/:userId/carts/pending', async (req, res, next) => {
	try {
		const cart = await Cart.findOne({
			include: [
				{
					model: User,
					where: {
						id: req.params.userId
					}
				},
				{ model: Book }
			],
			where: {
				purchased: false
			}
		});
		if (cart) {
			res.json(cart);
		} else {
			const newCart = await Cart.create({
				userId: req.params.userId,
				purchased: false
			})
			res.status(201).json(newCart);
		}
	} catch (err) {
		next(err);
	}
});

// PUT /api/users/:userId/carts/:cartId/purchased
// User clicks on checkout
router.put('/:userId/carts/:cartId/purchased', async (req, res, next) => {
	try {
		const cart = await Cart.findByPk(req.params.cartId);
		const updatedCart = await cart.update({
			purchased: true
		})
		res.status(200).json(updatedCart);
	} catch (err) {
		next(err);
	}
});

// POST /api/users/:userId/carts/:cartId/books/:bookId
// Add a row to cart_items table
router.post('/:userId/carts/:cartId/books/:bookId', async (req, res, next) => {
	try {
		const cart = await Cart.findByPk(req.params.cartId);
		const book = await Book.findByPk(req.params.bookId);
		await book.setCarts(cart);
		res.sendStatus(201);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
