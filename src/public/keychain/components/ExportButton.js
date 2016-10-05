import React, { Component, PropTypes } from 'react'

import Button from 'public/form/buttons/Button'

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
      <Button
        disabled={this.getButtonState()}
        secondary={true}
        max={true}
        title="Export encryted keychain to your harddrive"
        onClick={this.props.saveEjson}
      >Export Keychain</Button>
    )
  }
}
