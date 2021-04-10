import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import logo from './logo.svg';

class LogIn extends Component {
  constructor () {
    super()
    this.state = {
      user: {
        userName: '',
        password: ''
      },
      redirect: false
    }
  }

  handleChange = (e) => {
    const updatedUser = {...this.state.user}
    const inputField = e.target.name
    const inputValue = e.target.value
    updatedUser[inputField] = inputValue

    this.setState({user: updatedUser})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.mockLogIn(this.state.user)
    this.setState({redirect: true})
  }

  render () {
    if (this.state.redirect) {
      return (<Redirect to="/userProfile"/>)
    }

    return (
      <div id="login">
        <img src={logo} className="App-logo" alt="logo" />

        <form id="buttons" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="userName">User Name: </label>
            <input type="text" name="userName" onChange={this.handleChange} value={this.state.user.userName} required  />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" required />
          </div>
          <button><p>Log In</p></button>
        </form>
      </div>
    );
  }
}

export default LogIn