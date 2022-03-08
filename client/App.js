import React from 'react';

import Navbar from './components/Navbar';
import Routes from './Routes';

const App = () => {
	let localBooks = JSON.parse(window.localStorage.getItem('temp'))
	return (
		<div>
			<Navbar localBooks={localBooks}/>
			<Routes />
		</div>
	);
};

export default App;
