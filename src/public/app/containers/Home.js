import React, { Component } from 'react'

import { connect } from 'react-redux'

import { logout } from 'public/user/actions'
import { fetchEjsonIfNeeded } from 'public/ejson/actions'

import { homeSelector } from 'public/app/selectors'

import InitPassphrase from 'public/app/containers/InitPassphrase'
import KeychainLoader from 'public/app/containers/KeychainLoader'
import Keychain from 'public/keychain/containers/Keychain'
import Header from 'public/app/components/Header'
import Spinner from 'public/app/components/Spinner'

class Home extends Component {

  componentWillMount() {
    this.props.dispatch(fetchEjsonIfNeeded())
  }

  logout(e) {
    e.preventDefault()
    this.props.dispatch(logout())
  }

  getChild() {
    // we test if crypto is present in browser 
    if (! window.crypto) {
      return <div><em>Sorry, your browser doen't support webCrypto, upgrade it.</em></div>
    }
    // we test if TextEncoder is present in browser 
    try {
      new TextEncoder('utf-8').encode('my_str')
    }
    catch (e) {
      return <div><em>Sorry, your browser doen't support TextEncoder, upgrade it.</em></div>
    }

    // we show spinner while ejson fetches
    if (! this.props.ejson || ! this.props.ejson.fetched) {
      return <Spinner message="Fetching ejson..." />
    }

    // we show master passphrase form if ejson is empty string
    if (! this.props.ejson.ejson) {
      return <InitPassphrase />
    }

    // we show unlocking form if keychain is locked
    /* hide this to style easily keychain components
    if (this.props.locked) {
      return <KeychainLoader />
    }
    */

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

        <Header
          authenticated={this.props.authenticated}
        />
        {this.getChild()}
        {this.props.modal}
      </section>
    )
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(homeSelector)(Home)
