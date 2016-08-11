import React, { Component } from 'react'

import { connect } from 'react-redux'

import { logout } from '../../user/actions'
import { fetchEjsonIfNeeded } from '../../ejson/actions'

import { homeSelector } from '../selectors'

import InitPassphrase from './InitPassphrase'
import KeychainLoader from './KeychainLoader'
import Keychain from '../../keychain/containers/Keychain'
import Header from '../components/Header'
import Spinner from '../components/Spinner'

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
    } = this.props

    return (
      <section role="main">
        <Header
          authenticated={this.props.authenticated}
        />
        {this.getChild()}
      </section>
    )
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(homeSelector)(Home)
