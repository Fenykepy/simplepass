import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import {
  addNote,
  updateNote,
  deleteNote,
} from 'public/keychain/actions'


import Modal from 'public/modal/components/Modal'
import ModalContent from 'public/modal/components/ModalContent'
import ModalFooter from 'public/modal/components/ModalFooter'
import NoteEditionForm from 'public/keychain/components/NoteEditionForm'
import DeleteConfirm from 'public/keychain/components/DeleteConfirm'

const NOTE_FORM = "note-form"

class NoteEdition extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      content: '',
      errors: {},
    }
  }

  componentWillMount() {
    // we update existing note
    if (this.props.note) {
      let note = this.props.note
      // populate state with existing note
      this.setState({
        title: note.title || '',
        content: note.content || '',
      })
    }
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value})
  }

  handleContentChange(e) {
    this.setState({content: e.target.value})
  }


  handleSubmit(e) {
    e.preventDefault()
    let errors = this.validateForm()
    // we got errors
    if (Object.keys(errors).length > 0) {
      return this.setState({errors: errors})
    }
    // form is clean, submit it
    // we remove errors from state
    let note = {...this.state}
    delete note.errors
    if (this.props.note) {
      // we update an existing note
      note.id = this.props.note.id
      this.props.dispatch(updateNote(note))
    } else {
      // we create a new note
      this.props.dispatch(addNote(note))
    }
    // we close modal
    this.context.closeModal()
  }

  validateForm() {
    // title is required
    let errors = {}
    if (! this.state.title) {
      errors.title = [
        'This field is required.'
      ]
    }
    return errors
  }

  getDeleteButton() {
    if (! this.props.note) return null
    // we update existing note, show delete button
    return (
      <div className="delete">
        <button
          onClick={this.confirmDeleteNote.bind(this)}
        >Delete</button>
      </div>
    )
  }

  confirmDeleteNote() {
    let modal = (
      <Modal
        modal_closable={true}
        title="Delete a note"
      >
        <DeleteConfirm
          type="note"
          title={this.props.note.title}
          delete={this.deleteNote.bind(this)}
        />
      </Modal>
    )

    this.context.setModal(modal)
  }

  deleteNote() {
    this.props.dispatch(deleteNote(
      this.props.note.id
    )) 
    // we close modal
    this.context.closeModal()
  }

  render() {
    // injected by connect call
    const {
      dispatch,
    } = this.props

    //console.log('NoteEdition', this.props)
    
    let value = this.props.note ?
      'Update note' :
        'Add note'

    return (
      <div>
        <ModalContent>
          {this.getDeleteButton()}
          <NoteEditionForm
            id={NOTE_FORM}
            onSubmit={this.handleSubmit.bind(this)}
            handleTitleChange={this.handleTitleChange.bind(this)}
            handleContentChange={this.handleContentChange.bind(this)}
            title={this.state.title}
            content={this.state.content}
            errors={this.state.errors}
          />
        </ModalContent>
        <ModalFooter>
          <button
            onClick={this.context.closeModal}
          >Cancel</button>
          <input
            type="submit"
            className="primary"
            form={NOTE_FORM}
            value={value}
          />
        </ModalFooter>
      </div>
    )
  }
}

NoteEdition.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
}

NoteEdition.contextTypes = {
  setModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}
// wrap the component to inject dispatch and state into it
export default connect ()(NoteEdition)
