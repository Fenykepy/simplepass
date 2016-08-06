import { createStructuredSelector } from 'reselect'

export const userSelector = state => state.user

export const loginSelector = createStructuredSelector({
  user: userSelector,
})

export const registerSelector = loginSelector
