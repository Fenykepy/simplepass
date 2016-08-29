import { createSelector, createStructuredSelector } from 'reselect'

import { userSelector } from 'public/user/selectors'

const nUsersSelector = state => state.admin.n_users

export const adminSelector = createStructuredSelector({
  n_users: nUsersSelector,
  user: userSelector,
})
