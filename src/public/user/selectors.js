import { createStructuredSelector } from 'reselect'

export const userSelector = state => state.user

export const userDataSelector = state => state.user.user

export const loginSelector = createStructuredSelector({
  user: userSelector,
})

export const registerSelector = loginSelector

export const userMenuSelector = createStructuredSelector({
  user: userDataSelector
})
