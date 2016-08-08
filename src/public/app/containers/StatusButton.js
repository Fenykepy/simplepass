import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { statusSelector } from '../selectors'

class StatusButton extends Component {

  getTitle() {
    return this.props.status.locked ? 
      'Keychain is locked, click to unlock' :
      'Keychain is unlocked, click to lock'
  }

  getClassName() {
    return this.props.status.locked ?
      'locked' :
      'unlocked'
  }

  render() {
    // injected by connect call
    const {
      dispatch,
      status,
    } = this.props
    //console.log('statusButton', this.props)

    return (
      <button
        title={this.getTitle()}
        className="top-link"><div
          className={this.getClassName()}
        ><span>{this.props.status.locked ? 'locked' : 'unlocked'}</span></div></button>
    )
  }
}


// wrap the component to inject dispatch and state into it
export default connect (statusSelector)(StatusButton)
