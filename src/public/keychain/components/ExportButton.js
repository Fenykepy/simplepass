import React, { Component, PropTypes } from 'react'

export default class ExportButton extends Component {
  
  
  getButtonState() {
    // we disable button if window.saveAs is not available
    try {
      let isFileSaverSupported = !!new Blob;
      return ""
    } catch (e) {
      return "disabled"
    }
  }
  
  render() {

    //console.log('ExportButton', this.props)

    return (
      <button
        disabled={this.getButtonState()}
        className="secondary max"
        title="Export encryted keychain to your harddrive"
        onClick={this.props.saveEjson}
      >Export Keychain</button>
    )
  }
}
