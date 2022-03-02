const router = require('express').Router()
const {
	models: { User }
} = require('../db')

/* Find all users. */
router.get('/', async (req, res, next) => {
	try {
		const users = await User.findAll({
			// explicitly select only the id and username fields - even though
			// users' passwords are encrypted, it won't help if we just
			// send everything to anyone who asks!
			attributes: ['id', 'username']
		})
		res.json(users)
	} catch (err) {
		next(err)
	}
})

/* Add user. */
router.post('/', async (req, res, next) => {
	try {
		const userData = {
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			role: req.body.role || 'customer'
		}

		/* Checks if email already in database. */
		const findEmail = await User.findOne({ where: { email: req.body.email } })

		if (findEmail) {
			return res.sendStatus(406)
		} else {
			await User.create(userData)
			res.sendStatus(201)
		}
	} catch (err) {
		next(err)
	}
})

/* Find users with admin access. */
router.get('/admin', async (req, res, next) => {
	try {
		const admins = await User.findAll({ where: { role: 'admin' } })
		res.send(admins)
	} catch (err) {
		next(err)
	}
})

/* Find users without admin access. */
router.get('/users', async (req, res, next) => {
	try {
		const users = await User.findAll({ where: { role: 'user' } })
		res.send(users)
	} catch (err) {
		next(err)
	}
})

/* Find user by id. */
router.get('/:userId', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.userId)

		if (user) return res.json(user)
		else res.sendStatus(404) /* User not in database. */
	} catch (err) {
		next(err)
	}
})

/* Update user. */
router.put('/:userId', async (req, res, next) => {
	try {
		const userData = {
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			role: req.body.role
		}

		const user = await User.findByPk(req.params.userId)

		/* Checks if updating a valid user. */
		if (user) {
			await User.update({ ...userData })
			return res.sendStatus(200)
		} else {
			res.sendStatus(404)
		}
	} catch (err) {
		next(err)
	}
})

/* Remove user. */
router.delete('/:userId', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.userId)

		if (user) {
			User.destroy({ where: { id: user.id } })
			res.sendStatus(200)
		} else {
			res.sendStatus(404)
		}
	} catch (err) {
		next(err)
	}
})

module.exports = router
