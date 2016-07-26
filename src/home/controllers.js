import layout from '../layout'

function* home(next) {
  if ('GET' != this.method) return yield next;
  this.body = layout
}

export default home
