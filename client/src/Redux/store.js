import { createStore } from "redux";
import rootReducer from "./rootReducer";

const store = createStore(
  rootReducer,
  window._REDUX_DEVTOOLS_EXTENSION_ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
