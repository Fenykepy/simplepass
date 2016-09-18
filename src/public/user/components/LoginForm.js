import React, { Component, PropTypes } from 'react'


import FormRequiredFields from 'public/form/form-required-fields/FormRequiredFields'
import FormRequiredField from 'public/form/form-required-field/FormRequiredField'
import FormFieldErrors from 'public/form/form-field-errors/FormFieldErrors'
import FieldWrapper from 'public/form/field-wrapper/FieldWrapper'

export default class LoginForm extends Component {

  render() {
    //console.log('LoginForm', this.props)
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
          <label htmlFor="id-username">Username:<FormRequiredField /></label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'username'}
          />
          <input id="id-username"
            name="username"
            type="text"
            value={this.props.username}
            maxLength="254"
            onChange={this.props.handleUsernameChange.bind(this)}
            required
          />
        </FieldWrapper>
        <FieldWrapper>
          <label htmlFor="id-password">Password:<FormRequiredField /></label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'password'}
          />
          <input id="id-password"
            name="password"
            type="password"
            value={this.props.password}
            maxLength="254"
            onChange={this.props.handlePasswordChange.bind(this)}
            required
          />
        </FieldWrapper>
      </form>
    )
  }
}
