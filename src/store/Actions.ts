import { uuidv4, isTodo } from "../utils";

export const NEW_TODO = "NEW_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const SELECT_TODO = "SELECT_TODO";
export const REMOVE_TODO = "REMOVE_TODO";

function newTodo(): Todo {
  const now = new Date().toISOString();
  return {
    type: "New",
    id: uuidv4(),
    content: "",
    createdAt: now,
    modifiedAt: now,
  };
}

function editedTodo(todo: Maybe<Todo>, update: Partial<Todo>): Maybe<Todo> {
  const now = new Date().toISOString();
  const type = update.type || "Editing";
  if (isTodo(todo)) {
    return {
      ...todo,
      ...update,
      modifiedAt: now,
      type
    };
  } else {
    return todo;
  }
}

function action<T extends string, P, M = {}>(type: T, payload?: P, meta?: M) {
  return { type, payload, meta };
}

const Actions = {
  create: () => action(NEW_TODO, newTodo()),
  select: (todo: Todo) => action(SELECT_TODO, todo),
  edit: (todo: Maybe<Todo>, update: Partial<Todo>) => action(EDIT_TODO, editedTodo(todo, update)),
  removeTodo: (todo: Maybe<Todo>) => action(REMOVE_TODO, todo),
  markDone: (todo: Maybe<Todo>) => Actions.edit(todo, { type: "Done" }),
  unmark: (todo: Maybe<Todo>) => Actions.edit(todo, { type: "NotDone" })
};

export default Actions;
