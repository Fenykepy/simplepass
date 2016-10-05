import React, { Component, PropTypes } from 'react'

import styles from './toolbar.less'

import AddEntryButton from 'public/keychain/components/AddEntryButton'

export default class Toolbar extends Component {

  render() {
    //console.log('toolbar', this.props)
    return (
      <header
        className={styles.toolbar}
      >
        <input
          id="filter"
          type="text"
          onChange={this.props.filterChange}
          value={this.props.filter}
          placeholder="Filter..."
        />
        <AddEntryButton>Add</AddEntryButton>
      </header>
    )
  }
}

Toolbar.propTypes = {
  filter: PropTypes.string,
  filterChange: PropTypes.func.isRequired,
}
