import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../store/users';

class AllUsers extends React.Component {
	componentDidMount() {
		this.props.loadUsers();
	}

	render() {
		if (!this.props.users || this.props.users.length === 0) {
			return <h1>No Users!</h1>;
		}

		const users = this.props.users;
		return (
			<div>
				<h3>All Users:</h3>
				<ul>
					{users.map(user => (
						<li key={user.id}>{user.username}</li>
					))}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = ({ users }) => {
	return { users };
};

const mapDispatchToProps = dispatch => {
	return {
		loadUsers: () => dispatch(fetchUsers())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
