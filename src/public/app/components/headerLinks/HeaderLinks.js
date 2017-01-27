import React, { Component, PropTypes } from 'react'

import LoginLink from 'public/user/components/loginLink/LoginLink'
import SignupLink from 'public/user/components/signupLink/SignupLink'

import StatusButton from 'public/app/containers/statusButton/StatusButton'
import UserMenuButton from 'public/user/containers/userMenuButton/UserMenuButton'

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
