/**
 *
 * Selectors
 *
 * Derive user interface props
 *
 */

function todos({ todo }: AppState) {
  return todo.order.map(uuid => todo.map[uuid]);
}

function selected({ todo }: AppState) {
  return todo.selected;
}

export default {
  todos,
  selected
};
