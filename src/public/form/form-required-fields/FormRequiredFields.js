import React, { Component, PropTypes } from 'react'

import FormRequiredField from 'public/form/form-required-field/FormRequiredField'
import FieldWrapper from 'public/form/field-wrapper/FieldWrapper'

export default class FormRequiredFields extends Component {

  render() {
    return (
      <FieldWrapper>
        <FormRequiredField /> : required fields.
      </FieldWrapper>
    )
  }
}
