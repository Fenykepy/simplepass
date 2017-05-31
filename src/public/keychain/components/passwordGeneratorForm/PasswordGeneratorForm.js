import React, { Component, PropTypes } from 'react'

import FieldWrapper from 'public/form/fieldWrapper/FieldWrapper'
import CheckboxField from 'public/form/checkboxField/CheckboxField'


export default class PasswordGeneratorForm extends Component {

  render() {
    console.log('PasswordGeneratorForm', this.props)

    return (
      <div>
        <FieldWrapper>
          <CheckboxField
            checked={this.props.lower}
            name="lower"
            onChange={this.props.handleLowerChange}
            label="Allow lower case letters"
          />
        </FieldWrapper>
        <FieldWrapper>
          <CheckboxField
            checked={this.props.upper}
            name="upper"
            onChange={this.props.handleUpperChange}
            label="Allow upper case letters"
          />
        </FieldWrapper>
        <FieldWrapper>
          <CheckboxField
            checked={this.props.number}
            name="number"
            onChange={this.props.handleNumberChange}
            label="Allow numbers"
          />
        </FieldWrapper>
        <FieldWrapper>
          <CheckboxField
            name="special"
            checked={this.props.special}
            onChange={this.props.handleSpecialChange}
            label="Allow special characters"
          />
        </FieldWrapper>
        <FieldWrapper>
          <CheckboxField
            name="spaces"
            checked={this.props.spaces}
            onChange={this.props.handleSpacesChange}
            label={'Allow white spaces " "'}
          />
        </FieldWrapper>
        <FieldWrapper>
          <label htmlFor="id-length">Password length:</label>
          <input
            id="id-length"
            name="length"
            type="number"
            step="1"
            value={this.props.length}
            onChange={this.props.handleLengthChange}
          />
        </FieldWrapper>
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
