const router = require('express').Router();
const {
	models: { Book, Cart, CartItem, User }
} = require('../db');

router.get('/:cartId', async (req, res, next) => {
	try {
		const cartItems = await Cart.findAll({
			include: [Book, User],
			where: { id: req.params.cartId }
		});
		res.json(cartItems);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
