import React from 'react';

function CartItems(props) {
	if (props.data) {
		return (
			<div className="items__row">
				<div className="items__left-container">
					<img className="items__img" src={ props.data.imageURL } />
				</div>
				<div className="items__right-container">
					<h2 className="items__name">{props.data.name}</h2>
					<div className="items__quantity-wrapper">
						<button className='increase__button'
							onClick={() =>
								props.quantityFn(props.quantity, 'increase', props.data)
							}
							type="button">
							+
						</button>
						<div className="items__quantity">{props.quantity}</div>
						<button className='decrease__button'
							onClick={() =>
								props.quantityFn(props.quantity, 'decrease', props.data)
							}
							type="button">
							-
						</button>
					</div>
					<div className="items__price">${Number(props.data.price).toFixed(2)}</div>
					<button
						onClick={() => props.removeBookFn(props.data)}
						type="button"
						className="items__remove">
						Remove
					</button>
				</div>
			</div>
		);
	} else {
		return null;
	}
}

export default CartItems;
