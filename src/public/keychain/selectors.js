import { createSelector, createStructuredSelector } from 'reselect'
import {
  objectValues,
  sortByProperty,
} from 'functionnal'

// default entries list order by
const SORT_ENTRIES_BY = 'title'

const basicKeychainSelector = state => state.keychain
const filterSelector = state => state.keychain.filter


export const keychainSelector = createSelector(
  basicKeychainSelector,
  filterSelector,
  (keychain, filter) => {
    return {
      filter: filter,
      n_passwords: Object.keys(keychain.passwords).length,
      n_notes: Object.keys(keychain.notes).length,
      n_bank_cards: Object.keys(keychain.bank_cards).length,
      n_groups: Object.keys(keychain.groups).length,
    }
  }
)

export const passwordsSelector = createSelector(
  basicKeychainSelector,
  filterSelector,
  (keychain, filter) => {
    return {
      passwords: entriesToList(keychain.passwords, filter)
    }
  }
)

export const notesSelector = createSelector(
  basicKeychainSelector,
  filterSelector,
  (keychain, filter) => {
    return {
      notes: entriesToList(keychain.notes, filter)
    }
  }
)

function entriesToList(entries, filter) {
  let all_entries = objectValues(entries)
  let filtered_entries = filterEntries(all_entries, filter)
  return sortByProperty(filtered_entries, SORT_ENTRIES_BY)
}

function filterEntries(entries, filter) {
  // if we have no filter or no entries return
  if (! filter || entries.length < 1) return entries
  // we build a new regex from filter
  let re = new RegExp(filter, 'i')
  // we filter entries titles against regex
  return entries.filter(item => re.test(item.title))
}

