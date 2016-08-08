import { createStructuredSelector } from 'reselect'

import { userSelector } from '../user/selectors'

import { ejsonSelector } from '../ejson/selectors'

export const statusSelector = createStructuredSelector({
  status: state => state.status,
})

export const appSelector = createStructuredSelector({
  user: userSelector,
})

export const homeSelector = createStructuredSelector({
  user: userSelector,
  ejson: ejsonSelector,
})

