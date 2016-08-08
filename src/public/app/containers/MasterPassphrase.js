import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { statusSelector } from '../selectors'

import { defineMasterPassphrase } from '../actions'

import MasterPassphraseForm from '../components/MasterPassphraseForm'


const MASTER_PASSPHRASE_FORM = "master-passphrase-form"

class MasterPassphrase extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pass: '',
      pass_confirm: '',
      errors: {}
    }
  }

  handlePassChange(e) {
    this.setState({pass: e.target.value})
  }

  handlePassConfirmChange(e) {
    this.setState({pass_confirm: e.target.value})
  }

  handleSetMasterPassphrase(e) {
    e.preventDefault()
    console.log(this.state)
    let errors = this.validateForm()
    // we got errors
    if (Object.keys(errors).length > 0) {
      return this.setState({errors: errors})
    }
    this.props.dispatch(defineMasterPassphrase(this.state.pass))
  }

  validateForm() {
    // if pass and pass_confirm are set and don't match, add error
    let errors = {}
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
      dispatch,
      status
    } = this.props

    //console.log('MasterPassphrase', this.props)

    return (
      <article id="column-form">
        <h1>Set master passphrase</h1>

          <div className="field-wrapper">
          <p className="center"><em>In order to use simple pass, you first need to define a master passphrase, which will be used to encrypt and decrypt your keychain.</em></p>
          <p className="center"><strong>Make it strong and keep it secret.</strong></p>
          </div>
        <MasterPassphraseForm
          id={MASTER_PASSPHRASE_FORM}
          handlePassChange={this.handlePassChange.bind(this)}
          handlePassConfirmChange={this.handlePassConfirmChange.bind(this)}
          pass={this.state.pass}
          pass_confirm={this.state.pass_confirm}
          errors={this.state.errors}
        />
        <footer>
          <div className="field-wrapper">
            <input
              className="primary max"
              form={MASTER_PASSPHRASE_FORM}
              value="Save"
              type="submit"
              onClick={this.handleSetMasterPassphrase.bind(this)}
            />
          </div>
        </footer>
     </article>
    )
  }    
}

// wrap the component to inject dispatch and state into it
export default connect (statusSelector)(MasterPassphrase)
