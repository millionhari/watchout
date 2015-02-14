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
  color: 'black'
};

var gameStats = {
  highScore: 0,
  currentScore: 0,
  collisions: 0
};

var player = {
  fill: 'white',
  strokeColor: "white",
  strokeWidth: .4,
  x: 450,
  y: 250,
  angle: 0,
  path: 'M31.501,1.098c-0.782-1.125-2.375-1.416-4.249-0.716L2.583,9.46C1.2,9.97-0.182,10.647,0.02,11.809c0.209,1.154,1.744,1.311,3.215,1.311h11.256c2.42,0,4.388,1.968,4.388,4.386V28.76c0,0.966,0,3.231,1.517,3.236c0.841,0,1.458-0.749,2.133-2.586l9.086-24.669C32.307,2.854,31.94,1.717,31.501,1.098zM29.851,4.093L20.77,28.762c-0.009,0.016-0.009,0.026-0.018,0.04c0-0.014,0-0.029,0-0.042V17.505c0-3.455-2.805-6.265-6.262-6.265H3.235c-0.018,0-0.035,0-0.062,0c0.023-0.005,0.036-0.013,0.059-0.021l24.665-9.078c0.993-0.366,1.808-0.351,2.067,0.031C30.209,2.518,30.168,3.237,29.851,4.093z',
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
  fill: 'grey',
  strokeColor: "white",
  strokeWidth: 2,
  shape: 'circle',
  cy: function(){
    return Math.random()*gameBoard.height
  },
  cx:function(){
    return Math.random()*gameBoard.width
  },
  r: 10,
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
      .transition().duration(1500)
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
},2000);
// var move = function(){
//   d3.select('gameBoardD3').select("circle")
//     .data([Math.random()*this.height])
//     .transition().duration(1000)
//     .attr("this.cy",  function(h){
//       return h
//     })
// }









