import { Reducer } from "redux";
import { Action } from "../../store/Store";
import { sortOrder, isTodo, nil } from "./utils";

const initialState: TodoState = {
  map: {},
  selected: nil,
  order: [],
};

const reducer: Reducer<TodoState, Action> = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_TODO":
      return { ...state, selected: action.payload };
    case "REMOVE_TODO": {
      const { [action.payload.id]: removed, ...map } = state.map;
      const order = state.order.filter(uuid => uuid !== removed.id);
      return { selected: nil, map, order };
    }
    case "NEW_TODO":
    case "EDIT_TODO": {
      const selected = action.payload;

      if (!isTodo(selected)) {
        return state;
      }

      const map = {
        ...state.map,
        [selected.id]: selected,
      };

      const order = Object.values(map)
        .sort(sortOrder)
        .map(({ id }) => id);

      return {
        selected,
        map,
        order,
      };

    }
    default:
      return state;
  }
};

export default reducer;
