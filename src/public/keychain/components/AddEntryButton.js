import React, { Component, PropTypes } from 'react'

import Modal from 'public/modal/components/Modal'
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
        <footer
          className="adjoined-buttons-wrapper"
        >
          <AddPasswordButton>Password</AddPasswordButton>
          <AddNoteButton>Note</AddNoteButton>
          <AddCardButton>Bank card</AddCardButton>
        </footer>
      </Modal>
    )

    this.context.setModal(modal)
  }

  render() {
    //console.log('AddEntryButton', this.props)
    return (
      <button
        className={this.props.className || "secondary shy"}
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
