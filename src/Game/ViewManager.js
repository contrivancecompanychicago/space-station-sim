
export default class ViewManager{

  constructor(state) {
    this.state = state;
  }

  start(){
    this.addListeners();
  }

  addListeners() {
    document.addEventListener('mousedown', this.onMouseDown);
  }

  onMouseDown(e){
    console.log(e.button);
  }
}


	// view:
	// 	scale: 1
	// 	offset:
	// 		x: 0
	// 		y: 0
