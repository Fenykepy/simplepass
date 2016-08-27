import React, { Component, PropTypes } from 'react'

export default class PasswordField extends Component {

  constructor(props) {
    super(props)

    this.state = {
      hidden: true
    }
  }

  toogleVisibility() {
    this.setState({hidden: ! this.state.hidden})
  }

  render() {
    return (
      <div className="group-field-inline adjoined-inputs">
        <input
          id={this.props.id}
          name={this.props.name}
          type={this.state.hidden ? "password" : "text"}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <button
          type="button"
          className={this.state.hidden ? 'eye-hidden' : 'eye-visible'}
          title="Toogle content visibility"
          onClick={this.toogleVisibility.bind(this)}
        >
          <span className="accessibility">Toogle visibility</span>
        </button>
      </div>
    )
  }
}

PasswordField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
