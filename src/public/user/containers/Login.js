import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { loginSelector } from '../selectors'

import { login } from '../actions'
import {
  setState,
  setDocumentTitle,
} from '../../app/actions'

import { 
  LOGIN,
  REGISTER,
  HOME,
} from '../../app/states'

import LoginForm from '../components/LoginForm'
import Spinner from '../../app/components/Spinner'


const LOGIN_FORM = "login-form"

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }
  
  componentDidMount() {
    // we set title
    setDocumentTitle('Sign in')
    // we set state to LOGIN
    this.props.dispatch(setState(LOGIN))
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleLogin(e) {
    e.preventDefault()
    this.props.dispatch(login(this.state))
  }

  handleRegister(e) {
    e.preventDefault()
    this.props.dispatch(setState(REGISTER))
  }

  render() {
    // injected by connect call
    const {
      dispatch,
      user
    } = this.props

    //console.log('Login', this.props)
    
    // redirect to home page if user is authenticated
    if (this.props.user.is_authenticated) {
      dispatch(setState(HOME))
    }

    // show spinner if user is logging in
    if (this.props.user.is_logging_in) {
      return <Spinner message="Signing in..." />
    }

    return (
      <section role="main">
        <article>
          <h1>Sign in</h1>
          <LoginForm
            id={LOGIN_FORM}
            handleUsernameChange={this.handleUsernameChange.bind(this)}
            handlePasswordChange={this.handlePasswordChange.bind(this)}
            username={this.state.username}
            password={this.state.password}
            errors={this.props.user.login_errors}
          />
          <footer>
            <input
              form={LOGIN_FORM}
              value="Sign in"
              onClick={this.handleLogin.bind(this)}
              type="submit"
            />
            <div>No account yet ? <button
                onClick={this.handleRegister.bind(this)}
              >Sign up !</button></div>
          </footer>
        </article>
      </section>
    )
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(loginSelector)(Login)
