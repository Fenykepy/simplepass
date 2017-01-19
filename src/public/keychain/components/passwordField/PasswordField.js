import React, { Component, PropTypes } from 'react'

import styles from './passwordField.less'

import PasswordGeneratorButton from 'public/keychain/components/PasswordGeneratorButton'
import PasswordStrengthIndicator from '../passwordStrengthIndicator/PasswordStrengthIndicator'

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
      <div>
        <div className={styles.wrapper}>
          <input
            className="joined"
            id={this.props.id}
            name={this.props.name}
            type={this.state.hidden ? "password" : "text"}
            value={this.props.value}
            onChange={this.props.onChange}
            autoComplete="new-password"
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
        <PasswordStrengthIndicator
          password={this.props.value}
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
