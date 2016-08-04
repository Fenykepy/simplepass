import { createStructuredSelector } from 'reselect'

import { userSelector } from '../user/selectors'

export const appSelector = createStructuredSelector({
  user: userSelector,
})

