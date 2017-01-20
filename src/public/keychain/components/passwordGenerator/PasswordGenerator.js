import React, { Component, PropTypes } from 'react'

import crypto from 'public/crypto'
import PasswordGeneratorForm from '../passwordGeneratorForm/PasswordGeneratorForm'

const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const UPPER = LOWER.toUpperCase()
const NUMBER = '0123456789'
const SPECIAL = '!"#$%&\'()*+,-./:;<>=?@[]^_`{}|~'
const SPACE = ' '

export default class PasswordGenerator extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      length: 40,
      lower: true,
      upper: true,
      number: true,
      special: true,
      spaces: false,
    }
  }

  handleLengthChange(e) {
    this.setState({length: parseInt(e.target.value, 10)})
  }

  handleLowerChange(e) {
    this.setState({lower: ! this.state.lower})
  }

  handleUpperChange(e) {
    this.setState({upper: ! this.state.upper})
  }

  handleNumberChange(e) {
    this.setState({number: ! this.state.number})
  }

  handleSpecialChange(e) {
    this.setState({special: ! this.state.special})
  }

  handleSpacesChange(e) {
    this.setState({spaces: ! this.state.spaces})
  }

  generatePassword() {
    let charset = ''

    if (this.state.lower) charset += LOWER
    if (this.state.upper) charset += UPPER
    if (this.state.number) charset += NUMBER
    if (this.state.special) charset += SPECIAL
    if (this.state.spaces) charset += SPACE

    // we generate string and set it as password
    this.props.setPassword(crypto.randomString(
      charset,
      this.state.length
    ))
    this.props.closeGenerator()
  }

  render() {
    return (
      <div
        id="password-generator"
      >
        <PasswordGeneratorForm
          handleLengthChange={this.handleLengthChange.bind(this)}
          handleLowerChange={this.handleLowerChange.bind(this)}
          handleUpperChange={this.handleUpperChange.bind(this)}
          handleNumberChange={this.handleNumberChange.bind(this)}
          handleSpecialChange={this.handleSpecialChange.bind(this)}
          handleSpacesChange={this.handleSpacesChange.bind(this)}
          length={this.state.length}
          lower={this.state.lower}
          upper={this.state.upper}
          number={this.state.number}
          special={this.state.special}
          spaces={this.state.spaces}
        />
        <button
          type="button"
          className="primary max"
          onClick={this.generatePassword.bind(this)}
        >Generate password</button>
      </div>
    )
  }
}

PasswordGenerator.propTypes = {
  setPassword: PropTypes.func.isRequired,
  closeGenerator: PropTypes.func.isRequired,
}
