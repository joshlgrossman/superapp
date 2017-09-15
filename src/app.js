import { createStore } from './store';
import { update } from './update';

export function app(element, { app, store, reducers = [] }) {
  
  let old = {};
  let willRender = false;
  
  // eslint-disable-next-line no-use-before-define
  const model = createStore(store, reducers, updater);
  const throttleFunction = window.requestAnimationFrame || function(func){
    window.setTimeout(func, 10);
  };

  function updater() {
    if(!willRender) {
      willRender = true;
      throttleFunction(() => {
        const next = { children: [app(model)] };
        update(element, old, next);
        old = next;
        willRender = false;
      });
    }
  }

  updater();
}