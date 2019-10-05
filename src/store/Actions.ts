/**
 *
 * Action creators
 *
 * Cause state changes
 *
 */

import todoActions, * as todoActionTypes from "../model/Todo";

export const actionTypes = {
  ...todoActionTypes
};

export default {
  ...todoActions,
};
