import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import {
  addPassword,
  updatePassword,
} from 'public/keychain/actions'

import ModalContent from 'public/modal/components/ModalContent'
import ModalFooter from 'public/modal/components/ModalFooter'
import PasswordEditionForm from 'public/keychain/components/PasswordEditionForm'

const PASSWORD_FORM = "password-form"

class PasswordEdition extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      username: '',
      email: '',
      password: '',
      url: '',
      description: '',
      errors: {},
    }
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value})
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value})
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleUrlChange(e) {
    this.setState({url: e.target.value})
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    let errors = this.validateForm()
    // we got errors
    if (Object.keys(errors).length > 0) {
      return this.setState({errors: errors})
    }
    // form is clean, submit it
    // we remove erros from state
    let password = {...this.state}
    delete password.errors
    if (this.props.password) {
      // we update an existing password
      password.id = this.props.password.id
      this.props.dispatch(updatePassword(password))
    } else {
      // we create a new password
      this.props.dispatch(addPassword(password))
    }
    // we close modal
    this.props.closeModal()
  }

  validateForm() {
    // title is required
    let errors = {}
    if (! this.state.title) {
      errors.title = [
        'This field is required.'
      ]
    }
    return errors
  }

  render() {
    // injected by connect call
    const {
      dispatch,
    } = this.props

    //console.log('PasswordEdition', this.props)
    
    let value = this.props.password ?
      'Update password' :
        'Add password'

    return (
      <div>
        <ModalContent>
          <PasswordEditionForm
            id={PASSWORD_FORM}
            onSubmit={this.handleSubmit.bind(this)}
            handleTitleChange={this.handleTitleChange.bind(this)}
            handleUsernameChange={this.handleUsernameChange.bind(this)}
            handleEmailChange={this.handleEmailChange.bind(this)}
            handlePasswordChange={this.handlePasswordChange.bind(this)}
            handleUrlChange={this.handleUrlChange.bind(this)}
            handleDescriptionChange={this.handleDescriptionChange.bind(this)}
            title={this.state.title}
            username={this.state.username}
            email={this.state.email}
            password={this.state.password}
            url={this.state.url}
            description={this.state.description}
            errors={this.state.errors}
          />
        </ModalContent>
        <ModalFooter>
          <button
            onClick={this.props.closeModal}
          >Cancel</button>
          <input
            type="submit"
            className="primary"
            form={PASSWORD_FORM}
            value={value}
          />
        </ModalFooter>
      </div>
    )
  }
}

// wrap the component to inject dispatch and state into it
export default connect ()(PasswordEdition)
