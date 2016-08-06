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
    // if we got a string delta, we parse it with ms
    // and convert it in seconds
    let seconds = ms(delta) / 1000
    if (seconds === 'undefined') {
      return
    }
    return timestamp + seconds
  } else if (typeof(delta) === 'number') {
    // if we go a number delta, it should be seconds,
    // we add it to start timestamp
    return timestamp + delta
  } else return
}
