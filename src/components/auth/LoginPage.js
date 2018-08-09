import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            user: '',
            error: false,
            password: '',
            formSubmitted: false
        };

        this.login = this.login.bind(this);
        this.showError = this.showError.bind(this);
    }

    login(){
        let userName = this.refs['username'].value,
            password = this.refs['password'].value;

        this.setState({ error: false, password, user: userName, formSubmitted:true });

        if(userName.length === 0 || password.length === 0){
            this.setState({ error: true });
        } else {
            this.setState({ loggedIn: true, user: userName  });
            this.props.history.push(`/grid/${userName}`);
        }
    }

    /*userErrorClass(){
        if(this.state.formSubmitted){
            let userName = this.state.user;

            if(userName.length > 0 && !this.state.error) {
                return 'form-control';
            } else if(userName.length === 0 && this.state.error) {
                return 'form-control is-invalid';
            }
        } else {
            return 'form-control';
        }
    }

    passwordErrorClass(){
        if(this.state.formSubmitted){
            let password = this.state.password;

            if(password.length > 0 && !this.state.error) {
                return 'form-control';
            } else if(password.length === 0 && this.state.error) {
                return 'form-control is-invalid';
            }
        } else {
            return 'form-control';
        }
    }*/

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
                    <div className="input-group" style={{marginRight: "auto", marginLeft: "auto"}}>
                        <input type="text" ref="username" id="username" placeholder="Username" aria-label="Enter a Username"  />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="input-group" style={{marginRight: "auto", marginLeft: "auto"}}>
                        <input type="text" ref="password" id="password" placeholder="Password" aria-label="Enter a Password"  />
                    </div>
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
