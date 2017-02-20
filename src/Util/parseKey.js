// @flow
export default function parseKey(key):{x:number, y:number}{
  let parts = key.split('_');
  return {x:parseInt(parts[0]), y:parseInt(parts[1])};
}
