import React, { Component, PropTypes } from 'react'

export default class PasswordGeneratorForm extends Component {

  render() {
    console.log('PasswordGeneratorForm', this.props)

    return (
      <div>
        <div className="field-wrapper">
          <div className="checkbox">
            <label htmlFor="id-lower"><input
              id="id-lower"
              name="lower"
              type="checkbox"
              checked={this.props.lower}
              onChange={this.props.handleLowerChange}
            />Allow lower case letters</label>
          </div>
        </div>
        <div className="field-wrapper">
          <div className="checkbox">
            <label htmlFor="id-upper"><input
              id="id-upper"
              name="upper"
              type="checkbox"
              checked={this.props.upper}
              onChange={this.props.handleUpperChange}
            />Allow upper case letters</label>
          </div>
        </div>
        <div className="field-wrapper">
          <div className="checkbox">
            <label htmlFor="id-number"><input
              id="id-number"
              name="number"
              type="checkbox"
              checked={this.props.number}
              onChange={this.props.handleNumberChange}
            />Allow numbers</label>
          </div>
        </div>
        <div className="field-wrapper">
          <div className="checkbox">
            <label htmlFor="id-special"><input
              id="id-special"
              name="special"
              type="checkbox"
              checked={this.props.special}
              onChange={this.props.handleSpecialChange}
            />Allow special characters</label>
          </div>
        </div>
        <div className="field-wrapper">
          <div className="checkbox">
            <label htmlFor="id-spaces"><input
              id="id-spaces"
              name="spaces"
              type="checkbox"
              checked={this.props.spaces}
              onChange={this.props.handleSpacesChange}
            />Allow white spaces " "</label>
          </div>
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-length">Password length:</label>
          <input
            id="id-length"
            name="length"
            type="number"
            step="1"
            value={this.props.length}
            onChange={this.props.handleLengthChange}
          />
        </div>
      </div>
    )
  }
}

PasswordGeneratorForm.propTypes = {
  length: PropTypes.number.isRequired,
  handleLengthChange: PropTypes.func.isRequired,
  lower: PropTypes.bool.isRequired,
  handleLowerChange: PropTypes.func.isRequired,
  upper: PropTypes.bool.isRequired,
  handleUpperChange: PropTypes.func.isRequired,
  number: PropTypes.bool.isRequired,
  handleNumberChange: PropTypes.func.isRequired,
  special: PropTypes.bool.isRequired,
  handleSpecialChange: PropTypes.func.isRequired,
  spaces: PropTypes.bool.isRequired,
  handleSpacesChange: PropTypes.func.isRequired,
}
