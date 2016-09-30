import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { loadKeychain } from 'public/app/actions'
import { setDocumentTitle } from 'public/app/actions'

import KeychainLoaderForm from 'public/app/components/KeychainLoaderForm'

import FormWrapper from 'public/form/form-wrapper/FormWrapper'
import FieldWrapper from 'public/form/field-wrapper/FieldWrapper'
import Submit from 'public/form/buttons/Submit'

const KEYCHAIN_LOADER_FORM = 'keychain-loader-form'

class KeychainLoader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pass: '',
      errors: {}
    }
  }

  componentDidMount() {
    // we set title
    setDocumentTitle('Unlock keychain')
  }

  handlePassChange(e) {
    this.setState({pass: e.target.value})
  }

  handleLoadKeychain(e) {
    e.preventDefault()
    this.props.dispatch(loadKeychain(this.state.pass))
    .catch(error => {
      console.log(error)
      // because we have no error message in decryption fails
      // with a bad passphrase
      this.setState({errors: {
        'pass': [error.message || 'Failed to unlock keychain with given passphrase']
      }})
    }) 
  }

  render() {
    // injected by connect call
    const {
      dispatch,
    } = this.props
  
    
    //console.log('KeychainLoader', this.props)
    return (
      <FormWrapper>
        <h1>Unlock keychain</h1>
        <KeychainLoaderForm
          id={KEYCHAIN_LOADER_FORM}
          onSubmit={this.handleLoadKeychain.bind(this)}
          handlePassChange={this.handlePassChange.bind(this)}
          pass={this.state.pass}
          errors={this.state.errors}
        />
        <footer>
          <FieldWrapper>
            <Submit
              primary={true}
              max={true}
              value="Unlock"
              form={KEYCHAIN_LOADER_FORM}
              value="Unlock"
            />
          </FieldWrapper>
        </footer>

      </FormWrapper>
    )
  }
}

// wrap the component to inject dispatch and state into it
export default connect ()(KeychainLoader)
