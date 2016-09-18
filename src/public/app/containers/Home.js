import React, { Component } from 'react'


import { connect } from 'react-redux'

import { fetchEjsonIfNeeded } from 'public/ejson/actions'
import { setDocumentTitle } from 'public/app/actions'

import { homeSelector } from 'public/app/selectors'

import InitPassphrase from 'public/app/containers/InitPassphrase'
import KeychainLoader from 'public/app/containers/KeychainLoader'
import Keychain from 'public/keychain/containers/Keychain'
import Spinner from 'public/app/components/spinner/Spinner'

import PasswordEdition from 'public/keychain/containers/PasswordEdition'

class Home extends Component {

  componentWillMount() {
    this.props.dispatch(fetchEjsonIfNeeded())
  }

  componentDidMount() {
    // we set title
    setDocumentTitle()
  }

  getChild() {
    // we test if crypto is present in browser 
    if (! window.crypto) {
      return <div><em>Sorry, your browser doen't support webCrypto, upgrade it.</em></div>
    }
    
    // we use webkitSubtle prefix if necessairy
    if (! window.crypto.subtle && window.crypto.webkitSubtle) {
      window.crypto.subtle = window.crypto.webkitSubtle
    }

    // we test if crypto.subtle is present in browser
    if (! window.crypto.subtle) {
      return <div><em>Sorry, your browser doen't support webCrypto.subtle, upgrade it.</em></div>
    }

    // we show spinner while ejson fetches
    if (! this.props.ejson || ! this.props.ejson.fetched) {
      return <Spinner message="Fetching ejson..." />
    }

    // we show master passphrase form if ejson is empty string
    if (! this.props.ejson.ejson) {
      return <InitPassphrase />
    }


    // for testing only
    /*    return (
      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
      }}>
        <PasswordEdition />
      </div>
      )*/

    // we show unlocking form if keychain is locked
    if (this.props.locked) {
      return <KeychainLoader />
    }

    // we show keychain
    return (
      <Keychain
        children={this.props.children}
      />
    )

  }


  render() {
    // injected by connect call
    const {
      dispatch,
      authenticated,
      ejson,
      locked,
      modal,
    } = this.props

    return (
      <section role="main">

        {this.getChild()}
        {this.props.modal}
      </section>
    )
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(homeSelector)(Home)
