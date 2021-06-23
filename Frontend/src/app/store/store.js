import { applyMiddleware, createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./Reducers/Index";
const middleWare = [thunk];

const reducer = persistReducer(
  {
    key: "rssb", // key is required
    storage, // storage is now required
    whitelist: ["auth","Auth"],
  },
  combineReducers({ ...rootReducer })
);

/* istanbul ignore next */
const configStore = (initialState = {}) => {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
  );

  return {
    persistor: persistStore(store),
    store,
  };
};

const { store, persistor } = configStore();

global.store = store;

export { store, persistor };
