// @flow
/*
Objects are permanent(ish) fixtures attached to blocks
*/
import keys from 'lodash.keys';

import Bed from './Object/Bed';
import Dock from './Object/Dock';
import Test from './Object/Test';

const Objs = {};

Objs[Bed.id] = Bed;
Objs[Dock.id] = Dock;
Objs[Test.id] = Test;

export default Objs;

// export let Objects = {};
// keys(Objekt).forEach((key) => {Objects[key]=key;});
