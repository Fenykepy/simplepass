import * as types from './actionsTypes'

import { syncKeychain } from 'public/app/actions'

/* keychain actions creators */
export function loadJSON(json) {
  // load json into state
  return function(dispatch) {
    let keychain = JSON.parse(json)
    dispatch(loadConfig(keychain.config || {}))
    dispatch(loadPasswords(keychain.passwords || {}))
    dispatch(loadNotes(keychain.notes || {}))
    dispatch(loadBankCards(keychain.bank_cards || {}))
    dispatch(loadGroups(keychain.groups || {}))
  }
}

/* filter actions creators */
export function setFilter(filter) {
  return {
    type: types.SET_FILTER,
    filter
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
  password.type = 'PASSWORD'
  password.id = Date.now()
  password.last_modified = password.id
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
  password.last_modified = Date.now()
  return dispatch => {
    dispatch({
      type: types.UPDATE_PASSWORD,
      password: password.id,
      data: password,
    })
    return dispatch(syncKeychain())
  }
}

export function deletePassword(password) {
  return dispatch => {
    dispatch({
      type: types.DELETE_PASSWORD,
      password: password,
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
  note.id = Date.now()
  note.type = 'NOTE'
  note.last_modified = note.id
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
  note.type = 'NOTE'
  note.last_modified = Date.now()
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
      note: note,
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
  bank_card.type = 'BANK_CARD'
  bank_card.id = Date.now()
  bank_card.last_modified = bank_card.id
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
  bank_card.type = 'BANK_CARD'
  bank_card.last_modified = Date.now()
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
      bank_card: bank_card,
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







