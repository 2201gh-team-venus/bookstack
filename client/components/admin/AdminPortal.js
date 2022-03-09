import React from 'react';
import { Link } from 'react-router-dom';

const AdminPortal = () => {
	return (
		<div>
			<br />
			<Link to="/users">
				<button type="button">View User Information</button>
			</Link>
			<Link to="/products">
				<button className="admin-buttons" type="button">View and Edit Products</button>
			</Link>
		</div>
	);
};

export default AdminPortal;
