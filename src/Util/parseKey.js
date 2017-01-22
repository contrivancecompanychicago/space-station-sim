export default function parseKey(key){
  let parts = key.split('_');
  return {x:parseInt(parts[0]), y:parseInt(parts[1])};
}
