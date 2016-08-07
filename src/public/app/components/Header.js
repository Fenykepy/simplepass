import React, { Component, PropTypes } from 'react'

import Link from 'react-router/lib/Link'

import AuthLinks from './AuthLinks'

export default class Header extends Component {

  render() {

    let children = null
    if (! this.props.user.is_authenticated) {
      console.log('authenticated')
      // we show authentication links if user is not authenticated
      children = <AuthLinks />
    }
    return (
      <header role="banner">
        <h1><Link to={"/"}>SimplePass</Link></h1>
        {children}
      </header>
    )
  }
}
