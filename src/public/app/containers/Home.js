import React, { Component } from 'react'

import { connect } from 'react-redux'

import { logout } from '../../user/actions'
import { fetchEjsonIfNeeded } from '../../ejson/actions'

import { homeSelector } from '../selectors'


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
    return (
      <section>
        <header>
          <h1>SimplePass</h1>
          <button
            onClick={this.logout.bind(this)}
          >Logout</button>
        </header>
        <aside>
        </aside>
      </section>
    )
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(homeSelector)(Home)
