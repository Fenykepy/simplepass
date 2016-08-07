import React, { Component } from 'react'

import { connect } from 'react-redux'

import { logout } from '../../user/actions'
import { fetchEjsonIfNeeded } from '../../ejson/actions'

import { homeSelector } from '../selectors'


import Header from '../../app/components/Header'
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

    let child
    // we show spinner while ejson fetches
    if (! this.props.ejson || ! this.props.ejson.fetched) {
      child = <Spinner message="Fetching ejson..." />
    } else {
      child = <div />
    }



    return (
      <section role="main">
        <Header
          authenticated={this.props.user.is_authenticated}
        />
      </section>
    )
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(homeSelector)(Home)