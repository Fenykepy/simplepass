import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { loadKeychain } from 'public/app/actions'
import { setDocumentTitle } from 'public/app/actions'

import KeychainLoaderForm from 'public/app/components/KeychainLoaderForm'

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
      <article id="column-form">
        <h1>Unlock keychain</h1>
        <KeychainLoaderForm
          id={KEYCHAIN_LOADER_FORM}
          onSubmit={this.handleLoadKeychain.bind(this)}
          handlePassChange={this.handlePassChange.bind(this)}
          pass={this.state.pass}
          errors={this.state.errors}
        />
        <footer>
          <div className="field-wrapper">
            <input
              className="primary max"
              form={KEYCHAIN_LOADER_FORM}
              value="Unlock"
              type="submit"
            />
          </div>
        </footer>

      </article>
    )
  }
}

// wrap the component to inject dispatch and state into it
export default connect ()(KeychainLoader)
