import React, { Component, PropTypes } from 'react'

import PasswordGeneratorButton from 'public/keychain/components/PasswordGeneratorButton'

export default class PasswordField extends Component {

  constructor(props) {
    super(props)

    this.state = {
      hidden: true
    }
  }

  toogleVisibility() {
    this.setState({hidden: ! this.state.hidden})
  }

  setPassword(password) {
    let falseEvent = {}
    falseEvent.preventDefault = () => { return }
    falseEvent.target= {
      value: password
    }
    this.props.onChange(falseEvent)
  }

  render() {
    return (
      <div className="group-field-inline adjoined-inputs">
        <input
          className="joined"
          id={this.props.id}
          name={this.props.name}
          type={this.state.hidden ? "password" : "text"}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <button
          type="button"
          className={this.state.hidden ? 'eye-hidden joined' : 'eye-visible joined'}
          title="Toogle content visibility"
          onClick={this.toogleVisibility.bind(this)}
        >
          <span className="accessibility">Toogle visibility</span>
        </button>
        <PasswordGeneratorButton
          setPassword={this.setPassword.bind(this)}
        />
      </div>
    )
  }
}

PasswordField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
