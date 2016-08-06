import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { registerSelector } from '../selectors'

import { register } from '../actions'
import {
  setState,
  setDocumentTitle,
} from '../../app/actions'

import {
  LOGIN,
  HOME,
} from '../../app/states'

import RegisterForm from '../components/RegisterForm'
import Spinner from '../../app/components/Spinner'


const REGISTER_FORM = "register-form"

class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      password_confirm: '',
      email: '',
    }
  }

  componentDidMount() {
    // we set title
    setDocumentTitle('Sign up')
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handlePasswordConfirmChange(e) {
    this.setState({password_confirm: e.target.value})
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }

  handleRegister(e) {
    e.preventDefault()
    this.props.dispatch(register(this.state))
  }

  handleCancel(e) {
    e.preventDefault()
    this.props.dispatch(setState(LOGIN))
  }

  getErrors() {
    // if password and confirm are set and not equal, add error
    if (this.state.password && this.state.password_confirm &&
        this.state.password !== this.state.password_confirm) {
          return Object.assign({}, this.props.user.registration_errors, {
            password_confirm: ['Password and password confirmation must match.']
          })
    }
    return this.props.user.registration_errors
  }


  render() {
    // injected by connect call
    const {
      dispatch,
      user,
    } = this.props

    //console.log('Register, this.props)

    // redirect to home page if user is authenticated
    if (this.props.user.is_authenticated) {
      dispatch(setState(HOME))
    }

    // show spinner if user is registering
    if (this.props.user.is_registering) {
      return <Spinner message="Signing up..." />
    }

    return (
      <section role="main">
        <article>
          <h1>Sign up</h1>
          <RegisterForm
            handleUsernameChange={this.handleUsernameChange.bind(this)}
            handlePasswordChange={this.handlePasswordChange.bind(this)}
            handlePasswordConfirmChange={this.handlePasswordConfirmChange.bind(this)}
            handleEmailChange={this.handleEmailChange.bind(this)}
            username={this.state.username}
            password={this.state.password}
            password_confirm={this.state.password_confirm}
            email={this.state.email}
            errors={this.getErrors()}
          />
          <footer>
            <input
              form={REGISTER_FORM}
              value="Sign up"
              onClick={this.handleRegister.bind(this)}
              type="submit"
            />
            <button
              onClick={this.handleCancel.bind(this)}
            >Cancel</button>
          </footer>
        </article>
      </section>
    )
  }
}

// wrap the component to inject dispatch and state into it
export default connect (registerSelector)(Register)
