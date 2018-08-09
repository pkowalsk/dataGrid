import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            user: '',
            error: false
        };

        this.login = this.login.bind(this);
        this.showError = this.showError.bind(this);
    }

    login(){
        let userName = this.refs['username'].value,
            password = this.refs['password'].value;

        this.setState({ error: false });

        if(userName.length == 0 || password.length == 0){
            this.setState({ error: true });
        }

        this.setState({ loggedIn: true, user: userName  });
        this.props.history.push(`/grid/${userName}`);
    }

    showError(){
        if(!this.state.error){
            return 'errorDiv hidden';
        } else {
            return 'errorDiv';
        }
    }

  render() {
    return (
        <div style={{textAlign: "center"}}>
            <h1>ServiceNow Exercise</h1>

            <div className={this.showError()} style={{fontWeight: "bold", color: "red"}}>
                You must enter a username and password.
            </div>

            <div className="row">
                <div className="col-md-6">
                    <input type="text" className="formInput" placeholder="Username" ref="username" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <input type="password" className="formInput" placeholder="Password" ref="password" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <button type="button" className="btn btn-primary" onClick={this.login}>Login</button>
                </div>
            </div>
        </div>
    )
  }
}
export default withRouter(LoginPage);
