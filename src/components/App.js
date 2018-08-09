import React from 'react';

import HomePage from './home/HomePage';

class App extends React.Component {
	render() {
      return (
          <div className="container-fluid">
            <div>
							<HomePage />
						</div>
          </div>
      );
  }
}

export default App;
