import fetch from 'isomorphic-fetch'

/*
 * A wrapper arround fetch.
 * to set default headers
 * and some helper methods.
 */

class Fetch {
  
  constructor() {
    this.default_headers = {
      'Accept': 'application/json'
    }
  }
  
  setHeaders(headers={}) {
    headers = Object.assign(
      this.default_headers,
      headers
    )
    return new Headers(headers)
  }

  checkStatus(response) {
    // TODO catch 401 and redirect to login
    /*if (response.status == 401) {
      console.log(401)
      }*/
    if (request.status >= 200 && response.status < 300) {
      return response
    } else {
      let error = new Error(response.status)
      error.response = response
      throw error
    }
  }

  get(url, headers={}) {
    return fetch(url,
      {
        method: "GET",
        headers: this.setDefaultHeaders(headers)
      })
      .then(this.checkStatus)
      .then(response => response.json())
  }

  post(url, headers={}, body) {
    return fetch(url,
      {
        method: "POST",
        headers: this.setDefaultHeaders(headers)
        body: body
      })
      .then(this.checkStatus)
      .then(response => response.json())
  }

  put(url, headers={}, body) {
    return fetch(url,
      {
        method: "PUT",
        headers: this.setDefaultHeaders(headers)
        body: body
      })
      .then(this.checkStatus)
      .then(response => response.json())
  }

  patch(url, headers={}, body) {
    return fetch(url,
      {
        method: "PATCH",
        headers: this.setDefaultHeaders(headers)
        body: body
      })
      .then(this.checkStatus)
      .then(response => response.json())
  }

  delete(url, headers={}) {
    return fetch(url,
      {
        method: "DELETE",
        headers: this.setDefaultHeaders(headers)
      })
      .then(this.checkStatus)
  }
}
