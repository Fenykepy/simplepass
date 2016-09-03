import React, { Component, PropTypes } from 'react'

import Link from 'react-router/lib/Link'

import AuthLinks from 'public/app/components/AuthLinks'
import AdminLinks from 'public/app/components/AdminLinks'

import styles from './header.less'

export default class Header extends Component {

  render() {

    let children = null
    if (! this.props.authenticated) {
      // we show authentication links if user is not authenticated
      children = <AuthLinks />
    } else {
      children = <AdminLinks />
    }

    return (
      <header
        role="banner"
        className={styles.header }
      >
        <h1
          className={styles.title}
        >
          <Link 
            to={"/"}
            className={styles.link}
          ><span>SimplePass <sup>beta</sup></span>
          </Link>
        </h1>
            {children}
      </header>
    )
  }
}
