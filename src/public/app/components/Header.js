import React, { Component, PropTypes } from 'react'

import Link from 'react-router/lib/Link'

import AuthLinks from './AuthLinks'
import AdminLinks from './AdminLinks'

export default class Header extends Component {

  render() {

    let children = null
    if (! this.props.authenticated) {
      // we show authentication links if user is not authenticated
      children = <AuthLinks />
    } else {
      children = <AdminLinks />
    }
    return (
      <header role="banner">
        <h1><Link to={"/"}>SimplePass</Link></h1>
        {children}
      </header>
    )
  }
}
