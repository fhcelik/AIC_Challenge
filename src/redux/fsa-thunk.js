export default store => next => action => {
  if ('function' === typeof action) {
    throw new Error(
      `Dispatched function detected. Did you dispatch an action creator instead of the created action?`
    );
  }
  if ('function' === typeof action.payload) {
    return next({
      ...action,
      payload: next(action.payload),
    });
  }
  return next(action);
};
