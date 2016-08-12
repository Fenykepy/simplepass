import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { statusSelector } from 'public/app/selectors'

import { lockKeychain } from 'public/app/actions'

class StatusButton extends Component {

  getTitle() {
    return this.props.status.locked ? 
      'Keychain is locked' :
      'Keychain is unlocked, click to lock'
  }

  getClassName() {
    return this.props.status.locked ?
      'locked' :
      'unlocked'
  }

  handleClick() {
    // we lock keychain if it's unlocked
    if (! this.props.status.locked) {
      this.props.dispatch(lockKeychain())
    }
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
        className="top-link"
        onClick={this.handleClick.bind(this)}
      ><div
          className={this.getClassName()}
        ><span>{this.props.status.locked ? 'locked' : 'unlocked'}</span></div></button>
    )
  }
}


// wrap the component to inject dispatch and state into it
export default connect (statusSelector)(StatusButton)
