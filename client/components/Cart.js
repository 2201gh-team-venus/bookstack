import React from 'react';
import { connect } from 'react-redux';

import CartItems from './CartItems';
import { allBooks, _clearBooks } from '../store/cart';

class Cart extends React.Component {
	constructor() {
		super();
		this.state = { books: null };

		this.handleBooks = this.handleBooks.bind(this);
		this.handleTotal = this.handleTotal.bind(this);
		this.handleQuantity = this.handleQuantity.bind(this);
	}

	componentDidMount() {
		// prettier-ignore
		if (this.props.user.id) {
			this.props.allBooks(this.props.user.id);
		}
		
		else if (localStorage.getItem('temp')) {
			const books = JSON.parse(localStorage.getItem('temp'));
			this.setState({ books: books });
		}
	}

	componentDidUpdate(prvState) {
		if (prvState.user.id !== this.props.user.id) {
			this.props.allBooks(this.props.user.id);
		}
	}

	componentWillUnmount() {
		if (this.props.user.id) {
			this.props.clearBooks();
		} else if (localStorage.getItem('temp')) {
			localStorage.setItem('temp', JSON.stringify(this.state.books));
		}
	}

	handleBooks() {
		// prettier-ignore
		if (this.props.cart.length > 0) {
			return this.props.cart.map(obj => <CartItems key={obj.id} data={obj} />);
		}

		else if (this.state.books && this.state.books.length > 0) {
			return this.state.books.map(obj => (
				<CartItems
					quantityFn={this.handleQuantity}
					key={obj.id}
					data={obj}
				/>
			));
		}
	}

	handleTotal() {
		const priceReducer = object => {
			return object.reduce((prv, cur) => ({
				price: Number(prv.price) + Number(cur.price)
			}));
		};

		if (this.props.cart.length > 0) {
			const { price } = priceReducer(this.props.cart);
			return price;
		} else if (localStorage.getItem('temp') && this.state.books !== null) {
			const { price } = priceReducer(this.state.books);
			return price;
		} else {
			return 0;
		}
	}

	handleQuantity(id, type) {
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

			return obj;
		});

		this.setState({
			books: changeQuantity
		});
	}

	handleDecrease(id) {
		console.log('something else');
	}

	render() {
		console.log(this.state);
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
