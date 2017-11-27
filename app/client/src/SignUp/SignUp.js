import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      response: ''
    }
    this.signUp = this.signUp.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  usernameChange(event) {
    this.setState({username: event.target.value, response: ''});
  }

  passwordChange(event) {
    this.setState({password: event.target.value, response: ''});
  }

  nameChange(event) {
    this.setState({name: event.target.value, response: ''});
  }


  signUp() {
    axios.get('http://localhost:8000/api/', {
      params: {
        username: this.state.username
      }
    })
    .then(response => {
      if(response.data.length === 0) {
        axios.post('http://localhost:8000/api/', {
          username: this.state.username,
          name: this.state.name,
          password: this.state.password
        })
        .then(response => this.setState({response: response.data}))
        .catch(err => this.setState({response: 'There was an error. Please check internet and try again.'}))
      } else {
        this.setState({response: 'This username already exist. Please try something else.'})
      }
    });
  }

  render() {
    return(
      <div>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" value={this.state.username} onChange={this.usernameChange} />
        <br />
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" value={this.state.name} onChange={this.nameChange}/>
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" value={this.state.password} onChange={this.passwordChange}/>
        <br />
        <input className="submit-input" type="submit" value="Sign Up" onClick={this.signUp} />
        <br />
        <p>Want to Sign In?</p> <Link to='/'>Go back to home!</Link>
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

export default SignUp;