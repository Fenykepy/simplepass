import React, { Component, PropTypes } from 'react'

import Link from 'react-router/lib/Link'
import PassphraseEditionButton from 'public/app/components/PassphraseEditionButton'

export default class UserMenu extends Component {

  getAdminLink() {
    if (! this.props.admin) return null

    return (
      <li><a
          href="/admin/"
      >Admin</a></li>
    )
  }

  render() {
    return (
      <div>
        <div id="overlay" className="transparent"
          onClick={this.props.close}
        />
        <ul className="dropdown-menu">
          {this.getAdminLink()}
          <li><PassphraseEditionButton /></li>
          <li><a
              href=""
              onClick={this.props.logout}
          >Logout</a></li>
        </ul>
      </div>
    )
  }
}

UserMenu.propTypes = {
  admin: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
}
