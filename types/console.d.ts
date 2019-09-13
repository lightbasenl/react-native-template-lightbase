declare module 'console' {
  // https://github.com/Microsoft/TypeScript/issues/30471
  export = typeof import('console');
}
