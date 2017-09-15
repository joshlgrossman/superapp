import { func, string } from './util';

function createElement(value) {
  return string(value) ? document.createTextNode(value) : document.createElement(value.tag);
}

export function update(node, old = {}, next = {}) {

  if(string(next)) {
    if(next !== old) node.textContent = next;
    return;
  }

  for(const key in next.attributes) {
    const nextVal = next.attributes[key];

    if(func(nextVal)) {
      const oldVal = old && old.attributes && old.attributes[key];
      if(oldVal) node.removeEventListener(key, oldVal);
      node.addEventListener(key, nextVal);
    } else {
      node.setAttribute(key, nextVal);
    }
    old && old.attributes && delete old.attributes[key];
  }

  if(old && old.attributes)
    for(const key in old.attributes) node.removeAttribute(key);

  let i = 0;

  if(next && next.children)
    for(; i < next.children.length; i++) {
      const oldVal = old && old.children ? old.children[i] : null;
      const nextVal = next.children[i];
      let child = node.childNodes[i];

      if(!child) {
        child = createElement(nextVal);
        node.appendChild(child);
      } else if(oldVal && nextVal && oldVal.tag !== nextVal.tag) {
        const newChild = createElement(nextVal);
        node.replaceChild(newChild, child);
        child = newChild;
      }
        
      update(child, oldVal, nextVal);
    }

  if(old && old.children)
    for(; i < old.children.length; i++) {
      const child = node.children[i];
      if(child) node.removeChild(child);
    }

}