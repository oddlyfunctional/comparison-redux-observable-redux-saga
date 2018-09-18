import { combineEpics } from 'redux-observable';
import { ofType } from 'redux-observable';
import { merge, from, of } from 'rxjs';
import { debounceTime, map, switchMap, catchError } from 'rxjs/operators';

import api from './api';
import {
  setLike,
  getLike,
  getTranslations,
  setTranslations,
} from './actions';

function fetchToggleLike(action$, state$) {
  return action$.pipe(
    ofType("TOGGLE_LIKE"),
    debounceTime(500),
    switchMap(action => {
      const previousLike = state$.value.like;
      const rollback = catchError(() => of(setLike(previousLike)));

      return merge(
        of(setLike(!previousLike)),
        from(api.toggleLike()).pipe(
          rollback,
          map(setLike),
          map(getLike),
        )
      );
    })
  );
}

function fetchGetLike(action$) {
  return action$.pipe(
    ofType("GET_LIKE"),
    switchMap(action =>
      from(api.getLike()).pipe(
        map(like => setLike(like))
      )
    )
  );
}

function fetchTranslations(action$) {
  return action$.pipe(
    ofType("GET_TRANSLATIONS"),
    switchMap(action =>
      from(api.getTranslations(action.locale)).pipe(
        map(translations => setTranslations(translations))
      )
    ),
  );
}

const epic = (action$, store) =>
  combineEpics(
    fetchToggleLike,
    fetchGetLike,
    fetchTranslations,
  )(action$, store).pipe(
    catchError((e, source) => {
      console.error(e, source);
      return source;
    })
  );

export default epic;
