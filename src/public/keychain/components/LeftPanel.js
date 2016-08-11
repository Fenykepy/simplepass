import React, { Component, PropTypes } from 'react'

import Link from 'react-router/lib/Link'

import ImportExportButtonsWrapper from '../containers/ImportExportButtonsWrapper'

export default class LeftPanel extends Component {
  
  render() {
    return (
      <nav id="left-panel">
        <ul>
          <li><Link
              activeClassName="selected"
              to={'/passwords/'}
            >
              <h6>Passwords</h6>
            <div className="number">
              {this.props.n_passwords}
            </div>
          </Link>
          </li>
          <li><Link
              activeClassName="selected"
              to={'/notes/'}
            >
              <h6>Notes</h6>
            <div className="number">
              {this.props.n_notes}
            </div>
            </Link>
          </li>
          <li><Link
              activeClassName="selected"
              to={'/bank-cards/'}
            >
              <h6>Bank cards</h6>
            <div className="number">
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
