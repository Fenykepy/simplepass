import React, { Component, PropTypes } from 'react'

export default class ModalHeader extends Component {

  getCloseButton() {
    if (this.props.closable) {
      return (
        <button
          className="modal-close"
          onClick={this.props.closeModal}
        >×</button>
      )
    }
    return null
  }


  render() {

    return (
      <header
        id="modal-header"
      >
        <h1>{this.props.title}</h1>
        {this.getCloseButton()}
      </header>
    )
  }
}
