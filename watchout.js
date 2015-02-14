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
  x: gameBoard.width/2,
  y: gameBoard.height/2,
  angle: 0,
  path: 'M24.861,4.485C23.62,2.416,20.556,0,16.004,0c-4.554,0-7.62,2.416-8.862,4.485C4.146,9.474,2.001,31.99,2,32c2.33-0.003,2.332-2,4.665-2c2.334,0,2.334,2,4.668,2s2.334-2,4.669-2h0.002h0.002c2.334,0,2.334,2,4.667,2s2.333-2,4.665-2s2.334,1.997,4.662,2C29.999,31.99,27.854,9.474,24.861,4.485zM10.004,15c-1.104,0-2-0.896-2-2s0.896-2,2-2s2,0.896,2,2S11.108,15,10.004,15zM22.004,15c-1.104,0-2-0.896-2-2s0.896-2,2-2s2,0.896,2,2S23.108,15,22.004,15z',
  makePlayer: function(){
    var playerD3 = gameBoardD3
      .append('svg:path')
      .attr('class', 'hero')
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
      .attr('class', 'enemy')
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
      .transition().duration(2000)
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

var drag = d3.behavior.drag()
  .on("drag", function(d,i) {
    console.log("clicked")
    console.log(player.x, player.y)
    player.x += d3.event.dx
    player.y += d3.event.dy
    // might be a prob w collision
    d3.select(this).attr("transform", function(){
        return "translate(" + [ player.x,player.y ] + ")"
    })
  });

player.makePlayer()
enemy.generate()
setInterval(function(){
  enemy.move();
},2500);

d3.select(".hero")
  .call(drag);

var data = d3.selectAll(".enemy")
console.log(data);

var collision = function(){
var distance = Math.sqrt(Math.pow(player.x-enemy.cx(), 2) + Math.pow(player.y-enemy.cy(), 2));
  console.log('playerx: '+ player.x)
  console.log('playery: '+ player.y)
  console.log('enemycx: '+ enemy.cx())
  console.log('enemycy: '+ enemy.cy())

  if(distance < 100){
    console.log("HIT")
  } else {
    console.log("MISS")
  }

}
