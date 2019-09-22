import actionCreators, * as actionTypes from "./Actions";
import { createStore, bindActionCreators, applyMiddleware } from "redux";
import reducer, { AppState } from "./Reducer";
import middlewares from "./Middlewares";

/* Redux types */
type ActionType = keyof typeof actionTypes;
type ActionCreators = typeof actionCreators;
type ActionEmitter = { emit: ActionCreators };
type ActionUnion = ReturnType<ActionCreators[keyof ActionCreators]>;
type Action<T = ActionType> = Defined<Filter<ActionUnion, { type: T }>>;

export { Action, ActionEmitter, ActionCreators, AppState };

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
    emit: bindActionCreators(actionCreators, dispatch),
  }));
}

export { Provider, connect, configureStore };
