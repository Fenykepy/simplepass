import React, { Component, PropTypes } from 'react'

export default class ModalFooter extends Component {

  render() {

    return (
      <footer
        id="modal-footer"
      >
        {this.props.children}
      </footer>
    )
  }
}
