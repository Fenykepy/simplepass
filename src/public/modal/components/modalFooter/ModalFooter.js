import React, { Component, PropTypes } from 'react'

export default class ModalFooter extends Component {

  render() {

    return (
      <footer
        id="modal-footer"
        className={this.props.className || ""}
      >
        {this.props.children}
      </footer>
    )
  }
}

ModalFooter.propTypes = {
  className: PropTypes.string,
}
