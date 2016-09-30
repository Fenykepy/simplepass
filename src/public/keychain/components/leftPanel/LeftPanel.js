import React, { Component, PropTypes } from 'react'

import styles from './leftPanel.less'

import Link from 'react-router/lib/Link'

import ImportExportButtonsWrapper from 'public/keychain/containers/ImportExportButtonsWrapper'

export default class LeftPanel extends Component {
  
  render() {
    return (
      <nav className={styles.leftPanel}>
        <ul>
          <li><Link
              className={styles.link}
              activeClassName={styles.selected}
              to={'/passwords/'}
            >
              <h6>Passwords</h6>
            <div className={styles.number}>
              {this.props.n_passwords}
            </div>
          </Link>
          </li>
          <li><Link
              className={styles.link}
              activeClassName={styles.selected}
              to={'/notes/'}
            >
              <h6>Notes</h6>
            <div className={styles.number}>
              {this.props.n_notes}
            </div>
            </Link>
          </li>
          <li><Link
              className={styles.link}
              activeClassName={styles.selected}
              to={'/bank-cards/'}
            >
              <h6>Bank cards</h6>
            <div className={styles.number}>
              {this.props.n_bank_cards}
            </div>
            </Link>
          </li>
        </ul>
        <ImportExportButtonsWrapper />
      </nav>
    )
  }
}
