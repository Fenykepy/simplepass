import React, { Component, PropTypes } from 'react'

import styles from './passwordGeneratorButton.less'

import AccessibilityText from 'public/app/components/accessibilityText/AccessibilityText'
import PasswordGenerator from '../passwordGenerator/PasswordGenerator'

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
          className={styles.generator}
          onClick={this.toggleGenerator.bind(this)}
          type="button"
          title="Generate a password automatically"
        >
          <AccessibilityText
            text="Generate a password automatically"
          />
        </button>
        {this.getGenerator()}
      </div>
    )
  }
}

PasswordGeneratorButton.propTypes = {
  setPassword: PropTypes.func.isRequired,
}
