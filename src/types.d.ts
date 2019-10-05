type AnyFunction = (...args: any[]) => any;
type AnyAsyncFunction = (...args: any[]) => Promise<any>;
type Filter<T, U> = T extends U ? T : never;
type Defined<T> = { [P in keyof T]-?: Defined<NonNullable<T[P]>> };

interface Result<E extends Error, S> {
  success?: S;
  failure?: E;
}

type NotAsked = { type: "NotAsked" };
type Loading = { type: "Loading" };

type RemoteData<E extends Error, S> = NotAsked | Loading | Result<E, S>;
