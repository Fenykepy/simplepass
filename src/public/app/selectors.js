import { createStructuredSelector } from 'reselect'

import { userSelector } from '../user/selectors'

const stateSelector = state => state.state

export const appSelector = createStructuredSelector({
  user: userSelector,
})

export const homeSelector = createStructuredSelector({
  user: userSelector,
  state: stateSelector,
})

