import React, { Component, PropTypes } from 'react'

import Link from 'react-router/lib/Link'

import AuthLinks from 'public/app/components/AuthLinks'
import AdminLinks from 'public/app/components/AdminLinks'

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
        <h1><Link to={"/"}>SimplePass </Link><sup>beta</sup></h1>
        {children}
      </header>
    )
  }
}
