import React, { Component, PropTypes } from 'react'


import FormRequiredFields from 'public/form/formRequiredFields/FormRequiredFields'
import FormRequiredField from 'public/form/formRequiredField/FormRequiredField'
import FormFieldErrors from 'public/form/formFieldErrors/FormFieldErrors'
import FieldWrapper from 'public/form/fieldWrapper/FieldWrapper'

export default class RegisterForm extends Component {

  render() {
    //console.log('RegisterForm', this.props)
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
        <FieldWrapper>
          <label htmlFor="id-password-confirm">Password confirmation:<FormRequiredField /></label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'password_confirm'}
          />
          <input id="id-password-confirm"
            name="password_confirm"
            type="password"
            value={this.props.password_confirm}
            maxLength="254"
            onChange={this.props.handlePasswordConfirmChange.bind(this)}
            required
          />
        </FieldWrapper>
        <FieldWrapper>
          <label htmlFor="id-email">Email:<FormRequiredField /></label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'email'}
          />
          <input id="id-email"
            name="email"
            type="email"
            value={this.props.email}
            onChange={this.props.handleEmailChange.bind(this)}
            required
          />
        </FieldWrapper>
      </form>
    )
  }
}
