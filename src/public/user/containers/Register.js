import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { registerSelector } from '../selectors'

import Link from 'react-router/lib/Link'

import { register } from '../actions'

import { setDocumentTitle } from '../../app/actions'

import RegisterForm from '../components/RegisterForm'
import Spinner from '../../app/components/Spinner'
import Header from '../../app/components/Header'


const REGISTER_FORM = "register-form"

class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      password_confirm: '',
      email: '',
      errors: {},
    }
  }

  componentWillMount() {
    this.componentWillRender(this.props)
  }

  componentDidMount() {
    // we set title
    setDocumentTitle('Sign up')
  }

  componentWillReceiveProps(nextProps) {
    this.componentWillRender(nextProps)
  }

  componentWillRender(props) {
    // redirect home if user is authenticated
    if (props.user.is_authenticated) {
      console.log('user authenticated, redirect home')
      this.context.router.push('/')
    }
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
    let errors = this.validateForm()
    // we got errors
    if (Object.keys(errors).length > 0) {
      return this.setState({errors: errors})
    }
    // form is clean, submit it
    this.props.dispatch(register(this.state))
  }

  getErrors() {
    // return combined errors from state and props (client and server ones)
    return {...this.props.user.registration_errors, ...this.state.errors}
  }

  validateForm() {
    // if password and password confirm don't match, add error
    let errors = {}
    if (this.state.password && this.state.password_confirm &&
        this.state.password !== this.state.password_confirm) {
          errors.password_confirm = [
            'Password and password confirmation must match.'
          ]
    }

    return errors
  }


  render() {
    // injected by connect call
    const {
      dispatch,
      user,
    } = this.props

    //console.log('Register, this.props)

    let child
    // show spinner if user is registering
    if (this.props.user.is_registering) {
      child = <Spinner message="Signing up..." />
    } else {
      child = (
        <article id="column-form">
          <h1>Join SimplePass</h1>
          <RegisterForm
            id={REGISTER_FORM}
            onSubmit={this.handleRegister.bind(this)}
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
            <div className="field-wrapper">
              <input
                className="primary max"
                form={REGISTER_FORM}
                value="Sign up"
                type="submit"
              />
            </div>
            <div>Already have an account? <Link to={'/login/'}>Log in</Link></div>
          </footer>
        </article>
      )
    }

    return (
      <section role="main">
        <Header
          authenticated={this.props.user.is_authenticated}
        />
        {child}
      </section>
    )
  }
}

Register.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

// wrap the component to inject dispatch and state into it
export default connect (registerSelector)(Register)
