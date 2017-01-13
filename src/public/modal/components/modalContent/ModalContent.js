import React, { Component, PropTypes } from 'react'

export default class ModalContent extends Component {

  render() {

    return (
      <div
        id="modal-content"
      >
        {this.props.children}
      </div>
    )
  }
}
