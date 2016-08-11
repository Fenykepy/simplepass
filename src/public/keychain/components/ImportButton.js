import React, { Component, PropTypes } from 'react'

export default class ImportButton extends Component {
  
  render() {

    //console.log('ImportButton', this.props)

    return (
      <button
        className="secondary max"
        title="Import encryted keychain from your harddrive"
        onClick={() => console.log('not implemented...')}
      >Import Keychain</button>
    )
  }
}
