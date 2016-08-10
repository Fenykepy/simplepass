
// wrap the component to inject dispatch and state into it
import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { keychainSelector } from '../selectors'

import LeftPanel from '../components/LeftPanel'

class Keychain extends Component {

  render() {
    // injected by connect call
    const {
      dispatch,
      keychain,
    } = this.props

    //console.log('Keychain', this.props)

    return (
      <div id="keychain">
        <LeftPanel
          n_passwords={this.props.keychain.n_passwords}
          n_notes={this.props.keychain.n_notes}
          n_bank_cards={this.props.keychain.n_bank_cards}
          n_groups={this.props.keychain.n_groups}
        />
      </div>
    )
  }
}

export default connect (keychainSelector)(Keychain)
