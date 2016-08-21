import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { updatePassphrase } from 'public/app/actions'

import ModalContent from 'public/modal/components/ModalContent'
import ModalFooter from 'public/modal/components/ModalFooter'
import PassphraseEditionForm from 'public/app/components/PassphraseEditionForm'


const PASSPHRASE_FORM = "update-passphrase-form"

class PassphraseEdition extends Component {

  constructor(props) {
    super(props)

    this.state = {
      old_pass: '',
      pass: '',
      pass_confirm: '',
      errors: {}
    }
  }

  handleOldPassChange(e) {
    this.setState({old_pass: e.target.value})
  }

  handlePassChange(e) {
    this.setState({pass: e.target.value})
  }

  handlePassConfirmChange(e) {
    this.setState({pass_confirm: e.target.value})
  }

  handleEditMasterPassphrase(e) {
    e.preventDefault()
    let errors = this.validateForm()
    // we got errors
    if (Object.keys(errors).length > 0) {
      return this.setState({errors: errors})
    }
    // form is clean, submit it
    this.props.dispatch(updatePassphrase(this.state.pass))
    // then close modal
    this.context.closeModal()
  }

  validateForm() {
    // if pass and pass_confirm are set and don't match, add error
    let errors = {}
    if (! this.state.old_pass) {
      errors.old_pass = ['This field is required']
    } else if (this.props.passphrase != this.state.old_pass) {
      errors.old_pass = ['Invalid passphrase']
    }
    if (! this.state.pass) {
      errors.pass = ['This field is required']
    }
    if (! this.state.pass_confirm) {
      errors.pass_confirm = ['This field is required']
    }
    if (this.state.pass !== this.state.pass_confirm) {
      errors.non_field_errors = ['Passphrase and passphrase confirmation must match.']
    }
    return errors
  }

  
  render() {
    // injected by connect call
    const {
      passphrase,
      dispatch,
    } = this.props

    if (! this.props.passphrase) {
      return (
        <div>
          <ModalContent>
            <p><em>You first need to unlock your keychain before changing master passphrase.</em></p>
          </ModalContent>
          <ModalFooter
            className="small"
          >
            <button
              className="primary"
              onClick={this.context.closeModal}
            >Ok</button>
          </ModalFooter>
        </div>
      )
    }
    
    // console.log('PassphraseEdition', this.props)
    return (
      <div>
        <ModalContent>
          <PassphraseEditionForm
            id={PASSPHRASE_FORM}
            onSubmit={this.handleEditMasterPassphrase.bind(this)}
            handleOldPassChange={this.handleOldPassChange.bind(this)}
            handlePassChange={this.handlePassChange.bind(this)}
            handlePassConfirmChange={this.handlePassConfirmChange.bind(this)}
            old_pass={this.state.old_pass}
            pass={this.state.pass}
            pass_confirm={this.state.pass_confirm}
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
            form={PASSPHRASE_FORM}
            value="Save"
          />
        </ModalFooter>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    passphrase: state.status.passphrase
  }
}


PassphraseEdition.propTypes = {
  passphrase: PropTypes.string,
}

PassphraseEdition.contextTypes = {
  closeModal: PropTypes.func.isRequired,
}

// wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(PassphraseEdition)
