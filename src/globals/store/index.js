import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import allReducers from './reducers/index.js';
import {loadLiterals} from './reducers/literals.js';
import {loadLang} from '../../translation/i18n.js';

let composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
let middlewares = [ReduxThunk];
const middleware = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(allReducers(), {}, middleware);
const lang = loadLang();
lang.then((res) => {
  store.dispatch(loadLiterals(res));
});

export default store;
