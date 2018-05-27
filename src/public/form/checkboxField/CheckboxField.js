import React, { Component, PropTypes } from 'react'

import styles from './checkboxField.less'

export default class CheckboxField extends Component {

  render() {
    let id = "id-" + this.props.name
    return (
      <div className={styles.checkbox}>
        <label htmlFor={id}><input
            id={id}
            type="checkbox"
            name={this.props.name}
            checked={this.props.checked}
            onChange={this.props.onChange}
        />{this.props.label}</label>
      </div>
    )
  }
}

CheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}
