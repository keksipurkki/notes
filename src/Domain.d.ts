type Filter<T, U> = T extends U ? T : never;
type Defined<T> = { [P in keyof T]-?: Defined<NonNullable<T[P]>> };
type Lazy<T> = () => T;
type Nullable<T> = T | null;
type Consumer<T> = (t: T) => void;
type AnyFunction = (...args: any[]) => any;

interface TodoNoteContent<T> {
  type: T;
  id: string; // uuid
  content: string;
  createdAt: string;
  modifiedAt: string;
}

type TodoNote =
  | TodoNoteContent<"New">
  | TodoNoteContent<"Editing">
  | TodoNoteContent<"NotDone">
  | TodoNoteContent<"Done">;

type NilTodo = Partial<TodoNoteContent<"Nil">>;

type Maybe<T, Nothing = NilTodo> = T | Nothing;
