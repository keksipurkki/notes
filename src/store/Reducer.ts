import { Reducer } from "redux";
import { Action } from "./Store";
import { isTodo, nil } from "../utils";

interface AppState {
  map: { [uuid: string]: Todo };
  selected: Maybe<Todo>;
  todos: Todo[];
}

function todoOrder(a: Todo, b: Todo) {
  const aAt = new Date(a.modifiedAt);
  const bAt = new Date(b.modifiedAt);
  return bAt.getTime() - aAt.getTime();
}

const initialState: AppState = {
  map: {},
  selected: nil,
  todos: [],
};

const reducer: Reducer<AppState, Action> = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_TODO":
      return {
        ...state,
        selected: action.payload
      };
    case "REMOVE_TODO":
      const { [action.payload.id]: removed, ...map } = state.map;
      const todos = state.todos.filter(({ id }) => id !== removed.id);
      return {
        selected: nil,
        map,
        todos,
      };
    case "NEW_TODO":
    case "EDIT_TODO": {
      const selected = action.payload;

      const map = {
        ...state.map,
      };

      if (isTodo(selected)) {
        map[selected.id] = selected;
      }

      const todos = Object.values(map).sort(todoOrder);

      return { selected, map, todos };

    }
    default:
      return state;
  }
};

export { AppState };
export default reducer;
