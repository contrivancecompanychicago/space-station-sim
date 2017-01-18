// @flow
/*
Objects are permanent(ish) fixtures attached to blocks
*/
import keys from 'lodash.keys';

import Bed from './Object/Bed';
import Dock from './Object/Dock';
import Test from './Object/Test';
import Oven from './Object/Oven';
import Fridge from './Object/Fridge';
import Table from './Object/Table';
import Table2 from './Object/Table2';

const Objs = {};

Objs[Bed.id] = Bed;
Objs[Dock.id] = Dock;
Objs[Test.id] = Test;
Objs[Oven.id] = Oven;
Objs[Fridge.id] = Fridge;
Objs[Table.id] = Table;
Objs[Table2.id] = Table2;

export default Objs;

export let Obj = {};
keys(Objs).forEach((key) => {Obj[key]=key;});
