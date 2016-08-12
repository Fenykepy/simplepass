import { createSelector, createStructuredSelector } from 'reselect'
import { objectValues } from 'functionnal'

const basicKeychainSelector = state => state.keychain


export const keychainSelector = createSelector(
  basicKeychainSelector,
  (keychain) => {
    return {
      n_passwords: Object.keys(keychain.passwords).length,
      n_notes: Object.keys(keychain.notes).length,
      n_bank_cards: Object.keys(keychain.bank_cards).length,
      n_groups: Object.keys(keychain.groups).length,
    }
  }
)

export const passwordsSelector = createSelector(
  basicKeychainSelector,
  (keychain) => {
    return {
      passwords: sortEntries(filterEntries(objectValues(keychain.passwords), ''))
    }
  }
)

function filterEntries(entries, filter) {
  // if we have no filter or no entries return
  if (! filter || entries.length < 1) return entries
  // we build a new regex from filter
  let re = new RegExp(filter, 'i')
  // we filter entries titles against regex
  return entries.filter(item => re.test(item.title))
}

function sortEntries(entries) {
  return entries.sort((a, b) => {
    if (a.title > b.title)
      return 1
    if (a.title < b.title)
      return -1
    // a doit être égale à b
    return 0
  })
}
      
