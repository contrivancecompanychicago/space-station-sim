// @flow
import React from 'react';

import ContextMenuItem from './ContextMenuItem';

import type Character from 'Game/Type/Character'
import type Obj from 'Game/Type/Object'

type Props = {
    character: Character,
    object: Obj,
    position: {x:number, y:number}
}

export default class ContextMenu extends React.Component{
    props: Props;
    render() {
        return <div className="contextMenu">contextMenu</div>
    }
}

