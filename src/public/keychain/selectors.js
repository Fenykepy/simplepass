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
      passwords: keychain.passwords
    }
  }
)

function mapEntriesToArray(entries, filter) {
  return objectValues(entries)
}
      
