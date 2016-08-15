import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import {
  addPassword,
  updatePassword,
  deletePassword,
} from 'public/keychain/actions'

import Modal from 'public/modal/components/Modal'
import ModalContent from 'public/modal/components/ModalContent'
import ModalFooter from 'public/modal/components/ModalFooter'
import PasswordEditionForm from 'public/keychain/components/PasswordEditionForm'
import DeleteConfirm from 'public/keychain/components/DeleteConfirm'

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

  componentWillMount() {
    // we update existing password
    if (this.props.password) {
      let pwd = this.props.password
      // populate state with existing password
      this.setState({
        title: pwd.title || '',
        username: pwd.username || '',
        email: pwd.email || '',
        password: pwd.password || '',
        url: pwd.url || '',
        description: pwd.description || '',
      })
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
    // we remove errors from state
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
    this.context.closeModal()
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

  getDeleteButton() {
    if (! this.props.password) return null
    // we update existing password, show delete button
    return (
      <div className="delete">
        <button
          onClick={this.confirmDeletePassword.bind(this)}
        >Delete</button>
      </div>
    )
  }

  confirmDeletePassword() {
    let modal = (
      <Modal
        modal_closable={true}
        title="Delete a password"
      >
        <DeleteConfirm
          type="password"
          title={this.props.password.title}
          delete={this.deletePassword.bind(this)}
        />
      </Modal>
    )

    this.context.setModal(modal)
  }

  deletePassword() {
    this.props.dispatch(deletePassword(
      this.props.password.id
    )) 
    // we close modal
    this.context.closeModal()
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
          {this.getDeleteButton()}
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
            onClick={this.context.closeModal}
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

PasswordEdition.propTypes = {
  password: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
}

PasswordEdition.contextTypes = {
  setModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}
// wrap the component to inject dispatch and state into it
export default connect ()(PasswordEdition)

