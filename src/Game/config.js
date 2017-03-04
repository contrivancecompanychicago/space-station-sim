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
    speed: 80,
    skill: {
      max: 100
    },
    recipe:{
      level:{
        '0':{ experience: 50 },
        '1':{ experience: 100 },
        '2':{ experience: 200 },
        '3':{ experience: 500 },
        '4':{ experience: 1000 },

      }
    }
  },
  save: {
    prefix: 'save_'
  },
  env: 'dev' //change this when publishing
};
