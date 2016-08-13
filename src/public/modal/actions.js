import * as types from 'public/modal/actionsTypes'

// actions creators

export function closeModal() {
  return {
    type: types.CLOSE_MODAL
  }
}

export function setModal(modal) {
  return {
    type: types.SET_MODAL,
    modal
  }
}
