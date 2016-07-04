
import {keys} from 'lodash';

import renderObject from './item/object';

export default function renderItem(state, layer) {
  keys(state.Item).forEach((key) => {

    let obj = state.Item[key];
    renderObject(obj, state, layer);
  });
}
