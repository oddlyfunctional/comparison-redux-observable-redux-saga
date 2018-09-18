import 'regenerator-runtime/runtime';
import createSagaMiddleware from 'redux-saga';
import { select, all, call, put, takeLatest } from 'redux-saga/effects';

import api from './api';
import {
  toggleLike,
  setLike,
  getLike,
  getTranslations,
  setTranslations,
} from './actions';

const delay = (timeout = Math.random() * 2000) =>
  new Promise((res) => setTimeout(res, timeout));

function* fetchToggleLike(action) {
  const previousLike = yield select(state => state.like);
  yield put(setLike(!previousLike));

  try {
    yield delay(500);
    const like = yield call(api.toggleLike);
    yield put(setLike(like));
    yield put(getLike());
  } catch(e) {
    yield put(setLike(previousLike));
  }
}

function* fetchGetLike() {
  const like = yield call(api.getLike);
  yield put(setLike(like));
}

function* fetchTranslations(action) {
  const translations = yield call(api.getTranslations, action.locale);
  yield put(setTranslations(translations));
}

function* saga() {
  yield all([
    takeLatest("TOGGLE_LIKE", fetchToggleLike),
    takeLatest("GET_LIKE", fetchGetLike),
    takeLatest("GET_TRANSLATIONS", fetchTranslations),
  ]);
}

export default saga;
