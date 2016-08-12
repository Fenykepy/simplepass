import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { keychainSelector } from '../selectors'

import LeftPanel from '../components/LeftPanel'
import Toolbar from '../components/Toolbar'

class Keychain extends Component {

  render() {
    // injected by connect call
    const {
      dispatch,
      n_passwords,
      n_notes,
      n_bank_cards,
      n_groups,
    } = this.props

    //console.log('Keychain', this.props)

    return (
      <div id="keychain">
        <LeftPanel
          n_passwords={this.props.n_passwords}
          n_notes={this.props.n_notes}
          n_bank_cards={this.props.n_bank_cards}
          n_groups={this.props.n_groups}
        />
        <section id="entries-list">
          <Toolbar />
          {this.props.children}
        </section>
      </div>
    )
  }
}

// wrap the component to inject dispatch and state into it
export default connect (keychainSelector)(Keychain)
