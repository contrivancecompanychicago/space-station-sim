// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const a = 'ACCESS';
const b = 'BLOCK';

import Weight from 'Game/Data/Grid/Weight'

let img = require('./oven.png');
// //upsize image
// var src = document.createElement("canvas");
// src.width = img.width;
// src.height = img.height;
// src.getContext("2d").drawImage(img, 0, 0);
// let pixel = src.getContext('2d').getImageData(1, 1, 1, 1).data

// var image = new Image();
// image.src = src.toDataURL("image/png");
// debugger;

const obj:ObjectDataType = {
  id: 'OVEN',
  label: 'Oven',
  image: img,
  width: 1,
  height: 4,
  blocks: [
    {type: a, weight: Weight.ACCESS, x:0, y:0},
    {type: b, weight: Weight.BLOCK, x:0, y:1},
    {type: b, weight: Weight.BLOCK, x:0, y:2},
    {type: b, weight: Weight.BLOCK, x:0, y:3},
  ],
  requirements: {},
  abilities: [Ability.OVEN]
}

export default obj
