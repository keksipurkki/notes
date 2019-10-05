type uuid = string;

interface TodoContent<T extends string> {
  type: T;
  id: uuid; // uuid
  content: string;
  createdAt: string; // iso 8601
  modifiedAt: string; // iso 8601
}

type Todo =
  | TodoContent<"New">
  | TodoContent<"Editing">
  | TodoContent<"NotDone">
  | TodoContent<"Done">;

type NilTodo = Partial<TodoContent<"Nil">>;

type Maybe<T extends Todo, Nothing = NilTodo> = T | Nothing;

interface TodoState {
  map: { [uuid: string]: Todo };
  selected: Maybe<Todo>;
  order: uuid[];
}

interface AppState {
  todo: TodoState;
}
