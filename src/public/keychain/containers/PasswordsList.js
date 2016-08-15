import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { passwordsSelector } from 'public/keychain/selectors'

import PasswordAbstract from 'public/keychain/components/PasswordAbstract'

class PasswordsList extends Component {

  render() {

    // injected by connect call
    const {
      dispatch,
      passwords,
    } = this.props
    
    //console.log('PasswordsList', this.props)

    return (
      <ul>
        {this.props.passwords.map(password =>
          <PasswordAbstract
            key={password.id}
            {...password}
          />
        )}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return {passwords: state.keychain.passwords}
}

// wrap the component to inject dispatch and state into it
export default connect (passwordsSelector)(PasswordsList)
