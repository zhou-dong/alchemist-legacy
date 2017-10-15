// @flow

export function longestString(...args: string[]) {
  return args.reduce((a, b) => (a.length > b.length ? a : b));
}
