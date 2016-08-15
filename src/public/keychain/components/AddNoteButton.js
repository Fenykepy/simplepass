import React, { Component, PropTypes } from 'react'

import Modal from 'public/modal/components/Modal'
import NoteEdition from 'public/keychain/containers/NoteEdition'

export default class AddNoteButton extends Component {

  setModal() {
    let modal = (
      <Modal
        closeModal={this.context.closeModal}
        title="Add a new note"
      >
        <NoteEdition
          closeModal={this.context.closeModal}
          password={this.props.note}
          setModal={this.context.setModal}
        />
      </Modal>
    )

    this.context.setModal(modal)
  }

  getTitle() {
    if (this.props.note) {
      // we update existing note
      return "Edit note"
    }
    // we add a new note
    return "Add a new note"
  }


  render() {
    //console.log('AddEntryNote', this.props)
    return (
      <button
        className={this.props.className || "secondary"}
        onClick={this.setModal.bind(this)}
      >{this.props.children}</button>
    )
  }
}

AddNoteButton.contextTypes = {
  setModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

AddNoteButton.PropTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
}
