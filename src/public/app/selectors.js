import { createStructuredSelector } from 'reselect'

const stateSelector = state => state.state

export const appSelector = createStructuredSelector({
  state: stateSelector,
})

