import React, { Component, PropTypes } from 'react'

import PassphraseEditionButton from 'public/app/components/PassphraseEditionButton'
import AdminLink from 'public/app/components/admin-link/AdminLink'
import DropdownMenu from 'public/app/components/dropdown-menu/DropdownMenu'

export default class UserMenu extends Component {

  getAdminLink() {
    if (! this.props.admin) return null

    return (
      <li><AdminLink /></li>
    )
  }

  render() {
    return (
      <div>
        <DropdownMenu
          close={this.props.close}
        >
          <ul className="dropdown-menu">
            {this.getAdminLink()}
            <li><PassphraseEditionButton /></li>
            <li><a
                href=""
                onClick={this.props.logout}
            >Logout</a></li>
          </ul>
        </DropdownMenu>
      </div>
    )
  }
}

UserMenu.propTypes = {
  admin: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
}
