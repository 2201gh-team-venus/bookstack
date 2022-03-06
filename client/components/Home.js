import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Home = props => {
	const { username } = props.user;

	return (
		<div>
			<h3>Welcome, {username ? username : 'Guest'}</h3>
		</div>
	);
};

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		user: state.auth
	};
};

export default connect(mapState)(Home);
