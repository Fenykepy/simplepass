import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { keychainSelector } from 'public/keychain/selectors'

import { setFilter } from 'public/keychain/actions'
import { setDocumentTitle } from 'public/app/actions'

import LeftPanel from 'public/keychain/components/LeftPanel'
import Toolbar from 'public/keychain/components/Toolbar'

class Keychain extends Component {

  setFilter(e) {
    this.props.dispatch(setFilter(e.target.value))
  }

  componentDidMount() {
    // we set title
    setDocumentTitle('')
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
          <Toolbar
            filter={this.props.filter}
            filterChange={this.setFilter.bind(this)}
          />
          {this.props.children}
        </section>
      </div>
    )
  }
}

// wrap the component to inject dispatch and state into it
export default connect (keychainSelector)(Keychain)
