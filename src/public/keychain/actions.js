import * as types from './actionsTypes'

import { syncKeychain } from '../app/actions'

/* keychain actions creators */
export function lockKeychain() {
  return {
    type: types.LOCK_KEYCHAIN
  }
}

export function loadJSON(json) {
  // load json into state
  return function(dispatch) {
    dispatch(loadConfig(json.config || {}))
    dispatch(loadPasswords(json.passwords || {}))
    dispatch(loadNotes(json.notes || {}))
    dispatch(loadBankCards(json.bank_cards || {}))
    dispatch(loadGroups(json.groups || {}))
  }
}


/* config actions creators */
export function loadConfig(config) {
  return {
    type: types.LOAD_CONFIG,
    config
  }
}

export function setConfigTimeout(timeout) {
  return dispatch => {
    dispatch({
      type: types.SET_CONFIG_TIMEOUT,
      timeout
    })
    return dispatch(syncKeychain())
  }
}

export function setConfigUser(username) {
  return dispatch => {
    dispatch({
      type: types.SET_CONFIG_USERNAME,
      username
    })
    return dispatch(syncKeychain())
  }
}

export function setConfigEmail(email) {
  return dispatch => {
    dispatch({
      type: types.SET_CONFIG_EMAIL,
      email
    })
    return dispatch(syncKeychain())
  }
}


/* passwords actions creators */
function loadPasswords(passwords) {
  return {
    type: types.LOAD_PASSWORDS,
    passwords
  }
}

export function addPassword(password) {
  return dispatch => {
    dispatch({
      type: types.ADD_PASSWORD,
      password: password.id,
      data: password,
    })
    return dispatch(syncKeychain())
  }
}

export function updatePassword(password) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_PASSWORD,
      paddword: password.id,
      data: password,
    })
    return dispatch(syncKeychain())
  }
}

export function deletePassword(password) {
  return dispatch => {
    dispatch({
      type: types.DELETE_PASSWORD,
      password: password.id,
    })
    return dispatch(syncKeychain())
  }
}


/* notes actions creators */
function loadNotes(notes) {
  return {
    type: types.LOAD_NOTES,
    notes
  }
}

export function addNote(note) {
  return dispatch => {
    dispatch({
      type: types.ADD_NOTE,
      note: note.id,
      data: note,
    })
    return dispatch(syncKeychain())
  }
}

export function updateNote(note) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_NOTE,
      note: note.id,
      data: note,
    })
    return dispatch(syncKeychain())
  }
}

export function deleteNote(note) {
  return dispatch => {
    dispatch({
      type: types.DELETE_NOTE,
      note: note.id,
    })
    return dispatch(syncKeychain())
  }
}




/* bank_cards actions creators */
function loadBankCards(bank_cards) {
  return {
    type: types.LOAD_BANK_CARDS,
    bank_cards
  }
}

export function addBankCard(bank_card) {
  return dispatch => {
    dispatch({
      type: types.ADD_BANK_CARD,
      bank_card: bank_card.id,
      data: bank_card,
    })
    return dispatch(syncKeychain())
  }
}

export function updateBankCard(bank_card) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_BANK_CARD,
      bank_card: bank_card.id,
      data: bank_card,
    })
    return dispatch(syncKeychain())
  }
}

export function deleteBankCard(bank_card) {
  return dispatch => {
    dispatch({
      type: types.DELETE_BANK_CARD,
      bank_card: bank_card.id,
    })
    return dispatch(syncKeychain())
  }
}




/* groups actions creators */
function loadGroups(groups) {
  return {
    type: types.LOAD_GROUPS,
    groups
  }
}

export function addGroup(group) {
  return dispatch => {
    dispatch({
      type: types.ADD_GROUP,
      group: group.id,
      data: group,
    })
    return dispatch(syncKeychain())
  }
}

export function updateGroup(group) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_GROUP,
      group: group.id,
      data: group,
    })
    return dispatch(syncKeychain())
  }
}

export function deleteGroup(group) {
  return dispatch => {
    dispatch({
      type: types.DELETE_GROUP,
      group: group.id,
    })
    return dispatch(syncKeychain())
  }
}







