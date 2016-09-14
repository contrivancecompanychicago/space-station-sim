export default {
  start: function(char){
    this.makePath(char, this.gridManager.randomNode());
  },
  update: function(char){
    this.followPath(char);
  },
};
