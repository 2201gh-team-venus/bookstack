import React from 'react';

function CartItems(props) {
	return (
		<div className="items__row">
			<div className="items__left-container">
				<img className="items__img" src={props.data.imageURL} />
			</div>
			<div className="items__right-container">
				<h4 className="items__name">{props.data.name}</h4>
				<div className="items__quantity-wrapper">
					<button
						onClick={() => props.quantityFn(props.data.id, 'increase')}
						type="button">
						increase
					</button>
					<div className="items__quantity">{props.data.quantity}</div>
					<button
						onClick={() => props.quantityFn(props.data.id, 'decrease')}
						type="button">
						decrease
					</button>
				</div>
				<div className="items__price">${props.data.price}</div>
			</div>
		</div>
	);
}

export default CartItems;
