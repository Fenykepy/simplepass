import React, { Component } from 'react'

import Modal from 'public/modal/components/Modal'
import PasswordEdition from 'public/keychain/containers/PasswordEdition'

export default class AddEntryButton extends Component {

  setModal() {
    let modal = (
      <Modal
        closeModal={this.props.closeModal}
        title="Add a new password"
      >
        <PasswordEdition
          closeModal={this.props.closeModal}
        />
      </Modal>
    )

    this.props.setModal(modal)
  }

  render() {
    console.log('AddEntryButton', this.props)
    return (
      <button
        className="secondary"
        onClick={this.setModal.bind(this)}
      >Add</button>
    )
  }
}
