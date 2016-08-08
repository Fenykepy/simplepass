import { createStructuredSelector } from 'reselect'


export const keychainSelector = createStructuredSelector({
  keychain: state => state.keychain,
})
