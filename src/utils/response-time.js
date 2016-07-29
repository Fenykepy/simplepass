
export default function * responseTime(next) {
  /*
   * A simple middleware to set X response time header
   */

  let start = new Date;
  yield next
  let ms = new Date - start
  this.set('X-Response-Time', ms + 'ms')
}
