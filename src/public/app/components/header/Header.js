import React, { Component, PropTypes } from 'react'

import Link from 'react-router/lib/Link'

import HeaderLinks from 'public/app/components/headerLinks/HeaderLinks'

import styles from './header.less'

export default class Header extends Component {

  render() {

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
        <HeaderLinks
          authenticated={this.props.authenticated}
        />
      </header>
    )
  }
}

Header.propTypes = {
  authenticated: PropTypes.bool,
}
