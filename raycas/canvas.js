const Map = [
"#################",
"#      # #   #  #",
"#    # # # #    #",
"#    # # # ###  #",
"#    # # ### ####",
"#    #          #",
"#################"];

var ctx = null;

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
const speed = 0.005
const FOV = 70;
var RL = {};

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
	Player.Velocity=Player.Velocity.Multiply(.86);
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
}

function ray(origin,angle,max,incr){
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
	
	function gameLoop(){
		update();
		//draw
		
		ctx.clearRect(0, 0, 480, 360);
		
		Map.forEach((S,Y) => {
			for (let X = 0; X < S.length; X++){
				if (S[X]=="#"){
					ctx.fillRect(X*4,Y*4,4,4);
				}
			}
		})
		
		/*ctx.beginPath();
		ctx.moveTo(Player.Position[0]*4+Math.sin(Player.Direction+1.4)*2,Player.Position[1]*4+Math.cos(Player.Direction+1.4)*2);
		ctx.lineTo(Player.Position[0]*4+Math.sin(Player.Direction)*7,Player.Position[1]*4+Math.cos(Player.Direction)*7);
		ctx.moveTo(Player.Position[0]*4+Math.sin(Player.Direction+1.4)*-2,Player.Position[1]*4+Math.cos(Player.Direction+1.4)*-2);
		ctx.lineTo(Player.Position[0]*4+Math.sin(Player.Direction)*7,Player.Position[1]*4+Math.cos(Player.Direction)*7);
		ctx.closePath();
		ctx.stroke();*/
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
		
		//if (on) setTimeout(gameLoop,10,ctx);
		if (on) window.requestAnimationFrame(gameLoop);
	}

	setTimeout(gameLoop,10);
});