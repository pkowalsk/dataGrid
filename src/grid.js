import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

class Grid extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
	}
}

module.exports = Grid;
