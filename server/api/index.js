const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/books', require('./books'));
router.use('/authors', require('./authors'));
router.use('/genres', require('./genres'));
router.use('/comments', require('./comments'));
router.use('/carts', require('./carts'));

router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});
