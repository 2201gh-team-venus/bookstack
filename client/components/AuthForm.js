import React from 'react';
import { connect } from 'react-redux';
import { authenticateSignUp, authenticateLogin } from '../store';

/**
 * COMPONENT
 */
const AuthFormSignUp = props => {
	const { name, displayName, handleSubmit, error } = props;

	return (
		<div>
			<form onSubmit={handleSubmit} name={name}>
				<div>
					<label htmlFor="username">
						<h4>Username:</h4>
					</label>
					<input name="username" type="text" />
				</div>
				<div>
					<label htmlFor="email">
						<h4>Email:</h4>
					</label>
					<input name="email" type="text" />
				</div>
				<div>
					<label htmlFor="password">
						<h4>Password:</h4>
					</label>
					<input name="password" type="password" />
				</div>
				<hr />
				<div>
					<button type="submit">{displayName}</button>
				</div>
				{error && error.response && <div> {error.response.data} </div>}
			</form>
		</div>
	);
};

const AuthFormLogin = props => {
	const { name, displayName, handleSubmit, error } = props;

	return (
		<div>
			<form onSubmit={handleSubmit} name={name}>
				<div>
					<label htmlFor="username">
						<h4>Username:</h4>
					</label>
					<input name="username" type="text" />
				</div>
				<div>
					<label htmlFor="password">
						<h4>Password:</h4>
					</label>
					<input name="password" type="password" />
				</div>
				<hr />
				<div>
					<button type="submit">{displayName}</button>
				</div>
				{error && error.response && <div> {error.response.data} </div>}
			</form>
		</div>
	);
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
	return {
		name: 'login',
		displayName: 'Login',
		error: state.auth.error
	};
};

const mapSignup = state => {
	return {
		name: 'signup',
		displayName: 'Sign Up',
		error: state.auth.error
	};
};

const mapDispatchSignUp = dispatch => {
	return {
		handleSubmit(evt) {
			evt.preventDefault();
			const formName = evt.target.name;
			const username = evt.target.username.value;
			const email = evt.target.email.value;
			const password = evt.target.password.value;
			dispatch(authenticateSignUp(username, password, email, formName));
		}
	};
};

const mapDispatchLogin = dispatch => {
	return {
		handleSubmit(evt) {
			evt.preventDefault();
			const formName = evt.target.name;
			const username = evt.target.username.value;
			const password = evt.target.password.value;
			dispatch(authenticateLogin(username, password, formName));
		}
	};
};

export const Login = connect(mapLogin, mapDispatchLogin)(AuthFormLogin);
export const Signup = connect(mapSignup, mapDispatchSignUp)(AuthFormSignUp);
