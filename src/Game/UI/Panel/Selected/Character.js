//@flow
import React from 'react';
import Draggable from 'react-draggable'
import Header from '../Component/Header'

import { connect } from 'react-redux';
import CharacterRow from '../../Row/Character'

import type Character from 'Game/Type/Character';
import type Obj from 'Game/Type/Object';


import TaskData from 'Game/Data/Task'
import type {TaskType, TaskDataType} from 'Game/Data/Task'

import state from 'Game/state'

type Props = {
		target: Character,
		close: Function,
		center: Function,
		follow: Function
}
class SelectedCharacterPanel extends React.Component{
		props: Props
		
		interval:number;
		componentDidMount() {
			this.interval = setInterval(() => {
				this.forceUpdate();
			}, 1000)
		}
		componentWillUnmount() {
			clearInterval(this.interval)
		}

		toggleTask(e:Event){
			// FLOWHACK whatever.
			this.props.target.toggleTaskType(e.target.name)
			this.forceUpdate()
		}
		
		render(){

			let tasks = []
			TaskData.each((key:TaskType, val:TaskDataType, index:number) => {
				let has = this.props.target.hasTaskType(key);
				
				tasks.push(<div key={index}>
					<label className={'task-'+key}>
						{val.label}
						<input type="checkbox" name={key} checked={has} onChange={this.toggleTask.bind(this)} />
					</label>
				</div>)
			})

				return <Draggable><div className="selected panel">
						<Header text={this.props.target.toString()} close={this.props.close} />
						<CharacterRow character={this.props.target} />
						{this.props.target.status}
						<div>
							<h3>Responsibilities</h3>
							{tasks}
						</div>
						<button className="center" onClick={this.props.center}>center</button>
						<button className="follow" onClick={this.props.follow}>follow</button>

				</div></Draggable>
		}
}


function mapStateToProps(state:Object, props:Object):Object {
	return {
	};
}

function mapDispatchToProps(dispatch:Function, props:Props):Object {
	return {
		center: () => {
			
			state.view.centerOnPoint(props.target.position)
		},
		follow: () => {
			
			state.view.followCharacter(props.target)
		},
		close: () => {
			dispatch({type:'REMOVE_SELECTED', selected: props.target});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCharacterPanel);
