/* global config */
import { push } from 'connected-react-router';

import { SHOW_NOTIFICATION } from 'containers/App/constants';

function isActualResponse(response) {
  return response && typeof response === 'object' && response.status;
}

function getCombinedHttpStatus(response) {
  let status = response.status;
  const responseData = response.data;

  if (responseData && typeof responseData === 'object' && responseData.error === -1) {
    status = responseData.message.indexOf('Not authenticated') > -1 ? 401 : 500;
  }

  return status;
}

const loadingMiddleware = (store) => (next) => (action) => {
  let canReturnAction = true;
  if (action.type) {
    const isResponse = new RegExp('/RESPONSE', 'g');

    if (action.type.match(isResponse) && isActualResponse(action.response)) {
      const status = getCombinedHttpStatus(action.response);
      let globalMsg;
      let serverMsg = typeof (action.response.data) === 'string' ? action.response.data : null;
      canReturnAction = status === 200 || status === 201 || status === 204;

      if (action.response.data.error) {
        serverMsg = action.response.data.error.text || action.response.data.message || action.response.data.reason;
        canReturnAction = false;
      }

      if (action.response.error) {
        serverMsg = action.response.error.text || 'Something went wrong';
        canReturnAction = false;
      }

      // Check for error message in response
      if (status !== 200 && (action.response.data.message || action.response.data.text)) {
        serverMsg = action.response.data.message || action.response.data.text;
        canReturnAction = false;
      }

      if (status === 401) {
        globalMsg = 'Your session is not valid, please re login again. You will be redirected to login soon';
      } else if (status === 400) {
        globalMsg = serverMsg || `Some thing is not right with the request ${action.response.config.url.replace(config.apiGatewayUrl, '')}`;
      } else if (status === 403) {
        globalMsg = serverMsg || 'User doesn\'t have permission to perform this action';
      } else if (status === 502) {
        globalMsg = 'Gate way timeout/ Sever unavailble, Might be deployment going on, please try after some time ';
      } else if (!canReturnAction) {
        globalMsg = serverMsg || 'Some thing went wrong, please try again';
      }

      if (action.response.redirect) {
        store.dispatch(push(action.response.redirect));
      }

      if (canReturnAction) {
        action.response = action.response.data;
      } else {
        store.dispatch({
          type: SHOW_NOTIFICATION,
          data: {
            type: 'error',
            message: globalMsg,
          },
        });
      }
    }
  }

  return canReturnAction && next(action);
};

export default loadingMiddleware;
