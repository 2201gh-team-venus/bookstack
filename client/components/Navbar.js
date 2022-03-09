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
		// const books = JSON.parse(window.localStorage.getItem('temp'));
		// console.log("this.props", this.props)
		// console.log("this.props.cart", this.props.cart)

		
		// let sum = 0;
		let sum1= 0;
		// if (books) {
		// 	books.map(book => (sum += book.quantity));
		// 	console.log('Im in localstorage', sum);
		// 	return sum;
		// }
	// 	else {
			const signedInBooks=  this.props.cart || []
			// console.log("signnedINBooks", signedInBooks)

			if(signedInBooks){
			signedInBooks.map(book => (sum1 += book.quantity));
			// console.log("sum1===>",sum1)
			return sum1;
			}
	// 	}
	}

	componentDidMount() {
		console.log("component did mount!")
		setInterval(
			() =>
		this.setState({
			total: this.getTotalQuantity()
		}),
			500
		);
	}

	// componentDidUpdate(prevProp, prevState){
	// 	if(prevState.total !== this.state.total){
	// 		this.setState({
	// 			total: this.getTotalQuantity()
	// 		})
	// 	}
	// }

	render() {
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
		// if (isLoggedIn) {
		// 	console.log('this.props.cart', this.props.cart);
		// }
		// let books = this.props.cart;
		// let num = 0;
		// let bookNum = books.map(book => (num += book.quantity));
		// console.log("num", num)

		return (
			<div>
				<h1>BOOKSTACK</h1>
				<nav>
					{isLoggedIn ? (
						<div>
							{/* The navbar will show these links after you log in */}
							<Link to="/home">Home</Link>
							<Link to="/books">Shop All Books</Link>
							<Link to="/cart">{`Cart(${this.state.total})`}</Link>
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
