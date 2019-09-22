type Filter<T, U> = T extends U ? T : never;
type Defined<T> = { [P in keyof T]-?: Defined<NonNullable<T[P]>> };

interface TodoContent<T extends string> {
  type: T;
  id: string; // uuid
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
