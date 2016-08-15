import React, { Component, PropTypes } from 'react'

import Modal from 'public/modal/components/Modal'
import ModalContent from 'public/modal/components/ModalContent'
import AddPasswordButton from 'public/keychain/components/AddPasswordButton'
import AddNoteButton from 'public/keychain/components/AddNoteButton'
import AddCardButton from 'public/keychain/components/AddCardButton'

export default class AddEntryButton extends Component {

  setModal() {
    let modal = (
      <Modal
        modal_closable={true}
        title="Add a new"
      >
        <ModalContent>
          <AddPasswordButton>Password</AddPasswordButton>
          <AddNoteButton>Note</AddNoteButton>
          <AddCardButton>Bank card</AddCardButton>
        </ModalContent>
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
}

AddEntryButton.propTypes = {
  className: PropTypes.string,
}
