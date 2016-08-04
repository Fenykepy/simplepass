import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { loginSelector } from '../selectors'

import { login } from '../actions'

import LoginForm from '../components/LoginForm'
import Spinner from '../../app/components/Spinner'

//import { setDocumentTitleIfNeeded } from '../../app/actions'

class Login extends Component {
  
  componentDidMount() {
    // we set title
    //this.props.dispath(setDocumentTitleIfNeeded('Login page'))
  }

  handleLogin(credentials) {
    this.props.dispatch(login(credentials))
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
            id="login-form"
            handleSubmit={this.handleLogin.bind(this)}
            errors={this.props.user.errors}
          />
        </article>
      </section>
    )
  }
}
// Wrap the component to inject dispatch and state into it
export default connect(loginSelector)(Login)
