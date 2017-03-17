// @flow
import React from 'react';
import { connect } from 'react-redux';

import ContextMenuItem from './ContextMenuItem';

import type Character from 'Game/Type/Character'
import type Obj from 'Game/Type/Object'

type Props = {
    character: Character,
    object: Obj,
    position: {x:number, y:number}
}

class ContextMenu extends React.Component{
    props: Props;
    render() {
        // function mouseOut(){
        //     alert('zombie');
        // }
        let style = {
            left:this.props.position.x - 10,
            top:this.props.position.y - 10
        }
        return <div style={style} onMouseOut={this.props.mouseout} className="contextMenu">contextMenu</div>
    }
}

function mapStateToProps(state, props) {
  return {
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    mouseout: (id) => {
      dispatch({type:'CLOSE_CONTEXT_MENU'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
