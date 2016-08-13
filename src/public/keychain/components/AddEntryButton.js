import React, { Component } from 'react'

import Modal from 'public/modal/components/Modal'
import ModalFooter from 'public/modal/components/ModalFooter'

export default class AddEntryButton extends Component {

  setModal() {
    let modal = (
      <Modal
        closeModal={this.props.closeModal}
        title="Add a new password"
      >
        <div id="modal-content">
          Mon beau contenu
        </div>
        <ModalFooter>
          <button
            onClick={this.props.closeModal}
          >Cancel</button>
          <button
            className="primary"
          >Add</button>
        </ModalFooter>
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
