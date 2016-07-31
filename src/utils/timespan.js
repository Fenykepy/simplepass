import ms from 'ms'

export default function timespan(delta, start) {
  /*
   * Return a timestamp (in seconds) from delta + start
   *
   * start: optionnal, starting timestamp in seconds,
   *  default to current date
   *
   * delta: delta to add in seconds or "ms" string:
   *  see https://github.com/rauchg/ms.js for info
   */
  var timestamp = start || Math.floor(Date.now() / 1000)

  if (typeof(delta) === 'string') {
    let milliseconds = ms(delta)
    if (milliseconds === 'undefined') {
      return
    }
  } else if (typeof(delta) === 'number') {
    return timestamp + time
  } else return
}
