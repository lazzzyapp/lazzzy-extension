declare module '*.less';
declare module '*.png';
declare module '@web-clipper/readability';
declare module 'turndown-plugin-gfm';
declare module '@web-clipper/remark-pangu';
declare module 'dva-loading';

type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

type Unpack<T> = T extends Promise<infer U> ? U : T;
// eslint-disable-next-line no-unused-vars
type CallResult<T extends (...args: any[]) => any> = Unpack<ReturnType<T>>;

interface Type<T> extends Function {
  // eslint-disable-next-line no-unused-vars
  new (...args: any[]): T;
}

// <reference path="../../node_modules/@types/chrome/index.d.ts"/>

// eslint-disable-next-line no-redeclare
interface Window {
  LAZZZY_VERSION: string;
  _gaq: string[][];
}

declare const LAZZZY_VERSION: string;
