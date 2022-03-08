import React from 'react';

function Checkout(props) {
	console.dir(props.books);
	console.log(props.total);

	function handleSubmit(evt) {
		evt.preventDefault();
		handleMsg(true);
	}

	function handleMsg(clicked) {
		return clicked ? <div>Thank you</div> : null;
	}

	return (
		<div className="checkout">
			{/* 
				Having a single source of data would have made it more modular.
				The problem with this is that data is coming either from local storage or redux,
				which would require several conditional statements INSIDE the smaller components and increase the chances of errors.
			 */}
			<div className="checkout-table">
				<div className="checkout-table__heading checkout-table__row">
					<div className="checkout-table__cell">Title</div>
					<div className="checkout-table__cell">Author</div>
					<div className="checkout-table__cell">Quantity</div>
					<div className="checkout-table__cell">Price</div>
				</div>
			</div>
			{props.books !== null
				? props.books.map(elm => (
						<div key={elm.id} className="checkout-table__row">
							<div className="checkout-table__cell">{elm.name}</div>
							<div className="checkout-table__cell">{elm.author.name}</div>
							<div className="checkout-table__cell">{elm.quantity}</div>
							<div className="checkout-table__cell-price checkout-table__cell">
								{elm.price}
							</div>
						</div>
				  ))
				: null}
			<h3 className="checkout-total">{props.total}</h3>
			<form onSubmit={handleSubmit} className="checkout-form">
				<input
					className="checkout-form__input"
					type="email"
					placeholder="email"
				/>
				<button className="checkout-form__btn" type="submit">
					Enter email
				</button>
			</form>

			{handleMsg()}
		</div>
	);
}

export default Checkout;
