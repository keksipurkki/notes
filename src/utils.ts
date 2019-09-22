export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const nil: NilTodo = Object.freeze({
  type: "Nil"
});

export function isTodo(todo: Maybe<TodoNote>): todo is TodoNote {
  return todo !== nil;
}

export function canMarkDone(todo: Maybe<TodoNote>) {
  const acceptable = ["Editing", "NotDone"];
  const type = todo.type as string;
  return acceptable.includes(type);
}

export function parse(todo: TodoNote) {
  const [title, details] = todo.content.split(/\n+/);
  return {
    title: title || "New Note",
    details: details || "No additional text",
  };
}

export function timestamp(todo: TodoNote) {
  const created = new Date(todo.createdAt);
  const now = new Date();
  if (now.toDateString() == created.toDateString()) {
    return created.toLocaleTimeString();
  } else {
    return created.toDateString();
  }
}

export { compose } from "redux";
