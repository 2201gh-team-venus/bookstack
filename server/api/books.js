const router = require('express').Router()
const {
	models: { Book, Author }
} = require('../db')

/* Find all books. */
router.get('/', async (req, res, next) => {
	try {
		const books = await Book.findAll({ include: Author })
		res.json(books)
	} catch (err) {
		next(err)
	}
})

/* Add book. */
router.post('/', async (req, res, next) => {
	try {
		const authorName = req.body.authorName
		const authorBio = req.body.authorBio

		/* If the author is not in the database, create author. */
		const [author] = await Author.findOrCreate({
			where: { name: authorName },
			defaults: {
				name: authorName,
				bio: authorBio
			}
		})

		const bookData = {
			name: req.body.name,
			imageURL: req.body.imageURL,
			description: req.body.description,
			inventory: req.body.inventory,
			price: req.body.price
		}

		const book = await Book.create({ ...bookData })
		await book.addAuthor(author)
		res.sendStatus(201)
	} catch (err) {
		next(err)
	}
})

/* Find by bookId. */
router.get('/:bookId', async (req, res, next) => {
	try {
		const book = await Book.findByPk(req.params.bookId, { include: Author })

		if (book) return res.json(book)
		else res.sendStatus(404) /* Book not in database. */
	} catch (err) {
		next(err)
	}
})

/* Update book. */
router.put('/:bookId', async (req, res, next) => {
	try {
		const bookData = {
			name: req.body.name,
			imageURL: req.body.imageURL,
			description: req.body.description,
			inventory: req.body.inventory,
			price: req.body.price
		}

		const book = await Book.findByPk(req.params.bookId)

		if (book) {
			await book.update({ ...bookData })
			return res.sendStatus(200)
		} else {
			res.sendStatus(404) /* Book not in database. */
		}
	} catch (err) {
		next(err)
	}
})

/* Remove book. */
router.delete('/:bookId', async (req, res, next) => {
	try {
		const book = await Book.findByPk(req.params.bookId)

		if (book) {
			Book.destroy({ where: { id: book.id } })
			return res.sendStatus(200)
		} else {
			res.sendStatus(404) /* Book not in database. */
		}
	} catch (err) {
		next(err)
	}
})

module.exports = router
