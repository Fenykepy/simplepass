import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { loginSelector } from '../selectors'

import { login } from '../actions'

import LoginForm from '../components/LoginForm'
import Spinner from '../../app/components/Spinner'

//import { setDocumentTitleIfNeeded } from '../../app/actions'


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
    //this.props.dispath(setDocumentTitleIfNeeded('Login page'))
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

  render() {
    // injected by connect call
    const {
      dispatch,
      user
    } = this.props

    console.log('Login', this.props)

    // show spinner is user is logging in
    if (this.props.user.is_logging_in) {
      return <Spinner message="Signing in..." />
    }

    return (
      <section role="main">
        <article>
          <h1>Sign in</h1>
          <LoginForm
            handleUsernameChange={this.handleUsernameChange.bind(this)}
            handlePasswordChange={this.handlePasswordChange.bind(this)}
            id={LOGIN_FORM}
            username={this.state.username}
            password={this.state.password}
            errors={this.props.user.errors}
          />
          <footer>
            <input
              form={LOGIN_FORM}
              value="Sign in"
              onClick={this.handleLogin.bind(this)}
              type="submit"
            />
            <div>No account yet ? <button>Sign up !</button></div>
          </footer>
        </article>
      </section>
    )
  }
}
// Wrap the component to inject dispatch and state into it
export default connect(loginSelector)(Login)
