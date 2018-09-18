import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reducers from './reducers';
import { getLike, getTranslations, toggleLike } from './actions';

import { createEpicMiddleware } from 'redux-observable';
import epic from './epic';

import createSagaMiddleware from 'redux-saga';
import saga from './saga';

const setupStore = (middleware) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    reducers,
    composeEnhancers(applyMiddleware(middleware)),
  );
}

const bindView = (store) => {
  const likeButton = document.querySelector("#like");
  const localeSelect = document.querySelector("#locale");

  store.subscribe(() => {
    const { like, translations } = store.getState();

    likeButton.textContent = translations[like ? "unlike" : "like"];
  });

  likeButton.addEventListener('click', () => store.dispatch(toggleLike()));
  localeSelect.addEventListener('change', () => store.dispatch(getTranslations(localeSelect.value)));

  store.dispatch(getLike());
  store.dispatch(getTranslations(localeSelect.value));
}

const mode = window.location.search;

switch(mode) {
  case "?mode=epic": {
    const epicMiddleware = createEpicMiddleware();
    const store = setupStore(epicMiddleware);
    epicMiddleware.run(epic);
    bindView(store);
    break;
  }
  case "?mode=saga": {
    const sagaMiddleware = createSagaMiddleware();
    const store = setupStore(sagaMiddleware);
    sagaMiddleware.run(saga)
    bindView(store);
    break;
  }
  default: throw `Unrecognized mode: ${mode}`;
}
