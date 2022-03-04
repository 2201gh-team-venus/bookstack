import React from 'react';

function CartItems() {
	return (
		<div className="items__row">
			<div className="items__left-container">
				<img
					className="items__img"
					src="https://images-na.ssl-images-amazon.com/images/I/51lFAzVQUxL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg"
				/>
			</div>
			<div className="items__right-container">
				<h4 className="items__name">Harry Potter and the Order of the Phoenix</h4>
				<div className="items__quantity-wrapper">
					<button type="button">increase</button>
					<div className="items__quantity">1</div>
					<button type="button">decrease</button>
				</div>
				<div className="items__price">$13.69</div>
			</div>
		</div>
	);
}

export default CartItems;
