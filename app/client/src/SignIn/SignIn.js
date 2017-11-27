import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    if(localStorage.getItem('_isLoggedIn')) {
      this.state = {username: '', password: '', response: '', foundName: '', foundUsername: '', foundPassword: '' , 
      updateName: '', isLoggedIn: localStorage.getItem('_isLoggedIn')};
    } else {
      this.state = {username: '', password: '', response: '', foundName: '', foundUsername: '', foundPassword: '' , 
      updateName: '', isLoggedIn: false};
    }

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signOut = this.signOut.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.updateAccountsInfo = this.updateAccountsInfo.bind(this);
    this.onNameUpdate = this.onNameUpdate.bind(this);
  }

  handleUserNameChange(event) {
    this.setState({username: event.target.value, response: ''});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value, response: ''});
  }

  onNameUpdate(event) {
    this.setState({
      updateName: event.target.value,
      response: ''
    });
  }

  deleteAccount() {
    axios.delete('http://localhost:8000/api/', {
      params: {
        username: this.state.username
      }
    })
    .then(response => {
      localStorage.removeItem('_isLoggedIn');
      this.setState({response: response.data, isLoggedIn: false})
    })
    .catch(error => this.setState({response: 'There was an error. Please try again.'}))
  }

  updateAccountsInfo() {
    axios.put('http://localhost:8000/api/', {
      username: this.state.foundUsername,
      updateName: this.state.updateName
    })
    .then(response => this.setState({response: 'Name is updated.'}))
    .catch(error => this.setState({response: 'There is an error. Please try again.'}))
  }

  signOut() {
    this.setState({response: ''})
    if(localStorage.getItem('_isLoggedIn')) {
      localStorage.removeItem('_isLoggedIn');
      this.setState({isLoggedIn: false});
    }
  }

  handleSubmit() { 
    axios.get('http://localhost:8000/api/', {
      params: {
        username: this.state.username,
      }
    })
    .then(response => {
      if(response.data.length === 1) {
        if(response.data[0].username === this.state.username && response.data[0].password === this.state.password) {
          localStorage.setItem('_isLoggedIn', true);
          this.setState({
            foundName: response.data[0].name,
            foundUsername: response.data[0].username,
            foundPassword: response.data[0].password,
            isLoggedIn: true,
            updateName: response.data[0].name
          });
        }
        if(response.data[0].username === this.state.username && response.data[0].password !== this.state.password) {
          this.setState({response: "Password is incorrect. Please try again."});
        }
      } else {
        this.setState({response: "Username or password is incorrect or the account does not exists at all. Please try again."});
      }
    })
    .catch(error => this.setState({'response': "Please check your internet connection and try again."}));
  }

  render() {
    if(this.state.isLoggedIn === false) {
      return (
        <div>
            <h1>Registration System</h1>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleUserNameChange} />
            <br />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
            <br />
            <input className="submit-input" type="submit" value="Sign In" onClick={this.handleSubmit} />
            <p>Not a member? <Link to='/signup'>Sign Up!</Link></p>
            <p>{this.state.response}</p>
            <footer>
              <p className="footer-personal">Designed &amp; coded by
              <a href="https://shahzaibkhalid.github.io" target="_blank"> Shahzaib Khalid</a>
              </p>
              <p className="footer-code-license">Registration System is licensed under the
              <a href="https://github.com/shahzaibkhalid/registration-system/blob/master/LICENSE.txt" target="_blank"> MIT License.</a>
              </p>
            </footer>
        </div>
      );
    } else {
      return(
        <div>
          <h1> Successfully Logged in!</h1>
          <input value={this.state.updateName} onChange={this.onNameUpdate} />
          <br />
          <input type="password" value={this.state.foundPassword} readOnly />
          <br />
          <input value={this.state.foundUsername} readOnly />
          <br />
          <button onClick={this.updateAccountsInfo}>Update Name</button>
          <br />
          <button onClick={this.deleteAccount}>Click to delete your account.</button>
          <br />
          <button onClick={this.signOut}>Click to sign out</button>
          <p>{this.state.response}</p>
          <footer>
            <p className="footer-personal">Designed &amp; coded by
              <a href="https://shahzaibkhalid.github.io" target="_blank"> Shahzaib Khalid</a>
            </p>
            <p className="footer-code-license">Registration System is licensed under the
              <a href="https://github.com/shahzaibkhalid/registration-system/blob/master/LICENSE.txt" target="_blank"> MIT License.</a>
            </p>
          </footer>
        </div>
      )
    }
  }
}

export default SignIn;