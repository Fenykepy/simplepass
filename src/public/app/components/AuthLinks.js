import React, { Component } from 'react'

import Link from 'react-router/lib/Link'

export default class AuthLinks extends Component {

  render() {
    return (
      <ul className="top-links">
        <li><Link
            activeClassName="selected"
            to={'/login/'}
        >Log in</Link></li>
        <li><Link
          activeClassName="selected"
          to={'/signup/'}
        >Sign up</Link></li>
      </ul>
    )
  }
}
