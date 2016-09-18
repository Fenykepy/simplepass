import React, { Component, PropTypes } from 'react'

import FormRequiredFields from 'public/form/form-required-fields/FormRequiredFields'
import FormRequiredField from 'public/form/form-required-field/FormRequiredField'
import FormFieldErrors from 'public/form/form-field-errors/FormFieldErrors'

export default class NoteEditionForm extends Component {

  render() {
    // console.log('NoteEditionForm', this.props)
    return (
      <form
        id={this.props.id}
        onSubmit={this.props.onSubmit}
      >
        <FormRequiredFields />
        <div className="field-wrapper">
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'non_field_errors'}
          />
        </div>
        <div className="field-wrapper">
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
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-note">Note:</label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'content'}
          />
          <textarea
            id="id-content"
            name="content"
            rows="13"
            value={this.props.content}
            onChange={this.props.handleContentChange}
          />
        </div>
      </form>
    )
  }
}

NoteEditionForm.PropTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  handleContentChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
}
