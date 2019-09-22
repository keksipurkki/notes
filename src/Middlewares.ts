import { Middleware } from "redux";

const logger: Middleware = () => next => action => {
  console.groupCollapsed(`${new Date().toISOString()} [${action.type}]`);
  console.log(action);
  console.groupEnd();
  return next(action);
};

export default [
  logger,
];
