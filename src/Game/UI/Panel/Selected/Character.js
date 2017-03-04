//@flow
import React from 'react';
import Draggable from 'react-draggable'
import Header from '../Component/Header'

import { connect } from 'react-redux';
import CharacterRow from '../../Row/Character'

import type Character from 'Game/Type/Character';
import type Obj from 'Game/Type/Object';

import RecipeData from 'Game/Data/Recipe'
import type {RecipeType, RecipeDataType} from 'Game/Data/Recipe'
import TaskData from 'Game/Data/Task'
import type {TaskType, TaskDataType} from 'Game/Data/Task'

import state from 'Game/state'

type Props = {
	target: Character,
	close: Function,
	center: Function,
	follow: Function,
}
type State = {
	showTasks:boolean,
	showRecipes:boolean,
}
class SelectedCharacterPanel extends React.Component{
		props: Props
		state:State
		interval:number;
		componentDidMount() {
			this.interval = setInterval(() => {
				this.forceUpdate();
			}, 1000)
		}
		componentWillUnmount() {
			clearInterval(this.interval)
		}

		constructor(props){
			super(props);
			this.state = {
				showTasks:true,
				showRecipes:true,
			}
		}

		toggleTask(e:Event){
			// FLOWHACK whatever.
			this.props.target.toggleTaskType(e.target.name)
			this.forceUpdate()
		}

		toggleTasks(e:Event){
			this.state.showTasks = !this.state.showTasks
			this.setState(this.state)
		}
		toggleRecipes(e:Event){
			this.state.showRecipes = !this.state.showRecipes
			this.setState(this.state)
		}
		
		render(){
			let workerData = '';
			if( this.props.target.type == 'WORKER'){
				let tasks = []
				let recipes = []
				if(this.state.showTasks){
					TaskData.each((key:TaskType, val:TaskDataType, index:number) => {
						let has = this.props.target.hasTaskType(key);
						
						tasks.push(<div key={index}>
							<label className={'task-'+key}>
								{val.label}
								<input type="checkbox" name={key} checked={has} onChange={this.toggleTask.bind(this)} />
							</label>
						</div>)
					})
				}
				if(this.state.showRecipes){
					RecipeData.each((key:RecipeType, val:RecipeDataType, index:number) => {
						if(this.props.target.hasRecipe(key)){
							recipes.push(<div>
								{val.label}
							</div>)
						}
					})
				}

				workerData = <div>
							<Header text="Responsibilities" close={this.toggleTasks.bind(this)} />
							{tasks}
							<Header text="Recipes" close={this.toggleRecipes.bind(this)} />
							{recipes}
						</div>
			}

				return <Draggable><div className="selected panel">
						<Header text={this.props.target.toString()} close={this.props.close} />
						<CharacterRow character={this.props.target} />
						{workerData}
						
						<div className="status">{this.props.target.status}</div>
						<div className="controls">
							<button className="center" onClick={this.props.center}>center</button>
							<button className="follow" onClick={this.props.follow}>follow</button>
						</div>

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
