import React, { Component, PropTypes } from 'react'


import FormFieldErrors from '../../app/components/FormFieldErrors'

export default class RegisterForm extends Component {

  render() {
    //console.log('RegisterForm', this.props)
    return (
      <form
        id={this.props.id}
        onSubmit={this.props.onSubmit}
      >
        <div className="field-wrapper">
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'non_field_errors'}
          />
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-username">Username:</label>
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
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-password">Password:</label>
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
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-password-confirm">Password confirmation:</label>
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
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-email">Email:</label>
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
        </div>
      </form>
    )
  }
}
