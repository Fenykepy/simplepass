import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { passwordsSelector } from 'public/keychain/selectors'

class Passwords extends Component {

  render() {

    // injected by connect call
    const {
      dispatch,
      passwords,
    } = this.props
    
    console.log('Passwords', this.props)
    return (
      <div></div>
    )
  }
}

const mapStateToProps = state => {
  return {passwords: state.keychain.passwords}
}

// wrap the component to inject dispatch and state into it
export default connect (passwordsSelector)(Passwords)
