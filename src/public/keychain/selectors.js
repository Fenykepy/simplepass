import { createSelector, createStructuredSelector } from 'reselect'

const basicKeychainSelector = state => state.keychain


export const keychainSelector = createSelector(
  basicKeychainSelector,
  (keychain) => {
    return {
      keychain: {
        ...keychain,
        n_passwords: Object.keys(keychain.passwords).length,
        n_notes: Object.keys(keychain.notes).length,
        n_bank_cards: Object.keys(keychain.bank_cards).length,
        n_groups: Object.keys(keychain.groups).length,
      }
    }
  }
)
