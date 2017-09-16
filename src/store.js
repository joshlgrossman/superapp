export function createStore(initialState, reducers, update) {
  const obj = {};
  obj.update = update;
  obj.value = initialState;
  obj.dispatch = (event, value) => {
    obj.value = reducers.reduce(
      (result, reducer) => reducer(result, event, value) || result,
      obj.value
    );
    update(obj);
  };
  return obj;
}
