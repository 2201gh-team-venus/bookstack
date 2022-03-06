const router = require('express').Router();
const {
	models: { User, Cart }
} = require('../db');

/* Find all users. */
router.get('/', async (req, res, next) => {
	try {
		const users = await User.findAll({
			// explicitly select only the id and username fields - even though
			// users' passwords are encrypted, it won't help if we just
			// send everything to anyone who asks!
			attributes: ['id', 'username']
		});
		res.json(users);
	} catch (err) {
		next(err);
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

// Get /api/users/:userId/carts/:cartId
// Find a cart that belong to a user by cartId
router.get('/:userId/carts/:cartId', async (req, res, next) => {
	try {
		const cartItem = await Cart.findByPk(req.params.cartId, {
			include: [
				{
					model: User,
					where: {
						id: req.params.userId
					}
				}
			]
		});
		res.json(cartItem);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
