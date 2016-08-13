import React, { Component } from 'react'

import Modal from 'public/app/components/Modal'

export default class AddEntryButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modal: false
    }
  }
  
  toogleModal(e) {
    e.stopPropagation()
    this.setState({modal: ! this.state.modal})
  }

  getModal() {
    if (! this.state.modal) return null
    return (
      <Modal>
        <div>Le contenu de ma modal</div>
      </Modal>
    )
  }

  render() {
    console.log('AddEntryButton', this.props)
    return (
      <button
        className="secondary"
        onClick={this.toogleModal.bind(this)}
      >Add{this.getModal()}</button>
    )
  }
}
