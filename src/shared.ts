type AsyncResult<E extends Error, S> = Promise<Result<E, S>>;
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
type PromiseType<P extends Promise<any>> = P extends Promise<infer U> ? U : never;

export const Failure = <E extends Error>(failure: E): Result<E, never> => ({ failure });
export const Success = <S>(success: S): Result<never, S> => ({ success });
export const NotAsked: NotAsked = { type: "NotAsked" };
export const Loading: Loading = { type: "Loading" };

export interface Reflected<F extends AnyAsyncFunction> {
  (...args: ArgumentTypes<F>): AsyncResult<Error, PromiseType<ReturnType<F>>>;
}

export function reflected<F extends AnyAsyncFunction>(fn: F): Reflected<F> {
  const result = (...args: any[]) => {
    return fn(...args)
      .then(success => ({ success }))
      .catch(failure => ({ failure }));
  };
  return result;
}

export function withTimeout<F extends AnyAsyncFunction>(fn: F, timeout: number): F {
  const result = (...args: any[]) => {
    const timer = new Promise((_, reject) => setTimeout(reject, timeout, new Error()));
    const promise = fn(...args);
    return Promise.race([promise, timer]);
  };
  return result as F;
}


export function action<T extends string, P, M = {}>(type: T, payload?: P, meta?: M) {
  return { type, payload, meta };
}

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
