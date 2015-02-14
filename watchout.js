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
  fill: 'white',
  strokeColor: "black",
  strokeWidth: 1.5,
  x: 450,
  y: 250,
  angle: 0,
  path: 'M11.166,23.963L22.359,17.5c1.43-0.824,1.43-2.175,0-3L11.166,8.037c-1.429-0.826-2.598-0.15-2.598,1.5v12.926C8.568,24.113,9.737,24.789,11.166,23.963z',
  makePlayer: function(){
    var playerD3 = gameBoardD3
      .append('svg:path')
      .attr('fill', this.fill)
      .attr('d', this.path)
      .attr('stroke', this.strokeColor)
      .attr('stroke-width', this.strokeWidth)
      .attr('transform', 'translate(' + this.x.toString()+','+ this.y.toString()+')')
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
  },
  randomPosition : function(){
    var result = [];
    for(var i =0; i < this.amount;i++){
      result.push([Math.random()*gameBoard.width, Math.random()*gameBoard.height])
    }
    return result;
  },
  move: function(){
    gameBoardD3.selectAll('circle')
      .data(this.randomPosition())
      .transition().duration(500)
      .attr('r', 10)
      .attr('cx', function(x){return x[0]})
      .attr('cy', function(y){return y[1]})
  }
};


// make game board
var gameBoardD3 =
  d3.select('body').select('.gameBoard')
  .append('svg')
  .style('background-color', gameBoard.color)
  .style('width', gameBoard.width+'px')
  .style('height', gameBoard.height+'px')

player.makePlayer()
enemy.generate()
setInterval(function(){
  enemy.move()
},1000);
// var move = function(){
//   d3.select('gameBoardD3').select("circle")
//     .data([Math.random()*this.height])
//     .transition().duration(1000)
//     .attr("this.cy",  function(h){
//       return h
//     })
// }









