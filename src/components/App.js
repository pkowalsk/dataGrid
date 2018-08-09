import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './home/HomePage';
import LoginPage from './auth/LoginPage';

class App extends React.Component {
	render() {
      return (
          <div className="container-fluid">
			<Switch>
				<Route exact path="/" component={LoginPage} />
				<Route exact path="/grid/:userName" component={HomePage} />
				<Route component={LoginPage} />
			</Switch>
          </div>
      );
  }
}

export default App;
