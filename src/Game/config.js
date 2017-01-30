//@flow
export default {
  view: {
    scale: {
      max: 10,
      min: 0.2,
      step: 0.1
    },
    selection: {
      strokeStyle: "blue",
      shadowBlur: 10,
      shadowColor: "blue"
    }
  },
  grid: {
    width: 32,
    height: 32,
    debugtext: false
  },
  character:{
    radius: 10,
    speed: 50,
    skill: {
      max: 100
    }
  },
  env: 'dev' //change this when publishing
};
