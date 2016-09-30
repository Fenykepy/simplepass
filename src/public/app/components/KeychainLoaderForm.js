import React, { Component, PropTypes } from 'react'


import FormFieldErrors from 'public/form/form-field-errors/FormFieldErrors'
import FieldWrapper from 'public/form/field-wrapper/FieldWrapper'


export default class KeychainLoaderForm extends Component {

  render() {
    //console.log('KeychainLoaderForm', this.props)


    return (
      <form
        id={this.props.id}
        onSubmit={this.props.onSubmit}
      >
        <FieldWrapper>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'non_field_errors'}
          />
        </FieldWrapper>
        <FieldWrapper>
          <label htmlFor="id-pass">Master passphrase:</label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'pass'}
          />
          <input id="id-pass"
            name="pass"
            type="password"
            value={this.props.pass}
            onChange={this.props.handlePassChange.bind(this)}
            required
          />
        </FieldWrapper>
      </form>
    )
  }
}


