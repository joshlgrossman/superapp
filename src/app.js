import { createStore } from './store';
import { update } from './update';

export function app(element, { view, state: initialState, events: reducers = [] }) {
  
  let old = {};
  let willRender = false;

  const throttleFunction = window.requestAnimationFrame || function(func){
    window.setTimeout(func, 30);
  };

  const store = createStore(initialState, reducers, function() {
    if(!willRender) {
      willRender = true;
      throttleFunction(() => {
        const next = { children: [view({
          state: store.value, 
          dispatch: store.dispatch,
          http: store.http
        })] };
        update(element, old, next);
        old = next;
        willRender = false;
      });
    }
  });

  store.update();
}