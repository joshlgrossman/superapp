superapp
---

superapp is basically a rip-off of hyperapp.

example:
```javascript
const div = (attrs, ...children) => el('div', attrs, ...children);
const button = (attrs, ...children) => el('button', attrs, ...children);

app(
  document.querySelector('#app-container'),
  {
    state: {
      timesClicked: 0
    },

    events: [
      (state, event) => event === 'add' ? { timesClicked: state.timesClicked + 1 } : state,
      (state, event) => event === 'sub' ? { timesClicked: state.timesClicked - 1 } : state
    ],

    app: ({state, dispatch}) => 
      div({},
        button({ click: e => dispatch('add') }, 'click to add 1'),
        `${state.timesClicked}`,
        button({ click: e => dispatch('sub') }, 'click to subtract 1')
      )

  }
);
```