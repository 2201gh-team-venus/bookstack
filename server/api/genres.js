const router = require('express').Router()
const {
	models: { Genre, Book }
} = require('../db')

/* Find all genre. */
router.get('/', async (req, res, next) => {
	try {
		const genres = await Genre.findAll({ include: Book })
		res.json(genres)
	} catch (err) {
		next(err)
	}
})

/* Add genre. */
router.post('/', async (req, res, next) => {
	try {
		/* Checks if genre already in database. */
		const genre = await Genre.findOne({ where: { name: req.body.name } })

		if (genre) {
			return res.sendStatus(406)
		} else {
			await genre.create({ name: req.body.name })
			res.sendStatus(201)
		}
	} catch (err) {
		next(err)
	}
})

/* Find books in genre. */
// router.get('/:genreId/books', async (req, res, next) => {
// 	try {
// 	} catch (err) {
// 		next(err)
// 	}
// })

/* Find by genreId */
router.get('/:genreId', async (req, res, next) => {
	try {
		const genre = await Genre.findByPk(req.params.genreId, { include: Book })

		if (genre) return res.json(genre)
		else res.sendStatus(404) /* Genre not in database. */
	} catch (err) {
		next(err)
	}
})

/* Update genre. */
router.put('/:genreId', async (req, res, next) => {
	try {
		const genre = await Genre.findByPk(req.params.genreId)

		/* Checks if updating a valid genre. */
		if (genre) await Genre.update({ name: req.body.name })
		else res.sendStatus(404)
	} catch (err) {
		next(err)
	}
})

router.delete('/:genreId', async (req, res, next) => {
	try {
		const genre = await Genre.findByPk(req.params.genreId)

		if (genre) {
			Genre.destroy({ where: { id: genre.id } })
			res.sendStatus(200)
		} else {
			res.sendStatus(404)
		}
	} catch (err) {
		next(err)
	}
})

module.exports = router
