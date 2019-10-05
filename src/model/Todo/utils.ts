export const nil: NilTodo = Object.freeze({
  type: "Nil"
});

export function isTodo(todo: Maybe<Todo>): todo is Todo {
  return todo !== nil;
}

export function canMarkDone(todo: Maybe<Todo>) {
  const acceptable = ["Editing", "NotDone"];
  const type = todo.type as string;
  return acceptable.includes(type);
}

export function parse(todo: Todo) {
  const [title, details] = todo.content.split(/\n+/);
  return {
    title: title || "New Note",
    details: details || "No additional text",
  };
}

export function timestamp(todo: Todo) {
  const created = new Date(todo.createdAt);
  const now = new Date();
  if (now.toDateString() == created.toDateString()) {
    return created.toLocaleTimeString();
  } else {
    return created.toDateString();
  }
}

export function sortOrder(a: Todo, b: Todo) {
  const aAt = new Date(a.modifiedAt);
  const bAt = new Date(b.modifiedAt);
  return bAt.getTime() - aAt.getTime();
}

