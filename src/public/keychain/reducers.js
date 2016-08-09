import { combineReducers } from 'redux'

import {
  LOAD_CONFIG,
  SET_CONFIG_TIMEOUT,
  SET_CONFIG_USER,
  SET_CONFIG_EMAIL,
  LOAD_PASSWORDS,
  ADD_PASSWORD,
  UPDATE_PASSWORD,
  DELETE_PASSWORD,
  LOAD_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  LOAD_BANK_CARDS,
  ADD_BANK_CARD,
  UPDATE_BANK_CARD,
  DELETE_BANK_CARD,
  LOAD_GROUPS,
  ADD_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
} from './actionsTypes'

import {
  LOCK_KEYCHAIN
} from '../app/actionsTypes'

import {
  REQUEST_LOGOUT
} from '../user/actionsTypes'



const default_config = { timeout: 180 }

function config(state=default_config, action) {
  switch (action.type) {
    case LOCK_KEYCHAIN:
      // we hide timeout as confidential data
      let new_state = {...state}
      delete new_state.timeout
      return new_state
    case LOAD_CONFIG:
      return action.config
    case SET_CONFIG_TIMEOUT:
      return {...state,
        timeout: action.timeout
      }
    case SET_CONFIG_USER:
      return {...state,
        username: action.username
      }
    case SET_CONFIG_EMAIL:
      return {...state,
        email: action.email
      }
    case REQUEST_LOGOUT:
      return default_config
    default:
      return state
  }
}

function passwords(state={}, action) {
  switch (action.type) {
    case LOCK_KEYCHAIN:
      return {}
    case LOAD_PASSWORDS:
      return action.passwords
    case ADD_PASSWORD:
      return {...state,
        [action.password]: action.data
      }
    case UPDATE_PASSWORD:
      return {...state,
        [action.password]: action.data
      }
    case DELETE_PASSWORD:
      let new_state = {...state}
      delete new_state[action.password]
      return new_state
    default:
      return state
  }
}

function notes(state={}, action) {
  switch (action.type) {
    case LOCK_KEYCHAIN:
      return {}
    case LOAD_NOTES:
      return action.notes
    case ADD_NOTE:
      return {...state,
        [action.note]: action.data
      }
    case UPDATE_NOTE:
      return {...state,
        [action.note]: action.data
      }
    case DELETE_NOTE:
      let new_state = {...state}
      delete new_state[action.note]
      return new_state
    default:
      return state
  }
}

function bank_cards(state={}, action) {
  switch (action.type) {
    case LOCK_KEYCHAIN:
      return {}
    case LOAD_BANK_CARDS:
      return action.bank_cards
    case ADD_BANK_CARD:
      return {...state,
        [action.bank_card]: action.data
      }
    case UPDATE_BANK_CARD:
      return {...state,
        [action.bank_card]: action.data
      }
    case DELETE_BANK_CARD:
      let new_state = {...state}
      delete new_state[action.bank_card]
      return new_state
    default:
      return state
  }
}

function groups(state={}, action) {
  switch (action.type) {
    case LOCK_KEYCHAIN:
      return {}
    case LOAD_GROUPS:
      return action.groups
    case ADD_GROUP:
      return {...state,
        [action.group]: action.data
      }
    case UPDATE_GROUP:
      return {...state,
        [action.group]: action.data
      }
    case DELETE_GROUP:
      let new_state = {...state}
      delete new_state[action.group]
      return new_state
    default:
      return state
  }
}



const keychain = combineReducers({
  config,
  passwords,
  notes,
  bank_cards,
  groups,
})

export default keychain
