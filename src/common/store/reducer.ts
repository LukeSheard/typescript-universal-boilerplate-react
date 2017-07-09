import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { IAppState } from "./index";

export default combineReducers<IAppState>({
  routing: routerReducer
});
