import React, { Component, PropTypes } from 'react'

import FormFieldErrors from 'public/form/formFieldErrors/FormFieldErrors'
import FormRequiredFields from 'public/form/formRequiredFields/FormRequiredFields'
import FormRequiredField from 'public/form/formRequiredField/FormRequiredField'
import FieldWrapper from 'public/form/fieldWrapper/FieldWrapper'
import PasswordField from '../passwordField/PasswordField'

export default class PasswordEditionForm extends Component {

  render() {
    // console.log('PasswordEditionForm', this.props)
    return (
      <form
        id={this.props.id}
        onSubmit={this.props.onSubmit}
        autoComplete="off"
      >
        <FormRequiredFields />
        <FieldWrapper>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'non_field_errors'}
          />
        </FieldWrapper>
        <FieldWrapper>
          <label htmlFor="id-title">Title:<FormRequiredField /></label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'title'}
          />
          <input
            id="id-title"
            name="title"
            type="text"
            value={this.props.title}
            maxLength="254"
            onChange={this.props.handleTitleChange}
            required
          />
        </FieldWrapper>
        <FieldWrapper>
          <label htmlFor="id-username">Username:</label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'username'}
          />
          <input
            id="id-username"
            name="username"
            type="text"
            value={this.props.username}
            onChange={this.props.handleUsernameChange}
          />
        </FieldWrapper>
        <FieldWrapper>
          <label htmlFor="id-email">Email:</label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'email'}
          />
          <input
            id="id-email"
            name="email"
            type="email"
            value={this.props.email}
            onChange={this.props.handleEmailChange}
          />
        </FieldWrapper>
        <FieldWrapper>
          <label htmlFor="id-password">Password:</label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'password'}
          />
          <PasswordField
            id="id-password"
            name="password"
            value={this.props.password}
            onChange={this.props.handlePasswordChange}
          />
        </FieldWrapper>
        <FieldWrapper>
          <label htmlFor="id-url">Related url:</label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'url'}
          />
          <input
            id="id-url"
            name="url"
            type="url"
            value={this.props.url}
            onChange={this.props.handleUrlChange}
          />
        </FieldWrapper>
        <FieldWrapper>
          <label htmlFor="id-description">Description:</label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'description'}
          />
          <textarea
            id="id-description"
            name="description"
            rows="5"
            value={this.props.description}
            onChange={this.props.handleDescriptionChange}
          />
        </FieldWrapper>
      </form>
    )
  }
}

PasswordEditionForm.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
}
