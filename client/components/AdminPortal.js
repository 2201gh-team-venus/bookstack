import React from 'react';
import { Link } from 'react-router-dom';

const AdminPortal = () => {
	return (
		<div>
			<Link to="/users">
				<button type="button">View User Information</button>
			</Link>

			<button type="button">View and Edit Products</button>
		</div>
	);
};

export default AdminPortal;
