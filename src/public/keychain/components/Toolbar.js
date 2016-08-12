import React, { Component } from 'react'

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
        <button
          className="secondary"
        >Add</button>
      </header>
    )
  }
}
