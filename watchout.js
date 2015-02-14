// start slingin' some d3 here.

// 1. make a game board
// 2. add player
  // be able to move when dragged
// 3. make enemy
  // responde to collision
// 4. current score
  // store highest score
  // replace new high score

var gameBoard = {
  height: 500,
  width: 900,
  nEnemies: 25,
  padding: 30,
  color: 'green'
};

var gameStats = {
  highScore: 0,
  currentScore: 0,
  collisions: 0
};

var player = {
  fill: 'blue',
  shape: "square",
  y: 450,
  x: 250,
  angle: 0,
  makePlayer: function(){
    var playerD3 = gameBoardD3
      .append('svg:square')
      .attr('height', this.y)
      .attr('width', this.x)
      .attr('fill', this.fill)
  }
};

var enemy = {
  fill: 'red',
  shape: 'circle',
  cy: function(){
    return Math.random()*gameBoard.height
  },
  cx:function(){
    return Math.random()*gameBoard.width
  },
  r: 10,
  strokeColor: "black",
  strokeWidth: 2,
  amount: 25,
  makeEnemy: function(){
    var enemyD3 = gameBoardD3
      .append('svg:circle')
      .attr('cx', this.cx)
      .attr('cy', this.cy)
      .attr('fill', this.fill)
      .attr('r', this.r)
      .attr('stroke', this.strokeColor)
      .attr('stroke-width', this.strokeWidth)
  },
  // generate enemy based on enemy size property
  generate: function(){
    for(var i = 1; i < this.amount; i++){
      this.makeEnemy();
    }
  }
}


// make game board
var gameBoardD3 =
  d3.select('body').select('.gameBoard')
  .append('svg')
  .style('background-color', gameBoard.color)
  .style('width', gameBoard.width+'px')
  .style('height', gameBoard.height+'px')

// make player




enemy.generate()









