export function createElement(tag) {
  return function(attributes, ...children) {
    return {tag, attributes, children};
  }
}

export const div = createElement('div');
export const span = createElement('span');
export const button = createElement('button');
export const input = createElement('input');
export const textarea = createElement('textarea');