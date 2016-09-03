import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { loginSelector } from '../selectors'

import { login } from 'public/user/actions'
import { setDocumentTitle } from 'public/app/actions'

import LoginForm from 'public/user/components/LoginForm'
import SignupLink from 'public/user/components/signup-link/SignupLink'
import Spinner from 'public/app/components/Spinner'

const LOGIN_FORM = "login-form"

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  componentWillMount() {
    this.componentWillRender(this.props)
  }

  componentDidMount() {
    // we set title
    setDocumentTitle('Sign in')
  }

  componentWillReceiveProps(nextProps) {
    this.componentWillRender(nextProps)
  }

  componentWillRender(props) {
    // redirect to next url or home if user is authenticated
    if (props.user.is_authenticated) {
      let next = props.location.query.next || '/'
      console.log(`user authenticated, redirect to ${next}`)
      this.context.router.push(next)
    }
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

    //console.log('Login', this.props)

    
    let child
    // show spinner if user is logging in
    if (this.props.user.is_logging_in) {
      child = <Spinner message="Logging in..." />
    } else  {
      child = (
        <article id="column-form">
          <h1>Log In to SimplePass</h1>
          <LoginForm
            id={LOGIN_FORM}
            onSubmit={this.handleLogin.bind(this)}
            handleUsernameChange={this.handleUsernameChange.bind(this)}
            handlePasswordChange={this.handlePasswordChange.bind(this)}
            username={this.state.username}
            password={this.state.password}
            errors={this.props.user.login_errors}
          />
          <footer>
            <div className="field-wrapper">
              <input
                className="primary max"
                form={LOGIN_FORM}
                value="Log in"
                type="submit"
              />
            </div>
            <div>No account yet? <SignupLink /></div>
          </footer>
        </article>
      )
    }

    return (
      <section role="main">
        {child}
      </section>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

// Wrap the component to inject dispatch and state into it
export default connect(loginSelector)(Login)
