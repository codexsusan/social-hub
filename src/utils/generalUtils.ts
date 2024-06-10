/* eslint-disable @typescript-eslint/no-explicit-any */

export function hasProperty(
  obj: any,
  propName: string
): obj is { [k in typeof propName]: any } {
  return propName in obj;
}
