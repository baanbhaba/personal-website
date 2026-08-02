/// <reference types="vite/client" />

declare module 'react' {
  export type Key = string | number | null;
  export type ReactNode = ReactElement<any, any> | JSX.Element | Element | string | number | boolean | null | undefined;
  export type JSXElementConstructor<P> = ((props: P) => ReactElement<any, any>) | (new (props: P) => any);

  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string> {
    type: T;
    props: P;
    key: Key;
  }

  export type FormEvent<T = Element> = any;
  export type ChangeEvent<T = Element> = any;
  export type MouseEvent<T = Element> = any;

  export interface Attributes {
    key?: Key;
  }

  export interface DOMAttributes<T> {
    children?: ReactNode;
    onCopy?: any;
    onCut?: any;
    onPaste?: any;
    onCompositionEnd?: any;
    onCompositionStart?: any;
    onCompositionUpdate?: any;
    onFocus?: any;
    onBlur?: any;
    onChange?: any;
    onInput?: any;
    onSubmit?: any;
    onKeyDown?: any;
    onKeyPress?: any;
    onKeyUp?: any;
    onMouseDown?: any;
    onMouseEnter?: any;
    onMouseLeave?: any;
    onMouseMove?: any;
    onMouseOut?: any;
    onMouseOver?: any;
    onMouseUp?: any;
    onClick?: any;
    onContextMenu?: any;
    onDoubleClick?: any;
  }

  export interface HTMLAttributes<T> extends DOMAttributes<T> {
    id?: string;
    className?: string;
    style?: any;
    title?: string;
    role?: string;
    tabIndex?: number;
    type?: string;
    value?: string | number | readonly string[] | undefined;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    name?: string;
  }

  export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {}
  export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {}
  export interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    onSubmit?: any;
  }

  export function createElement<P = any, T extends string | JSXElementConstructor<any> = string>(
    type: T,
    props?: P | null,
    ...children: ReactNode[]
  ): ReactElement<P, T>;

  export function useState<S>(initialState: S | (() => S)): [S, (value: S | ((prevState: S) => S)) => void];
  export function useState<S = undefined>(): [S | undefined, (value: S | ((prevState: S | undefined) => S | undefined)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useMemo<T>(factory: () => T, deps: any[]): T;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export function useRef<T>(initialValue: T): { current: T };
  export function memo<T extends FunctionComponent<any>>(component: T): T;
  export function lazy<T extends FunctionComponent<any>>(factory: () => Promise<{ default: T }>): T;
  export const Fragment: any;
  export const StrictMode: any;
}

declare module 'react-dom' {
  export {};
}

declare module 'react-dom/client' {
  export function createRoot(container: Element | DocumentFragment): {
    render(children: any): void;
  };
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: string | number): any;
  export function jsxs(type: any, props: any, key?: string | number): any;
  export function jsxDEV(type: any, props: any, key?: string | number): any;
}

declare namespace JSX {
  interface Element extends React.ReactElement<any, any> {}
  interface ElementClass {}
  interface ElementAttributesProperty { props: {}; }
  interface ElementChildrenAttribute { children: {}; }
  interface IntrinsicAttributes {
    key?: React.Key;
  }
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface LibraryManagedAttributes<C, P> {
    [key: string]: any;
  }
}
