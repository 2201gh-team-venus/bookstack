import React from 'react';
import { connect } from 'react-redux';

import CartItems from './CartItems';
import CartItemEmpty from './CartItemEmpty';
import Checkout from './Checkout';
import { allBooks, _clearBooks } from '../store/cart';

// JOE CR: I'd like to review my understanding of this file with y'all.

class Cart extends React.Component {
	constructor() {
		super();
		this.state = { books: null, total: 0, checkout: false };

		this.handleBooks = this.handleBooks.bind(this);
		this.handleTotal = this.handleTotal.bind(this);
		this.handleQuantity = this.handleQuantity.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleCheckout = this.handleCheckout.bind(this);
	}

	componentDidMount() {
		// prettier-ignore
		if (this.props.user.id) {
			this.props.allBooks(this.props.user.id);
			/* Fix having both locastorage 'temp 'and 'token'. */
			localStorage.removeItem('temp');
		}
		
		else if (localStorage.getItem('temp')) {
			const books = JSON.parse(localStorage.getItem('temp'));
			this.setState({ books: books });
			console.log(this.state.books);
		}
	}

	componentDidUpdate(prvProps, prvState) {
		/* If user not logged-in get localstorage 'temp' item. */
		if (prvProps.user.id !== this.props.user.id) {
			this.props.allBooks(this.props.user.id);
		} else if (localStorage.getItem('temp')) {
			localStorage.setItem('temp', JSON.stringify(this.state.books));
		}

		if (JSON.stringify(prvState.books) !== JSON.stringify(this.state.books)) {
			this.handleTotal();
		} else {
			console.log('the same');
		}
	}

	componentWillUnmount() {
		if (this.props.user.id) {
			this.props.clearBooks();
		}
	}

	handleBooks() {
		// prettier-ignore
		if (this.props.cart.length > 0) {
			return this.props.cart.map(obj => (
				<CartItems
					key={obj.id}
					data={obj}
					quantityFn={this.handleQuantity}
					removeBook={this.handleDelete}
				/>
			));
		}
		
		else if (this.state.books && this.state.books.length > 0) {
			return this.state.books.map(obj => (
				<CartItems
					key={obj.id}
					data={obj}
					quantityFn={this.handleQuantity}
					removeBookFn={this.handleDelete}
				/>
			));
		}

		else {
			return <CartItemEmpty />
		}
	}

	handleTotal() {
		/* Method sets state, returns null */
		const priceReducer = object => {
			const price = object.reduce((prv, cur) => {
				return Number(prv) + Number(cur.price) * Number(cur.quantity);
			}, 0);
			return parseFloat(price).toFixed(2);
		};

		if (this.props.cart.length > 0) {
			const total = priceReducer(this.props.cart);
			this.setState({ total: total });
			return null;
		} else if (this.state.books !== null && this.state.books.length > 0) {
			const total = priceReducer(this.state.books);
			console.log('current total', total);
			this.setState({ total: total });
			return null;
		} else {
			this.setState({ total: 0 });
			return null;
		}
	}

	handleQuantity(id, type) {
		/* Method sets state, returns undefined */
		const prvBooks = [...this.state.books];

		const changeQuantity = prvBooks.map(obj => {
			if (obj.id === id) {
				if (type === 'increase') {
					obj.quantity += 1;
				}

				if (type === 'decrease' && obj.quantity > 1) {
					obj.quantity -= 1;
				}
			}
			console.log(obj, 'state books');
			return obj;
		});

		this.setState({
			books: changeQuantity
		});

		this.handleTotal();
	}

	handleDelete(id) {
		if (this.props.cart.length > 0) {
			// ! TOFIX: Do something if the user is logged in
		} else if (localStorage.getItem('temp') && this.state.books !== null) {
			const prvBooks = [...this.state.books];

			const delBook = prvBooks.filter(obj => {
				if (obj.id !== id) return true;
				return false;
			});

			this.setState({ books: delBook });
		}
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
							this.state.books === null || this.state.books.length === 0
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
		allBooks: id => dispatch(allBooks(id)),
		clearBooks: () => dispatch(_clearBooks())
	};
};

export default connect(mapState, mapDispatch)(Cart);
