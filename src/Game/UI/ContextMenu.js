// @flow
import React from 'react';
import { connect } from 'react-redux';

import ContextMenuItem from './ContextMenuItem';

import type Character from 'Game/Type/Character'
import type Obj from 'Game/Type/Object'

type Props = {
		character: Character,
		object: Obj,
		position: {x:number, y:number},
		mouseout: Function,
}

class ContextMenu extends React.Component{
		props: Props;
		moveHere(){
			console.log('movehere')
		}
		render() {
			// function mouseOut(){
			//     alert('zombie');
			// }
			// if()
			let style = {
					left:this.props.position.x - 10,
					top:this.props.position.y - 10
			}
			return <div style={style} onMouseOut={this.props.mouseout} className="contextMenu">
				contextMenu
				<div className="items">
					<ContextMenuItem text="move here" fn={this.moveHere} />
					<ContextMenuItem text="cancel" fn={()=>{}} />
				</div>
			</div>
		}
}

function mapStateToProps(state:Object, props:Object):Object {
	return {
	};
}

function mapDispatchToProps(dispatch:Function, props:Object):Object {
	return {
		mouseout: (id) => {
			dispatch({type:'CLOSE_CONTEXT_MENU'});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
