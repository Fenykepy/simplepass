import React, { Component } from 'react'

import { connect } from 'react-redux'

import { logout } from '../../user/actions'
import { fetchEjsonIfNeeded } from '../../ejson/actions'

import { homeSelector } from '../selectors'

import MasterPassphrase from './MasterPassphrase'
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

  render() {
    // injected by connect call
    const {
      dispatch,
      user
    } = this.props

    
    if (! window.crypto) {
      return <div><em>Sorry, your browser doen't support webCrypto, upgrade it.</em></div>
    }
    try {
      new TextEncoder('utf-8').encode('my_str')
    }
    catch (e) {
      return <div><em>Sorry, your browser doen't support TextEncoder, upgrade it.</em></div>
    }


    let child
    // we show spinner while ejson fetches
    if (! this.props.ejson || ! this.props.ejson.fetched) {
      child = <Spinner message="Fetching ejson..." />
    }

    // we show master passphrase form if ejson is empty string
    if (! this.props.ejson.ejson) {
      child = <MasterPassphrase />
    } else {
      child = <div />
    }



    return (
      <section role="main">
        <Header
          authenticated={this.props.user.is_authenticated}
        />
        {child}
      </section>
    )
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(homeSelector)(Home)
