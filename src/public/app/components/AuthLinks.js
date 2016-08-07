import React, { Component } from 'react'

import { Link } from 'react-router'

export default class AuthLinks extends Component {

  render() {
    return (
      <ul className="top-links">
        <li><Link
            className="transparent"
            to={'/login/'}
        >Log in</Link></li>
        <li><Link
          className="transparent"
          to={'/signup/'}
        >Sign up</Link></li>
      </ul>
    )
  }
}
