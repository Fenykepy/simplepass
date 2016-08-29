import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { adminSelector } from 'public/admin/selectors'

import { fetchUsersNumber } from 'public/admin/actions'

import Spinner from 'public/app/components/Spinner'

class Admin extends Component {
  
  componentWillMount() {
    this.props.dispatch(fetchUsersNumber()) 
  }

  render() {
    // injected by connect call
    const {
      dispatch,
      n_users,
      user,
    } = this.props
    
    console.log('Admin', this.props)
    // if we are fetching users, show spinner
    if (this.props.n_users.is_fetching) {
      return <Spinner message="Fetching users number..." />
    }

    return (
      <section id="admin">
        <div>Number of users : {this.props.n_users.n_users}</div>
      </section>
    )
  }
}

// wrap the component to inject dispatch and state into it
export default connect (adminSelector)(Admin)

