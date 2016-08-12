import { createStructuredSelector } from 'reselect'

import {
  userSelector,
  authenticatedSelector,
} from 'public/user/selectors'

import { ejsonSelector } from 'public/ejson/selectors'

export const statusSelector = createStructuredSelector({
  status: state => state.status,
})

const lockedSelector = state => state.status.locked

export const appSelector = createStructuredSelector({
  user: userSelector,
})

export const homeSelector = createStructuredSelector({
  authenticated: authenticatedSelector,
  ejson: ejsonSelector,
  locked: lockedSelector,
})

