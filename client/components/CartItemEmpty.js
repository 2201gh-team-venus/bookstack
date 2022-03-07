import React from 'react';
import { Link } from 'react-router-dom';

function CartItemEmpty() {
	return (
		<div>
			No items in cart.
			<Link to="/books">{` Browse`}</Link>
		</div>
	);
}

export default CartItemEmpty;
