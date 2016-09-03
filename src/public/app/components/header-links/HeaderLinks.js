import React, { Component, PropTypes } from 'react'

import LoginLink from 'public/user/components/login-link/LoginLink'

import StatusButton from 'public/app/containers/StatusButton'
import UserMenuButton from 'public/user/containers/UserMenuButton'

import styles from './headerLinks.less'

export default class HeaderLinks extends Component {

  render () {

    if (this.props.authenticated) {
      return (
        <ul className={styles.headerLinks}>
          <li><StatusButton /></li>
          <li><UserMenuButton /></li>
        </ul>
      )
    }

    return (
      <ul className={styles.headerLinks}>
        <li><LoginLink
          className={styles.link}
          activeClassName={styles.linkActive}
        /></li>
    <li>{/*<Link
          className="top-link"
          activeClassName="selected"
          to={'/signup/'}
          >Sign up</Link>*/}</li>
      </ul>
    )
  }
}

HeaderLinks.propTypes = {
  authenticated: PropTypes.bool,
}
