import React, { Component, PropTypes } from 'react'

import PassphraseEditionButton from 'public/app/components/PassphraseEditionButton'
import AdminLink from 'public/app/components/admin-link/AdminLink'
import DropdownMenu from 'public/app/components/dropdown-menu/DropdownMenu'
import DropdownList from 'public/app/components/dropdown-list/DropdownList'

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
          <DropdownList>
            {this.getAdminLink()}
            <li><PassphraseEditionButton /></li>
            <li><a
                href=""
                onClick={this.props.logout}
            >Logout</a></li>
          </DropdownList>
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
