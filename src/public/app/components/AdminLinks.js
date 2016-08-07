import React, { Component } from 'react'

import Link from 'react-router/lib/Link'

import UserMenuButton from '../../user/containers/UserMenuButton'

export default class AdminLinks extends Component {

  render() {
    return (
      <ul className="top-links">
        <li><a href="" className="top-link">Test</a></li>
        <li><UserMenuButton /></li>
      </ul>
    )
  }
}
