import React, { Component } from 'react'

import Link from 'react-router/lib/Link'

import StatusButton from '../containers/StatusButton'
import UserMenuButton from '../../user/containers/UserMenuButton'

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
