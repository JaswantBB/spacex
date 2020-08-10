/* global config */
import { call, takeLatest, put } from 'redux-saga/effects';

import { request } from 'utils/request';

import { FETCH_SPACEX_LIST, SPACEX_LIST_FETCHED } from './constants';

export function* fetchSpacexList({ payload }) {
  const httpConfig = {
    url: `${config.apiGatewayUrl}/v3/launches?limit=${payload.limit}`,
    method: 'get',
  };

  const response = yield call(request, httpConfig);
  yield put({ type: SPACEX_LIST_FETCHED, response });
}

export default function* appData() {
  yield takeLatest(FETCH_SPACEX_LIST, fetchSpacexList);
}
