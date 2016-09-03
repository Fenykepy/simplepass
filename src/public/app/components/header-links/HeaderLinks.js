import React, { Component, PropTypes } from 'react'

import LoginLink from 'public/user/components/login-link/LoginLink'
import SignupLink from 'public/user/components/signup-link/SignupLink'

import StatusButton from 'public/app/containers/status-button/StatusButton'
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
        <li><SignupLink
          className={styles.link}
          activeClassName={styles.linkActive}
        /></li>
      </ul>
    )
  }
}

HeaderLinks.propTypes = {
  authenticated: PropTypes.bool,
}
