import { createStructuredSelector } from 'reselect'

import { userSelector } from '../user/selectors'

const stateSelector = state => state.state

export const appSelector = createStructuredSelector({
  user: userSelector,
  state: stateSelector,
})

export const homeSelector = createStructuredSelector({
  user: userSelector,
})

