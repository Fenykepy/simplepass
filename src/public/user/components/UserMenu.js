import React, { Component } from 'react'

import Link from 'react-router/lib/Link'

export default class UserMenu extends Component {

  render() {
    return (
      <div>
        <div id="overlay" className="transparent"
          onClick={this.props.close}
        />
        <ul className="dropdown-menu">
          <li><a
              href=""
              onClick={this.props.logout}
          >Logout</a></li>
        </ul>
      </div>
    )
  }
}
