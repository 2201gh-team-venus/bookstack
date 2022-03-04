import React from 'react';
import { connect } from 'react-redux';

import { me } from '../store/auth';

import CartItems from './CartItems';

class Cart extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		console.log(this.state);
		console.log(this.props);

		return (
			<div className="cart">
				<h3>
					{this.props.user.username ? this.props.user.username : 'Visitor'} 's
					books
				</h3>

				<div className="items">
					<CartItems />
				</div>

				<div className="cart-total">
					<h4 className="cart-total__text">Total</h4>
					<h4 className="cart-total__amount">$13.69</h4>
				</div>

				<div className="cart-checkout">
					<button className="cart-checkout__btn" type="button">
						Checkout
					</button>
				</div>
			</div>
		);
	}
}

const mapState = state => {
	return { user: state.auth };
};

export default connect(mapState)(Cart);
