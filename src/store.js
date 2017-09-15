export function createStore(initialValue, reducers, update) {
  const obj = {};
  obj.value = initialValue;
  obj.dispatch = (event, value) => {
    obj.value = reducers.reduce(
      (result, reducer) => reducer(result, event, value) || result,
      obj.value
    );
    update(obj);
  };
  return obj;
}
