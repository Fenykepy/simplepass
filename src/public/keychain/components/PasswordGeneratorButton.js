import React, { Component, PropTypes } from 'react'

import PasswordGenerator from 'public/keychain/components/PasswordGenerator'

export default class PasswordGeneratorButton extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  toggleGenerator() {
    this.setState({open: ! this.state.open})
  }

  getGenerator() {
    if (! this.state.open) return null
    return (
      <PasswordGenerator
        setPassword={this.props.setPassword}
        closeGenerator={this.toggleGenerator.bind(this)}
      />
    )
  }
  
  render() {
    return (
      <div
        style={{position: 'relative'}}
      >
        <button
          className="joined generator"
          onClick={this.toggleGenerator.bind(this)}
          type="button"
          title="Generate a password automatically"
        >
          <span className="accessibility">Generate a password automatically</span>
        </button>
        {this.getGenerator()}
      </div>
    )
  }
}

PasswordGeneratorButton.propTypes = {
  setPassword: PropTypes.func.isRequired,
}
