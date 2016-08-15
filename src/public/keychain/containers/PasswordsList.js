import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { passwordsSelector } from 'public/keychain/selectors'

import EntryAbstract from 'public/keychain/components/EntryAbstract'

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
          <EntryAbstract
            key={password.id}
            {...password}
          />
        )}
      </ul>
    )
  }
}

PasswordsList.propTypes = {
  passwords: PropTypes.array.isRequired,
}



// wrap the component to inject dispatch and state into it
export default connect (passwordsSelector)(PasswordsList)


