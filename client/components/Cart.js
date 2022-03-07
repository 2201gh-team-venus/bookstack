import React from 'react';
import { connect } from 'react-redux';

import CartItems from './CartItems';
import { allBooks, _clearBooks } from '../store/cart';

class Cart extends React.Component {
	constructor() {
		super();
		this.handleBooks = this.handleBooks.bind(this);
		this.handleTotal = this.handleTotal.bind(this);
	}

	componentDidMount() {
		if (this.props.user.id) {
			this.props.allBooks(this.props.user.id);
		}
	}

	componentDidUpdate(prvState) {
		if (prvState.user.id !== this.props.user.id) {
			this.props.allBooks(this.props.user.id);
		}
	}

	componentWillUnmount() {
		this.props.clearBooks();
	}

	handleBooks() {
		if (this.props.cart.length > 0) {
			return this.props.cart.map(obj => <CartItems key={obj.id} data={obj} />);
		} else if (localStorage.getItem('temp')) {
			const books = JSON.parse(localStorage.getItem('temp'));
			return books.map(obj => <CartItems key={obj.id} data={obj} />);
		}
	}

	handleTotal() {
		const priceReducer = object => {
			return object.reduce((prv, cur) => {
				return {
					price: Number(prv.price) + Number(cur.price)
				};
			});
		};

		if (this.props.cart.length > 0) {
			const { price } = priceReducer(this.props.cart);
			return price;
		} else if (localStorage.getItem('temp')) {
			const books = JSON.parse(localStorage.getItem('temp'));
			const { price } = priceReducer(books);
			return price;
		} else {
			return 0;
		}
	}

	render() {
		return (
			<div className="cart">
				<h3>
					{this.props.user.username ? this.props.user.username : 'Visitor'} 's
					books
				</h3>

				<div className="items">{this.handleBooks()}</div>

				<div className="cart-total">
					<h4 className="cart-total__text">Total</h4>
					<h4 className="cart-total__amount">${this.handleTotal()}</h4>
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
	return {
		user: state.auth,
		cart: state.cart
	};
};

const mapDispatch = dispatch => {
	return {
		allBooks: id => dispatch(allBooks(id)),
		clearBooks: () => dispatch(_clearBooks())
	};
};

export default connect(mapState, mapDispatch)(Cart);
