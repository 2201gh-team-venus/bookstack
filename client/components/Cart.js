import React from 'react';
import { connect } from 'react-redux';

import CartItems from './CartItems';
import CartItemEmpty from './CartItemEmpty';
import Checkout from './Checkout';
import { cartItems, _clearBooks, addBook, removeBook, editQuantity } from '../store/cart';

class Cart extends React.Component {
	constructor() {
		super();
		this.state = { total: 0, checkout: false };
		this.handleBooks = this.handleBooks.bind(this);
		this.handleQuantity = this.handleQuantity.bind(this);
		this.handleTotal = this.handleTotal.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		// this.handleCheckout = this.handleCheckout.bind(this);
	}
	componentDidMount() {
		if (localStorage.getItem('token')) {
			this.props.cartItems();
		}

		this.props.cart.forEach(elm => {
			console.log(elm);
		});

		this.handleTotal();
	}
	componentDidUpdate(prvProps, prvState) {
		if (prvProps.cart.length < 0) {
			this.handleTotal();
		}
	}

	componentWillUnmount() {
		if (this.props.user.id) {
			this.props.clearBooks();
		}
	}
	handleBooks() {
		return this.props.cart.map(obj => (
			<CartItems
				key={obj.id}
				data={obj.book}
				quantity={obj.quantity}
				quantityFn={this.handleQuantity}
				removeBookFn={this.handleDelete}
			/>
		));
	}
	handleTotal() {
		/* TOFIX: state not updating price even using componentDidUpdate */
		setTimeout(() => {
			const total = this.props.cart.reduce((previous, current) => {
				console.log('current price', current.book.price);
				return (
					Number(previous) +
					Number(current.book.price) * Number(current.quantity)
				);
			}, 0);

			this.setState({ total: total });
		}, 500);
	}

	handleQuantity(quantity, type, book) {
		let editQuantity = 0;
		console.log('Current', quantity);
		if (type === 'increase') {
			editQuantity = quantity + 1;
		} else if (type === 'decrease') {
			editQuantity = quantity - 1;
		}
		this.props.editQuantity(book, editQuantity);
	}

	handleDelete(book) {
		this.props.deleteBook(book);
	}

	handleCheckout() {
		this.setState({ checkout: true });
	}

	render() {
		return this.state.checkout ? (
			<Checkout books={this.state.books} total={this.state.total} />
		) : (
			<div className="cart">
				<h3>
					{this.props.user.username ? this.props.user.username : 'Visitor'} 's
					books
				</h3>
				<div className="items">{this.handleBooks()}</div>
				<div className="cart-total">
					<h4 className="cart-total__text">Total</h4>
					<h4 className="cart-total__amount">${this.state.total}</h4>
				</div>
				<div className="cart-checkout">
					{this.props.user.id ? '' : 'Not logged in. You are ordering as guest'}
					<button
						disabled={
							this.props.cart === null || this.props.cart.length === 0
								? true
								: false
						}
						onClick={this.handleCheckout}
						className="cart-checkout__btn"
						type="button">
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
		cartItems: () => dispatch(cartItems()),
		clearBooks: () => dispatch(_clearBooks()),
		deleteBook: book => dispatch(removeBook(book)),
		editQuantity: (book, quantity) => dispatch(editQuantity(book, quantity))
	};
};

export default connect(mapState, mapDispatch)(Cart);
