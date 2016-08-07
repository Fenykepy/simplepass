import { createStructuredSelector } from 'reselect'

import { userSelector } from '../user/selectors'

import { ejsonSelector } from '../ejson/selectors'

const stateSelector = state => state.state

export const appSelector = createStructuredSelector({
  user: userSelector,
})

export const homeSelector = createStructuredSelector({
  user: userSelector,
  state: stateSelector,
  ejson: ejsonSelector,
})

