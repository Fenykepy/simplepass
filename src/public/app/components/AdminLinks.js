import React, { Component } from 'react'

import Link from 'react-router/lib/Link'

import StatusButton from 'public/app/containers/StatusButton'
import UserMenuButton from 'public/user/containers/UserMenuButton'

export default class AdminLinks extends Component {

  getTitle() {

  }
  render() {
    return (
      <ul className="top-links">
        <li><StatusButton /></li>
        <li><UserMenuButton /></li>
      </ul>
    )
  }
}
