import React, { Component, PropTypes } from 'react'

import ModalContent from 'public/modal/components/ModalContent'
import ModalFooter from 'public/modal/components/ModalFooter'


export default class DeleteConfirm extends Component {

  render() {
    return (
      <div>
        <ModalContent>
          <h6>Are you sure you want to delete {this.props.type} "{this.props.title}" ?</h6>
          <p><em>(this operation is irreversible)</em></p>
        </ModalContent>
        <ModalFooter>
          <button
            onClick={this.context.closeModal}
          >Cancel</button>
          <button
            className="primary"
            onClick={this.props.delete}
          >Delete</button>
        </ModalFooter>
      </div>
    )
  }
}

DeleteConfirm.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  delete: PropTypes.func.isRequired, 
}

DeleteConfirm.contextTypes = {
  closeModal: PropTypes.func.isRequired,
}

