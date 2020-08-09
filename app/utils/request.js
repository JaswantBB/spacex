/* global config */
function notFoundResponse() {
  return {
    status: 404,
    data: false,
  };
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function request(httpOptions) {
  httpOptions.headers = httpOptions.headers || {};

  if (httpOptions.url.indexOf(config.apiGatewayUrl) > -1) {
    if (httpOptions.method === 'post') {
      httpOptions.data = httpOptions.data || {};
    }
  }

  return fetch(httpOptions.url, {
    ...httpOptions,
    body: httpOptions.disableStringify ? httpOptions.data : JSON.stringify(httpOptions.data),
  }).then((response) => (response.json().then((data) => ({ status: response.status, data }))
    .catch((error) => {
      if (response.status === 200 || response.status === 204 || response.status === 201) {
        return { status: response.status, data: true };
      }
      return error.response || notFoundResponse();
    })
  )).catch((error) => (error.response || notFoundResponse()));
}
