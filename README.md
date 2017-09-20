superapp
---

superapp is basically a rip-off of hyperapp.

Installation:
---
`npm i superapp`

Usage:
---
```javascript
import { app, el } from 'superapp';

const div = (attrs, ...children) => el('div', attrs, ...children);
const button = (attrs, ...children) => el('button', attrs, ...children);
const webservice = 'https://jsonplaceholder.typicode.com/posts/';

app(
  document.querySelector('#app-container'),
  {
    state: {
      timesClicked: 0,
      posts: []
    },

    events: [
      (state, event) => event === 'add' ? { ...state, timesClicked: state.timesClicked + 1 } : state,
      (state, event) => event === 'sub' ? { ...state, timesClicked: state.timesClicked - 1 } : state,
      (state, event, {err, result}) => {
        if(event === 'load-post' && !err) {
          return {
            ...state,
            posts: [
              ...state.posts,
              result.title
            ]
          };
        } else return state;
      }
    ],

    app: ({state, dispatch, http}) => 
      div({},
        button({ click: e => dispatch('add') }, 'click to add 1'),
        `${state.timesClicked}`,
        button({ click: e => dispatch('sub') }, 'click to subtract 1'),

        button({ click: e => http.get(webservice + (state.posts.length + 1), 'load-post')}, 'click to load next post'),
        ...state.posts.map(post => div({}, post))
      )

  }
);
```