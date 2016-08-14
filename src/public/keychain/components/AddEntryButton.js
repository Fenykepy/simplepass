import React, { Component, PropTypes } from 'react'

import Modal from 'public/modal/components/Modal'
import PasswordEdition from 'public/keychain/containers/PasswordEdition'

export default class AddEntryButton extends Component {

  setModal() {
    let modal = (
      <Modal
        closeModal={this.context.closeModal}
        title="Add a new password"
      >
        <PasswordEdition
          closeModal={this.context.closeModal}
          password={this.props.password}
        />
      </Modal>
    )

    this.context.setModal(modal)
  }

  render() {
    //console.log('AddEntryButton', this.props)
    return (
      <button
        className={this.props.className || "secondary"}
        onClick={this.setModal.bind(this)}
      >{this.props.children}</button>
    )
  }
}

AddEntryButton.contextTypes = {
  setModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}
