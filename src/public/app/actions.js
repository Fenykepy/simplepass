import * as types from './actionsTypes'

// actions creators

export function setState(state) {
  return {
    type: types.SET_STATE,
    state
  }
}
