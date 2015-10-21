var ctx = document.getElementById("canvas").getContext("2d");

//摇色子的类
var Dice = function(ctx, config){
	this.ctx = ctx;
	this.x = config.x;			//色子的起始横坐标
	this.y = config.y;			//色子起始纵坐标
	this.width = config.width;	//色子宽度
	this.height = config.height;	//色子高度
	this.dotWidth = config.dotWidth;	//点的半径
	this.timer = null;
	this.init();
}
Dice.prototype = {
	init: function(){
		this.ctx.lineWidth = 5;
		this.ctx.strokeStyle = "#009966";
		this.ctx.strokeRect(this.x, this.y, this.width, this.height);
		this.ctx.fillStyle = "#009966";
		this.drawDice();
	},
	clearRect: function(){
		var sp = this.dotWidth/2;
		this.ctx.clearRect(this.x+sp, this.y+sp, 
			this.width-this.dotWidth, this.height-this.dotWidth);
	},
	getRandomDot: function(){
		return 1 + Math.floor(Math.random()*6);
	},
	getRandomRatio: function(){
		var dot = this.getRandomDot(),
			ratios = {
			1: [{x: 0.5, y: 0.5}],
			2: [{x: 0.5, y: 0.25},
				{x: 0.5, y: 0.75}],
			3: [{x: 0.25, y: 0.25},
				{x: 0.5, y: 0.5},
				{x: 0.75, y: 0.75}],
			4: [{x: 0.25, y: 0.25},
				{x: 0.25, y: 0.75},
				{x: 0.75, y: 0.25},
				{x: 0.75, y: 0.75}],
			5: [{x: 0.25, y: 0.25},
				{x: 0.25, y: 0.75},
				{x: 0.75, y: 0.25},
				{x: 0.75, y: 0.75},
				{x: 0.5, y: 0.5}],
			6: [{x: 3/8, y: 0.25},
				{x: 5/8, y: 0.25},
				{x: 3/8, y: 0.5},
				{x: 5/8, y: 0.5},
				{x: 3/8, y: 0.75},
				{x: 5/8, y: 0.75}]
		};
		this.dot = dot;
		return ratios[dot];
	},
	drawDice: function(){
		this.clearRect();
		var dotRatio = this.getRandomRatio();
		var ctx = this.ctx;
		dotRatio.map(function(ratio, index){
			ctx.beginPath();
			ctx.arc(this.x+ratio.x*this.width, 
				this.y+ratio.y*this.height, 
				this.dotWidth, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fill();
		}.bind(this))
	},
	randowDraw: function(){
		var time = 100, x = 0;
		var self = this;
		return new Promise(function(resolve, reject){
			self.timer = setInterval(function(){
				x = x + 20;
				time = -24*x*x + 18 * x + 1000000;
				self.drawDice();
				if(time < 0){
					clearInterval(self.timer);
					self.timer = null;
					resolve(self.dot);
				}
			}, time);
		});
	}
}

var dice1 = new Dice(ctx, {
	x: 50,
	y: 50,
	height: 100,
	width: 100,
	dotWidth: 6
});

var dice2= new Dice(ctx, {
	x: 300,
	y: 50,
	height: 100,
	width: 100,
	dotWidth: 6
});

//摇色子
function runRandomDice(){
	var result = document.getElementById("result");
	result.innerHTML = "计算中···"; 
	Promise.all([dice1.randowDraw(),dice2.randowDraw()]).then(function(){
		var dot = dice1.dot + dice2.dot;
		result.innerHTML = dot; 
	});
}


runRandomDice();