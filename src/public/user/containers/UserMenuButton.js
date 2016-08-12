import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { userMenuSelector } from 'public/user/selectors'

import { logout } from 'public/user/actions'

import UserMenu from 'public/user/components/UserMenu'

class UserMenuButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      menu: false
    }
  }

  toogleMenu(e) {
    e.preventDefault()
    this.setState({menu: ! this.state.menu})
  }

  closeMenu() {
    this.setState({menu: false})
  }

  logout(e) {
    e.preventDefault()
    this.props.dispatch(logout())
  }

  getMenu() {
    if (this.state.menu) {
      return (
        <UserMenu
          close={this.closeMenu.bind(this)}
          logout={this.logout.bind(this)}
        />
      )
    }
    return null
  }

  render() {
    // injected by connect call
    const {
      dispatch,
      user,
    } = this.props

    return (
      <button
        className="top-link dropdown-link"
        onClick={this.toogleMenu.bind(this)}
      ><div>{this.props.user.username}</div>
        {this.getMenu()}
      </button>
    )
  }
}

// wrap the component to inject dispatch and state into it
export default connect (userMenuSelector)(UserMenuButton)
