declare namespace Superapp { 

  export interface Http {
    get: (event: string, url: string, params: object) => void;
    post: (event: string, url: string, params: object) => void;
    put: (event: string, url: string, params: object) => void;
    del: (event: string, url: string, params: object) => void;
  }

  export interface Store {
    http: Http;
    dispatch: (event: string, payload: any) => void;
    value: object;
  }

  export interface VDOMNode {
    attributes: object;
    children: VDOMNode[];
    tag: string;
  }

  export type View = (store: Store) => VDOMNode;
  export type Reducer = (state: object, event: string, payload?: any) => object

}

declare function el(
  tag: string, 
  attributes: object, 
  ...children: Superapp.VDOMNode[]
): Superapp.VDOMNode;

declare function app(
  element: HTMLElement,
  options: {
    events: Superapp.Reducer[];
    state: object;
    view: Superapp.View;
  }
): void;