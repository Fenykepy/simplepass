import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { loginSelector } from '../selectors'

import Link from 'react-router/lib/Link'

import { login } from '../actions'
import { setDocumentTitle } from '../../app/actions'

import LoginForm from '../components/LoginForm'
import Spinner from '../../app/components/Spinner'
import Header from '../../app/components/Header'


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

    // redirect home if user is authenticated
    if (this.props.user.is_authenticated) {
      console.log('redirect home')
      this.context.router.push('/')
    }
    
    // show spinner if user is logging in
    if (this.props.user.is_logging_in) {
      return <Spinner message="Logging in..." />
    }

    return (
      <section role="main">
        <Header
          user={this.props.user}
        />
        <article id="column-form">
          <h1>Log In to SimplePass</h1>
          <LoginForm
            id={LOGIN_FORM}
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
                onClick={this.handleLogin.bind(this)}
                type="submit"
              />
            </div>
            <div>No account yet? <Link to={"/signup/"}>Sign up</Link></div>
          </footer>
        </article>
      </section>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

// Wrap the component to inject dispatch and state into it
export default connect(loginSelector)(Login)
