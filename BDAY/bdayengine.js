const Dates = new Set([
26 + 11*31,
30 + 8 *31,
1  + 9 *31 ]);

let ctx = null;

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
  Div(other){
	if (typeof(other)=="number"){
		return this.map(x => x/other)
	}else{
		if (typeof(other)=="object"){
			return this.map((e, i) => e / other[i]);
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

class Sprite{
	constructor(img,Pos,Vel,f,e){
		this.Image = img;
		this.Position = Pos;
		this.Velocity = Vel;
		this.CustomCode = f;
		this.Extra = e;
	}
	Update(){
		this.Velocity = this.Velocity.Multiply(.98);
		this.Position = this.Position.Add(this.Velocity);
		this.CustomCode(this);
	}
	Draw(){
		// why wont this work
		ctx.drawImage(this.Image,this.Position[0],this.Position[1]);
		//ctx.drawImage(this.Image,this.Position[0],this.Position[1]);
	}
}

function tick(){
	return (new Date().getTime());
}

let mousePosition = new Vector2(0,0);
let lastMove = tick();
let mouseVelocity = new Vector2(0,0);

function findObjectCoords(mouseEvent)
{
	var obj = document.getElementById("bg");
	var obj_left = 0;
	var obj_top = 0;
	let pos = new Vector2(0,0);
	while (obj.offsetParent)
	{
		obj_left += obj.offsetLeft;
		obj_top += obj.offsetTop;
		obj = obj.offsetParent;
	}
	if (mouseEvent)
	{
		//FireFox
		pos[0] = mouseEvent.pageX;
		pos[1] = mouseEvent.pageY;
	}
	else
	{
		//IE
		pos[0] = window.event.x + document.body.scrollLeft - 2;
		pos[1] = window.event.y + document.body.scrollTop - 2;
	}
	pos[0] -= obj_left;
	pos[1] -= obj_top;
	
	mouseVelocity = pos.Sub(mousePosition).Unit.Multiply(1/(tick()-lastMove));
	lastMove = tick();
	mousePosition = pos;
	return pos;
}

document.addEventListener("DOMContentLoaded", function(event) { 

	//ASSETS
	const bR = document.getElementById("bR");
	const bG = document.getElementById("bG");
	const bB = document.getElementById("bB");
	const bPY = document.getElementById("bPY");
	const bPP = document.getElementById("bPP");
	const bCB = document.getElementById("bCB");
	const balngs = [bR,bG,bB,bPY,bPP,bCB];

	const c = document.getElementById("jo");
	const canvas = document.getElementById("bg");
	
	let Balons = [];
	window.onmousemove = findObjectCoords;
	
	ctx = canvas.getContext("2d");
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	
	const w = canvas.width;
	const h = canvas.height;
	
	function nowYet(){
		let d = new Date();
		//return d.getDate()==26 && d.getMonth()==11;
		return Dates.has(d.getDate()+d.getMonth()*31);
	}
	
	function draw(){
		ctx.fillStyle = "#386FA7";
		ctx.fillRect(0,0,w,h);
		ctx.fillStyle = "white";
		ctx.fillRect(5,Math.random()*20,20,20);
		
		Balons.forEach((b,i)=>{
			b.Update();
			b.Draw();
		});
		
		window.requestAnimationFrame(draw);
	}
	if (nowYet()){
		c.innerHTML = "Birthday!";
		for (let i=0; i<900; i++){
			console.log("oops balong");
			Balons.push(new Sprite(balngs[Math.floor(Math.random()*6)],new Vector2(Math.random()*w,Math.random()*100+h+Math.random()*h), new Vector2(Math.random()-.5,-2),function(me){
				me.Velocity = me.Velocity.Add(new Vector2((Math.random()-.5)*.1,(Math.random()-.5)*.1)-2)
				if (me.Position.Sub(mousePosition).Magnitude<100){
					me.Velocity = me.Velocity.Add(me.Position.Sub(mousePosition).Unit.Multiply(0.12).Add(mouseVelocity.Multiply(.02)));
				}
			}));
			let Jo = new Vector2(Math.random()*w,Math.random()*h)
			Balons.push(new Sprite(balngs[Math.floor(Math.random()*6)],Jo, new Vector2(Math.random()-.5,0),function(me){
				me.Velocity = me.Velocity.Add(me.Extra.Sub(me.Position).Unit.Multiply(0.01))
				if (me.Position.Sub(mousePosition).Magnitude<100){
					me.Velocity = me.Velocity.Add(me.Position.Sub(mousePosition).Unit.Multiply(0.12).Add(mouseVelocity.Multiply(.02)));
				}
			},Jo));
			//Balons.push(new Sprite(bG,new Vector2(60,30), new Vector2(0,-2)));
		}
		draw();
	}
});