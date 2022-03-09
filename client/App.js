import React from 'react';
import { cartItems } from './store/cart';
import Navbar from './components/Navbar';
import Routes from './Routes';
import { connect } from 'react-redux';

class App extends React.Component {
	componentDidMount() {
		this.props.cartItems();
	}

	render() {
		let localBooks = JSON.parse(window.localStorage.getItem('temp'));
		return (
			<div>
				<Navbar localBooks={localBooks} />
				<Routes />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		cart: state.cart
	};
};

const mapDispatchStateToProps = dispatch => {
	return {
		cartItems: () => dispatch(cartItems())
	};
};

export default connect(mapStateToProps, mapDispatchStateToProps)(App);
