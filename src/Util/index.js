// import FglobalToLocal from './globalToLocal';
// import FlocalToGlobal from './localToGlobal';
// import uniqid from './uniqid';
// // //
// export default {
//   globalToLocal,
//   localToGlobal,
//   uniqid
// };
// export function globalToLocal = globalToLocal;
// export function localToGlobal = localToGlobal;

// export const globalToLocal = FglobalToLocal;
// export const localToGlobal = FlocalToGlobal;
export const globalToLocal = require('./globalToLocal').default;
export const localToGlobal = require('./localToGlobal').default;

// export * as localToGlobal from './localToGlobal';

// export * from './globalToLocal';
// export * from './localToGlobal';
