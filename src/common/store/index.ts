import { routerMiddleware, routerReducer } from "react-router-redux";
import { applyMiddleware, createStore, Middleware, Store } from "redux";
import reducer from "./reducer";

export interface IAppState {
  routing?: typeof routerReducer;
}

export type IAppStore = Store<IAppState>;

export default function(history, initialState: IAppState = {}): IAppStore {
  const middleware: Middleware[] = [routerMiddleware(history)];

  const store: IAppStore = createStore<IAppState>(
    reducer,
    initialState,
    applyMiddleware(...middleware)
  );
  return store;
}
