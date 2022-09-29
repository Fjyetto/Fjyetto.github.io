const Dates = new Set([
26 + 11*31,
30 + 8 *31,
2  + 9 *31 ]);

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
	constructor(img,Pos,Vel){
		this.Image = img
		this.Position = Pos
		this.Velocity = Vel
	}
	Update(){
		this.Position = this.Position.Add(this.Velocity);
	}
	Draw(){
		// why wont this work
		ctx.drawImage(this.Image,60,this.Position[1]);
		//ctx.drawImage(this.Image,this.Position[0],this.Position[1]);
	}
}

document.addEventListener("DOMContentLoaded", function(event) { 

	//ASSETS
	const bR = document.getElementById("bR");
	const bG = document.getElementById("bG");
	const bB = document.getElementById("bB");
	const balngs = [bR,bG,bB];

	const c = document.getElementById("jo");
	const canvas = document.getElementById("bg");
	const w = canvas.width;
	const h = canvas.height;
	var Balons = [];
	
	ctx = canvas.getContext("2d");
	
	function nowYet(){
		let d = new Date();
		//return d.getDate()==26 && d.getMonth()==11;
		return Dates.has(d.getDate()+d.getMonth()*31);
	}
	
	function draw(){
		Balons.forEach((b,i)=>{
			//b.Update();
			//b.Draw();
		});
		
		ctx.drawImage(bR,60,40);
		
		ctx.fillStyle = "#386FA7";
		ctx.fillRect(0,0,w,h);
		ctx.fillStyle = "white";
		ctx.fillRect(5,Math.random()*20,20,20);
		window.requestAnimationFrame(draw);
	}
	if (nowYet()){
		c.innerHTML = "Birthday!";
		for (let i=0; i<900; i++){
			console.log("oops balong");
			//Balons.push(new Sprite(balngs[Math.floor(Math.random()*3)],new Vector2(Math.random()*w,Math.random()*20+h), new Vector2(0,-2)));
			Balons.push(new Sprite(bR,new Vector2(60,30), new Vector2(0,-2)));
		}
		draw();
	}
});