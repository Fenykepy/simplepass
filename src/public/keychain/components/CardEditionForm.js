import React, { Component, PropTypes } from 'react'

import FormRequiredFields from 'public/app/components/FormRequiredFields'
import FormRequiredField from 'public/app/components/FormRequiredField'
import FormFieldErrors from 'public/app/components/FormFieldErrors'

  const MONTHS = ['--']
  const YEARS = ['--']

  // we populate months
  for (let i=0, l=12; i < l; i++) {
    let month = (i + 1).toString()
    MONTHS.push(month.length == 1 ?
                "0" + month :
                month
    )
  }
  // we populate years
  let year = new Date().getFullYear()
  for (let i=0, l=5; i < l; i++) {
    YEARS.push(year + i)
  }


export default class CardEditionForm extends Component {

  render() {
    // console.log('CardEditionForm', this.props)
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
          <label htmlFor="id-owner">Owner:<FormRequiredField /></label>
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
          <label htmlFor="id-number">Number:<FormRequiredField /></label>
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
          <label htmlFor="id-expires">Expires at:<FormRequiredField /></label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'expires'}
          />
          <div className="group-field-inline">
            <select
              id="id-expires-month"
              name="expires-month"
              value={this.props.expires_month}
              onChange={this.props.handleExpiresMonthChange}
              required
            >
              {MONTHS.map(month =>
                  <option
                    key={month}
                    value={month}
                  >{month}</option>
              )}
            </select>
            <div
              className="input-separator"
            >/</div>
            <select
              id="id-expires-year"
              name="expires-year"
              value={this.props.expires_year}
              onChange={this.props.handleExpiresYearChange}
              required
            >
              {YEARS.map(year =>
                  <option
                    key={year}
                    value={year}
                  >{year}</option>
              )}
            </select>
          </div>
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-cryptogram">Cryptogram:<FormRequiredField /></label>
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
