import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

// const Navbar = ({ handleClick, isLoggedIn, isAdmin, cart }) => {
class Navbar extends React.Component {
	constructor() {
		super();
		this.state = {
			total: 0
		};
		this.getTotalQuantity = this.getTotalQuantity.bind(this);
	}

	getTotalQuantity() {
		const books = JSON.parse(window.localStorage.getItem('temp'));
		console.log(books);
		let sum = 0;
		if (books) {
			books.map(book => (sum += book.quantity));
			console.log('sum', sum);
			return sum;
		}
		// else {

		// 	const signedInBooks=  this.props.cart

		// 	if(signedInBooks){
		// 	signedInBooks.map(book => (sum += book.cart_item.quantity));
		// 	console.log("sum in signned in", sum)
		// 	return sum;
		// 	}
		// }
	}

	componentDidMount() {
		setInterval(
			() =>
				this.setState({
					total: this.getTotalQuantity()
				}),
			500
		);
	}

	// componentDidUpdate(prevProp, prevState) {

	// 	// if (this.state.total !== prevProp.localBooks.total) {
	// 	// 	this.setState({
	// 	// 		total: this.getTotalQuantity()
	// 	// 	});
	// 	// }
	// }

	render() {
		console.log('this.state===>', this.state);
		const { handleClick, isLoggedIn, isAdmin } = this.props;
		const totalBook = this.state.total;
		if (isLoggedIn && isAdmin) {
			return (
				<div>
					<h1>BOOKSTACK</h1>
					<nav>
						<div>
							{/* nav bar will show these links if you're an admin */}
							<Link to="/home">Home</Link>
							<Link to="/books">Shop All Books</Link>
							<Link to="/cart">Cart</Link>
							<Link to="/admin">Admin Portal</Link>
							<a href="#" onClick={handleClick}>
								Logout
							</a>
						</div>
					</nav>
				</div>
			);
		}
		// if(isLoggedIn){
		// console.log('this.props.cart', this.props.cart[0]);
		// }

		return (
			<div>
				<h1>BOOKSTACK</h1>
				<nav>
					{isLoggedIn ? (
						<div>
							{/* The navbar will show these links after you log in */}
							<Link to="/home">Home</Link>
							<Link to="/books">Shop All Books</Link>
							<Link to="/cart">Cart</Link>
							<a href="#" onClick={handleClick}>
								Logout
							</a>
						</div>
					) : (
						<div>
							{/* The navbar will show these links before you log in */}
							<Link to="/home">Home</Link>
							<Link to="/books">Shop All Books</Link>
							<Link to="/login">Login</Link>
							<Link to="/signup">Sign Up</Link>
							<Link to="/cart">{`Cart(${this.state.total})`}</Link>
						</div>
					)}
				</nav>
				<hr />
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		isLoggedIn: !!state.auth.id,
		isAdmin: state.auth.role === 'admin',
		cart: state.cart
	};
};

const mapDispatch = dispatch => {
	return {
		handleClick() {
			dispatch(logout());
		}
	};
};

export default connect(mapState, mapDispatch)(Navbar);
