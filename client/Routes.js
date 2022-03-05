import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import AllBooks from './components/AllBooks';
import SingleBook from './components/SingleBook';
import Cart from './components/Cart';
import AdminPortal from './components/admin/AdminPortal';
import AllUsers from './components/admin/AllUsers';
import AllProducts from './components/admin/AllProducts';
import AddBook from './components/admin/AddBook';

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn, isAdmin } = this.props;

		// check if the user is logged in and is an admin:
		if (isLoggedIn && isAdmin) {
			return (
				<div>
					<Switch>
						<Route path="/home" component={Home} />
						<Route path="/admin" component={AdminPortal} />
						<Route path="/users" component={AllUsers} />
						<Route path="/products" component={AllProducts} />
						<Route path="/cart" component={Cart} />
						<Route exact path="/books" component={AllBooks} />
						<Route path="/books/add" component={AddBook} />
						<Route path="/books/:bookId" component={SingleBook} />
						<Redirect to="/home" />
					</Switch>
				</div>
			);
		}

		return (
			<div>
				{isLoggedIn ? (
					<Switch>
						<Route path="/home" component={Home} />
						<Route path="/cart" component={Cart} />
						<Route exact path="/books" component={AllBooks} />
						<Route path="/books/:bookId" component={SingleBook} />
						<Redirect to="/home" />
					</Switch>
				) : (
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/home" component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Signup} />
						<Route path="/cart" component={Cart} />
						<Route exact path="/books" component={AllBooks} />
						<Route path="/books/:bookId" component={SingleBook} />
						<Redirect to="/home" />
					</Switch>
				)}
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
		// Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
		isLoggedIn: !!state.auth.id,
		isAdmin: state.auth.role === 'admin'
	};
};

const mapDispatch = dispatch => {
	return {
		loadInitialData() {
			dispatch(me());
		}
	};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
