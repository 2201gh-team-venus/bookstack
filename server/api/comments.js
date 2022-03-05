const router = require('express').Router();
const { sendStatus } = require('express/lib/response');
const {
	models: { Comment, User, Book }
} = require('../db');

/* Find all comments. */
router.get('/', async (req, res, next) => {
	try {
		const comments = await Comment.findAll({
			include: [{ model: User }, { model: Book }]
		});

		res.json(comments);
	} catch (err) {
		next(err);
	}
});

/* Add comment. */
router.post('/', async (req, res, next) => {
	console.log("req.body", req.body)
	try {
		const comment = await Comment.create(req.body);  //simplified version b.c wrote thunk differently
		
		return res.sendStatus(201);
		// try {
		// 	const comment = await Comment.create({ message: req.body.comment });
		// 	const user = await User.findByPk(req.body.user);
		// 	const book = await Book.findByPk(req.body.book);
		
		// 	if (!user || !book) {
		// 		res.sendStatus(406); /* User or book not in database. */
		// 	} else {
		// 		await user.addComment(comment);
		// 		await book.addComment(comment);
		// 		return res.sendStatus(201);
		// 	}

	} catch (err) {
		next(err);
	}
});



/* Find comment by id. */
router.get('/:comment', async (req, res, next) => {
	try {
		const comment = await Comment.findByPk(req.params.comment, {
			include: [{ model: User }, { model: Book }]
		});

		if (comment) return res.json(comment);
		else res.sendStatus(404);
	} catch (err) {
		next(err);
	}
});

/* Update comment. */
router.put('/:comment', async (req, res, next) => {});

module.exports = router;
