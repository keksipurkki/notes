import actionCreators, { actionTypes } from "./Actions";
import {
  Action as ReduxAction,
  createStore,
  bindActionCreators,
  applyMiddleware,
} from "redux";
import reducer from "./Reducer";
import middlewares from "./Middlewares";
import selectors from "./Selectors";

/* Redux types */
type ActionType = keyof typeof actionTypes;
type ActionCreators = typeof actionCreators;
type ActionDispatcher = { dispatch: ActionCreators };
type ActionUnion = ReturnType<ActionCreators[keyof ActionCreators]>;
type Action<T = ActionType> = Defined<Filter<ActionUnion, ReduxAction<T>>>;

export { Action, ActionDispatcher, ActionCreators };

/* Store facade */
import { connect as _connect, Provider, MapStateToProps } from "react-redux";
type Selector<StateProps, OwnProps = {}> = MapStateToProps<
  StateProps,
  OwnProps,
  AppState
>;

function configureStore() {
  return createStore(reducer, undefined, applyMiddleware(...middlewares));
}

function connect<S, O = {}>(selector?: Selector<S, O>) {
  return _connect(selector || null, dispatch => ({
    dispatch: bindActionCreators(actionCreators, dispatch),
  }));
}

export { Provider, selectors, connect, configureStore };
