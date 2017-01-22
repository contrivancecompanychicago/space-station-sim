//@flow
import {keys} from 'lodash';

import renderObject from './item/object';

import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'

export default function renderItem(state:State, layer:Layer) {
  keys(state.Item).forEach((key) => {

    let obj = state.Item[key];
    renderObject(obj, state, layer);
  });
}
