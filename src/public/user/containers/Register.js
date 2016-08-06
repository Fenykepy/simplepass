import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { registerSelector } from '../selectors'

import { register } from '../actions'
import {
  setDocumentTitle,
} from '../../app/actions'

// import RegisterForm from '../../components/RegisterForm'
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
}

