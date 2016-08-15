import React, { Component, PropTypes } from 'react'

import FormFieldErrors from 'public/app/components/FormFieldErrors'

export default class CardEditionForm extends Component {

  render() {
    // console.log('CardEditionForm', this.props)
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
          <label htmlFor="id-title">Title:</label>
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
          <label htmlFor="id-owner">Owner:</label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'owner'}
          />
          <input
            id="id-owner"
            name="owner"
            type="text"
            value={this.props.owner}
            maxLength="254"
            onChange={this.props.handleOwnerChange}
            required
          />
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-number">Number:</label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'number'}
          />
          <input
            id="id-number"
            name="number"
            type="number"
            step="1"
            value={this.props.number}
            onChange={this.props.handleNumberChange}
            required
          />
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-expires">Expires at:</label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'expires'}
          />
          <input
            id="id-expires-month"
            name="expires-month"
            type="number"
            value={this.props.expires_month}
            onChange={this.props.handleExpiresMonthChange}
            required
          />
          <input
            id="id-expires-year"
            name="expires-year"
            type="number"
            value={this.props.expires_year}
            onChange={this.props.handleExpiresYearChange}
            required
          />
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-cryptogram">Cryptogram:</label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'cryptogram'}
          />
          <input
            id="id-cryptogram"
            name="cryptogram"
            type="number"
            step="1"
            value={this.props.cryptogram}
            onChange={this.props.handleCryptogramChange}
            required
          />
        </div>
        <div className="field-wrapper">
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
        </div>
      </form>
    )
  }
}

CardEditionForm.PropTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  owner: PropTypes.string,
  handleOwnerChange: PropTypes.func.isRequired,
  number: PropTypes.number,
  handleNumberChange: PropTypes.func.isRequired,
  expires_month: PropTypes.number,
  handleEpiresMonthChange: PropTypes.func.isRequired,
  expires_year: PropTypes.number,
  handleEpiresYearChange: PropTypes.func.isRequired,
  cryptogram: PropTypes.number,
  handleCryptogramChange: PropTypes.func.isRequired,
  description: PropTypes.string,
  handleDescriptionChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
}
