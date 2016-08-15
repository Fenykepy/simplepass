import React, { Component, PropTypes } from 'react'

import AddEntryButton from 'public/keychain/components/AddEntryButton'

export default class Toolbar extends Component {

  render() {
    //console.log('toolbar', this.props)
    return (
      <header id="toolbar">
        <input
          id="filter"
          type="text"
          onChange={this.props.filterChange}
          value={this.props.filter}
          placeholder="Search..."
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
