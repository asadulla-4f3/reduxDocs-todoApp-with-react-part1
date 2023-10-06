import { applyMiddleware, legacy_createStore } from "redux";
import rootReducer from "./reducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const composedEnhancer = composeWithDevTools(applyMiddleware());

const store = legacy_createStore(rootReducer, composedEnhancer);

export default store;
