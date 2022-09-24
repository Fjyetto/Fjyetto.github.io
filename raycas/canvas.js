const Map = [
"#################",
"#      #     #  #",
"#    # # # #    #",
"#    # # # # #  #",
"#    # # ### ####",
"#    #   #      #",
"#    #   ###### #",
"#    #          #",
"#################"];

var ctx = null;

function Rad(aDeg){
	return (aDeg*Math.PI)/180.0;
}

function Deg(aRad){
	return (aRad/Math.PI)*180.0;
}

class Vector2 extends Array {
  // example methods
  Add(other) {
    return this.map((e, i) => e + other[i]);
  }
  Sub(other) {
    return this.map((e, i) => e - other[i]);
  }
  get Neg(){
	return this.map(x => 0-x);
  }
  Multiply(other){
	if (typeof(other)=="number"){
		return this.map(x => x*other)
	}else{
		if (typeof(other)=="object"){
			return this.map((e, i) => e * other[i]);
		}
	}
  }
  get Magnitude(){
	return this.calcMag();
  }
  calcMag(){
	var J=0;
	this.forEach(function (e) {
	  J+=e*e;
	});
	return Math.sqrt(J);
  }
  get Unit(){
	  return this.calcUnit();
  }
  calcUnit(){
	var mag = this.calcMag();
	let u = new Vector2(this[0]/mag,this[1]/mag);
	return u;
  }
}

/* example usage
let v = new Vector2(3, 4);
console.log(v.toString());
console.log(v.Magnitude);*/

const on = true;
const resolutionX = 480;
const speed = 0.005
const FOV = 70;
var RL = {};
const Res = 120;
const Size = Math.ceil(480/Res);

var Controls = [false,false,false,false];
const KC2C = {
	68 : 0, //D
	83 : 1, //A
	81 : 2, //S
	90 : 3 //W
};

const Player = {
	Position : new Vector2(4,4),
	Velocity : new Vector2(0,0),
	Direction : 0
};

function update(){
	Player.Position=Player.Position.Add(Player.Velocity);
	if (Map[Math.floor(Player.Position[1])].charAt(Math.floor(Player.Position[0]))=="#"){
		Player.Position=Player.Position.Sub(Player.Velocity);
		Player.Velocity=Player.Velocity.Multiply(-.6);
	}else{
		Player.Velocity=Player.Velocity.Multiply(.86);
	}
	if (Controls[0]){
		console.log("brother");
		Player.Direction+=.02;
	}
	else
	if (Controls[2]){
		Player.Direction-=.02;
	}
	
	if (Controls[3]){
		Player.Velocity=Player.Velocity.Add(new Vector2(Math.sin(Player.Direction)*speed,Math.cos(Player.Direction)*speed));
	}
	else
	if (Controls[1]){
		Player.Velocity=Player.Velocity.Add(new Vector2(Math.sin(Player.Direction)*-speed,Math.cos(Player.Direction)*-speed));
	}
	if (on) setTimeout(update,10);
}

function ray(origin,angle,max,incr){
	// there is a much better and faster way to do this
	var cPos = new Vector2(origin[0],origin[1]);
	var t = 0;
	while ( t<max && (typeof Map[Math.floor(cPos[1])] != "undefined") && (Map[Math.floor(cPos[1])].charAt(Math.floor(cPos[0]))!="#")){
		cPos = cPos.Add(new Vector2(Math.sin(angle)*incr,Math.cos(angle)*incr));
		t=t+1
	}
	//console.log(cPos,origin);
	return [(cPos.Sub(origin).Magnitude),cPos];
}

document.addEventListener("DOMContentLoaded", function(event) { 
	var c = document.getElementById("gungers");
	ctx = c.getContext("2d");
	console.log("SEX!");
	document.addEventListener("keydown", (event) => {
		/*if (event.keyCode == 68){
			//Player.Direction+=3;
			Controls[0]=true;
			console.log("shit");
		}*/
		Controls[KC2C[event.keyCode]] = true;
	});
	document.addEventListener("keyup", (event) => {
		if (event.keyCode in KC2C) {
			Controls[KC2C[event.keyCode]] = false;
		}
	});
	
	function draw(){
		ctx.clearRect(0, 0, 480, 360);
		
		let Theta = Player.Direction-Rad(FOV)/2;
		for (let i=0; i<Res; i++){
			let Dist = ray(Player.Position,Theta,500,.01)[0];
			//let Len = Math.sqrt((1/Dist)*60000);
			//let dtM = Math.abs(i/Res-.5);
			let dtM = ((i/Res)-.5)**2;
			//let Len = Math.atan(Math.sqrt(1/Dist)*.2)*1000;
			let Len = Math.atan(Math.sqrt(1/Dist)*.2)*1000+(dtM*40)/Dist;
			ctx.fillStyle = 'rgb(10,'+ Math.floor((5.02-Dist)*53) + ','+ Math.floor(Len) +')';
			ctx.fillRect(i*Size,(360-Len)/2,Size,Len)
			Theta+= Rad(FOV)/Res
		}
		
		ctx.fillStyle = 'black'
		
		Map.forEach((S,Y) => {
			for (let X = 0; X < S.length; X++){
				if (S[X]=="#"){
					ctx.fillRect(X*4,Y*4,4,4);
				}
			}
		})
		
		ctx.fillStyle = 'red'
		ctx.fillRect(Player.Position[0]*4,Player.Position[1]*4,2,2);
		ctx.fillStyle = 'black'
		/*ctx.fillText(Player.Position[0]+", "+Player.Position[1],0,50);
		ctx.fillText(Math.floor(Player.Position[0])+", "+Math.floor(Player.Position[1]),0,80);
		*/
		const pack = ray(Player.Position,Player.Direction,1000,.01);
		let dis = pack[0]
		let P = pack[1]
		ctx.fillText(dis,0,110);
		ctx.fillStyle = 'cyan'
		ctx.fillRect(P[0]*4,P[1]*4,2,2)
		ctx.fillStyle = 'black'
		if (Map[Math.floor(Player.Position[1])].charAt(Math.floor(Player.Position[0]))=="#"){
			ctx.fillRect(460,0,20,20);
		}
		
		if (on) window.requestAnimationFrame(draw);
	}
	
	function gameLoop(){
		update(); // locked onto a timeout
		draw(); //FPS dependent
	}

	setTimeout(gameLoop,10);
});