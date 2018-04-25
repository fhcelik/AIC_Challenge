export default store => next => action => {
  if ('function' === typeof action.payload) {
    return next(action.payload);
  }
  return next(action);
};
