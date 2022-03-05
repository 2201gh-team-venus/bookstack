import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
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
						<Link to="/cart">Cart</Link>
					</div>
				)}
			</nav>
			<hr />
		</div>
	);
};

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		isLoggedIn: !!state.auth.id,
		isAdmin: state.auth.role === 'admin'
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
