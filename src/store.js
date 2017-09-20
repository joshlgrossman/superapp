import * as http from './http';

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

  obj.http = {};
  for(const key in http) {
    obj.http[key] = (url, event, params) => {
      http[key](url, params, (err, result) => obj.dispatch(event, {err, result}));
    };
  }

  return obj;
}
