/* global config */
import { call, takeLatest, put } from 'redux-saga/effects';

import { request } from 'utils/request';

import { FETCH_SPACEX_LIST, SPACEX_LIST_FETCHED } from './constants';

export function* fetchSpacexList({ payload, callback }) {
  let urlEndpoint = `${config.apiGatewayUrl}/v3/launches?limit=${payload.limit || 50}`;
  if (payload.launch_success) {
    urlEndpoint = `${urlEndpoint}&launch_success=${payload.launch_success}`;
  }
  if (payload.land_success) {
    urlEndpoint = `${urlEndpoint}&land_success=${payload.land_success}`;
  }
  if (payload.launch_year) {
    urlEndpoint = `${urlEndpoint}&launch_year=${payload.launch_year}`;
  }
  const httpConfig = {
    url: urlEndpoint,
    method: 'get',
  };

  const response = yield call(request, httpConfig);

  if (callback) {
    callback();
  }
  yield put({ type: SPACEX_LIST_FETCHED, response });
}

export default function* appData() {
  yield takeLatest(FETCH_SPACEX_LIST, fetchSpacexList);
}
