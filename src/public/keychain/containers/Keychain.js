import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { keychainSelector } from 'public/keychain/selectors'

import { setFilter } from 'public/keychain/actions'
import {
  closeModal,
  setModal,
} from 'public/modal/actions'

import LeftPanel from 'public/keychain/components/LeftPanel'
import Toolbar from 'public/keychain/components/Toolbar'

class Keychain extends Component {

  getChildContext() {
    // we set setModal and closeModal as context
    // to avoid passing it everywhere
    return {
      setModal: this.setModal.bind(this),
      closeModal: this.closeModal.bind(this),
    }
  }

  setFilter(e) {
    this.props.dispatch(setFilter(e.target.value))
  }

  setModal(modal) {
    this.props.dispatch(setModal(modal))
  }

  closeModal() {
    this.props.dispatch(closeModal())
  }

  render() {
    // injected by connect call
    const {
      dispatch,
      filter,
      n_passwords,
      n_notes,
      n_bank_cards,
      n_groups,
    } = this.props

    console.log('Keychain', this.props)

    return (
      <div id="keychain">
        <LeftPanel
          n_passwords={this.props.n_passwords}
          n_notes={this.props.n_notes}
          n_bank_cards={this.props.n_bank_cards}
          n_groups={this.props.n_groups}
        />
        <section id="entries-list">
          <Toolbar
            filter={this.props.filter}
            filterChange={this.setFilter.bind(this)}
            setModal={this.setModal.bind(this)}
            closeModal={this.closeModal.bind(this)}
          />
          {this.props.children}
        </section>
      </div>
    )
  }
}

Keychain.childContextTypes = {
  setModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

// wrap the component to inject dispatch and state into it
export default connect (keychainSelector)(Keychain)
