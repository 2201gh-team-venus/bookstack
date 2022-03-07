const router = require('express').Router();
const {
	models: { Author, Book }
} = require('../db');

/* Find all authors. */
router.get('/', async (req, res, next) => {
	try {
		const authors = await Author.findAll({ include: Book });
		res.json(authors);
	} catch (err) {
		next(err);
	}
});

/* Add author. */
router.post('/', async (req, res, next) => {
	try {
		await Author.create({
			name: req.body.name,
			bio: req.body.bio
		});
		res.sendStatus(201);
	} catch (err) {
		next(err);
	}
});

/* Find by authorId */
router.get('/:authorId', async (req, res, next) => {
	try {
		const author = await Author.findByPk(req.params.authorId);

		if (author) return res.json(author);
		else res.sendStatus(404); /* Author not in database. */
	} catch (err) {
		next(err);
	}
});

/* Update author. */
router.put('/:authorId', async (req, res, next) => {
	try {
		const author = await Author.findByPk(req.params.authorId);

		if (author) {
			await author.update({
				name: req.body.name,
				bio: req.body.bio
			});

			return res.sendStatus(200);
		} else {
			res.sendStatus(404); /* Author not in database. */
		}
	} catch (err) {
		next(err);
	}
});

/* Remove author. */
router.delete('/:authorId', async (req, res, next) => {
	try {
		const author = await Author.findByPk(req.params.authorId);

		if (author) {
			// JOE CR: simply author.destroy() would work just as well.
			await Author.destroy({ where: { id: author.id } });
			return res.sendStatus(200);
		} else {
			res.sendStatus(404); /* Author not in database. */
		}
	} catch (err) {
		next(err);
	}
});

module.exports = router;
