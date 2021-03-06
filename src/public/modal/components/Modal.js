import React, { Component, PropTypes } from 'react'


import ModalHeader from 'public/modal/components/ModalHeader'

export default class Modal extends Component {

  closeModal(e) {
    if (this.props.modal_closable) {
      this.context.closeModal()
    }
  }

  render() {

    let modal_classes = []
    this.props.modal_max ? modal_classes.push("max") : ""
    this.props.modal_small ? modal_classes.push("small") : ""
    
    let overlay_classes = []
    this.props.modal_opaque ? overlay_classes.push("opaque") : ""
    this.props.modal_transparent ? overlay_classes.push("transparent") : ""
    
    return (
      <div id="modal-overlay"
        className={overlay_classes.join(' ')}
        onClick={this.closeModal.bind(this)}
      >
        <section
          id="modal"
          className={modal_classes.join(' ')}
          onClick={e => e.stopPropagation()}
        >
          <ModalHeader
            title={this.props.title}
            closable={this.props.modal_closable}
            closeModal={this.closeModal.bind(this)}
          />
          {this.props.children}
        </section>
      </div>
    )
  }
}

Modal.propTypes = {
  modal_closable: PropTypes.bool,
  modal_max: PropTypes.bool,
  modal_small: PropTypes.bool,
  modal_opaque: PropTypes.bool,
  modal_transparent: PropTypes.bool,
}

Modal.contextTypes = {
  closeModal: PropTypes.func.isRequired,
}
