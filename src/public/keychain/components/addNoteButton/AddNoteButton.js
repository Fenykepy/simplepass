import React, { Component, PropTypes } from 'react'

import Modal from 'public/modal/components/modal/Modal'
import NoteEdition from 'public/keychain/containers/NoteEdition'

export default class AddNoteButton extends Component {

  setModal() {
    let modal = (
      <Modal
        modal_closable={true}
        title={this.getTitle()}
      >
        <NoteEdition
          note={this.props.note}
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
    //console.log('AddNoteButton', this.props)
    return (
      <button
        className={this.props.className || ""}
        onClick={this.setModal.bind(this)}
      >{this.props.children}</button>
    )
  }
}

AddNoteButton.contextTypes = {
  setModal: PropTypes.func.isRequired,
}

AddNoteButton.PropTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
}
