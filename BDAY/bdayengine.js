const Dates = new Set([
26 + 11*31,
30 + 8 *31,
1  + 9 *31,
19  + 11 *31,
11  + 11 *31,
27  + 11 *31,
17  + 8 *31,
17  + 4 *31,
1 + 2*31,
29 + 4*31 ]);

const Names = new Map();
Names.set(1 + 2*31,'poccu4!! !');
Names.set(17 + 4*31,'MUSHROOM KINGTOM');
Names.set(29 + 4*31,'vc cat');

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
		this.Off = new Vector2(img.naturalWidth/2,img.naturalHeight/2)
		this.Position = Pos;
		this.Velocity = Vel;
		this.CustomCode = f;
		this.Extra = e;
	}
	Update(){
		//this.Velocity = this.Velocity.Multiply(.98);
		this.Velocity = this.Velocity.Sub(this.Velocity.Unit.Multiply(.002))
		this.Velocity = this.Velocity.Multiply(.992);
		this.Position = this.Position.Add(this.Velocity);
		this.CustomCode(this);
	}
	Draw(){
		// bozo
		ctx.drawImage(this.Image,this.Position[0]-this.Off[0],this.Position[1]-this.Off[1]);
		//ctx.drawImage(this.Image,this.Position[0],this.Position[1]);
	}
}

function tick(){
	return (new Date().getTime());
}

let mousePosition = new Vector2(0,0);
let mouseClick = false;
let lastMove = tick();
let mouseVelocity = new Vector2(0,0);
let partyin = false;
let crediting = false;

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

function showC(){
	const creds = document.getElementById("creds");
	crediting = !crediting;
	console.log("SHONG");
	if (crediting==false){
		creds.style.visibility = "hidden";
	}else{
		creds.style.visibility = "visible";
	}
}

document.addEventListener("DOMContentLoaded", function(event) { 

	//ASSETS
	const bR = document.getElementById("bR");
	const bG = document.getElementById("bG");
	const bB = document.getElementById("bB");
	const bPY = document.getElementById("bPY");
	const bPP = document.getElementById("bPP");
	const bCB = document.getElementById("bCB");
	const cak1 = document.getElementById("cak1");
	const cak2 = document.getElementById("cak2");
	const balngs = [bR,bG,bB,bPY,bPP,bCB];

	const c = document.getElementById("jo");
	const canvas = document.getElementById("bg");
	
	let Balons = [];
	let theJ = [];
	window.onmousemove = findObjectCoords;
	/*document.mousedown = function(){
		console.log("gadm")
		mouseClick = true;
	};*/
	
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
	
	function update(){
		Balons.forEach((b,i)=>{
			b.Update();
		});
		
		theJ.forEach((s,i)=>{
			s.Update();
		});
		setTimeout(update,10);
	}
	
	function draw(){
		ctx.fillStyle = "#386FA7";
		ctx.fillRect(0,0,w,h);
		
		Balons.forEach((b,i)=>{
			b.Draw();
		});
		
		theJ.forEach((s,i)=>{
			s.Draw();
		});
		
		window.requestAnimationFrame(draw);
	}
	
	window.party = function(){
		if (partyin==true){
			return;
		}
		partyin = true;
		console.log("we are partyin");
		for (let i=0; i<900; i++){
			console.log("oops balong");
			let Jo = new Vector2(Math.random()*w,Math.random()*h)
			Balons.push(new Sprite(balngs[Math.floor(Math.random()*6)],new Vector2(w*.5,Math.random()*100+h+Math.random()*h), new Vector2((Math.random()-.5)*3,-7+Math.random()*.5),function(me){
				me.Velocity = me.Velocity.Add(me.Extra.Sub(me.Position).Unit.Multiply(0.01)).Add(new Vector2((Math.random()-.5)*.1,(Math.random()-.5)*.1))
				if (me.Position.Sub(mousePosition).Magnitude<100 && !mouseClick){
					me.Velocity = me.Velocity.Add(me.Position.Sub(mousePosition).Unit.Multiply(0.12).Add(mouseVelocity.Multiply(.02)));
				}else if (me.Position.Sub(mousePosition).Magnitude<150 && mouseClick) {
					me.Velocity = me.Velocity.Add(me.Position.Sub(mousePosition).Unit.Multiply(-0.12).Add(mouseVelocity.Multiply(.02)));
				}
				/*Balons.forEach((b,i)=>{ COLLISION O_O
					if (b!=me && me.Position.Sub(b.Position).Magnitude<20){
						me.Velocity = me.Velocity.Add(me.Position.Sub(b.Position).Unit.Multiply(0.06));
					}
				});*/

			},Jo));
			//Balons.push(new Sprite(bG,new Vector2(60,30), new Vector2(0,-2)));
		}
		update();
		draw();
	};
	
	if (nowYet()){
		//document.getElementById("tbar").append('<a class="creditsbutton" href="javascript:showC();"></a>')
		let ct = document.createElement('a')
		ct.className = "creditsbutton"
		ct.href = "javascript:showC();"
		document.getElementById("tbar").append(ct);
		theJ.push(new Sprite(cak1,new Vector2(w*.25+30,-40),new Vector2(0,-2),function(me){
			if (me.Position.Sub(me.Extra).Magnitude>10){
				me.Velocity = me.Velocity.Add(me.Extra.Sub(me.Position).Unit.Multiply(0.1))
			}
			if (me.Position.Sub(mousePosition).Magnitude<100){
				me.Velocity = me.Velocity.Add(me.Position.Sub(mousePosition).Unit.Multiply(0.12).Add(mouseVelocity.Multiply(.01)));
			}
		},new Vector2(w*.25+30,h*.25)));
		console.log(theJ[0].Off);
		
		theJ.push(new Sprite(cak2,new Vector2(w*.75+30,-40),new Vector2(0,-2),function(me){
			if (me.Position.Sub(me.Extra).Magnitude>10){
				me.Velocity = me.Velocity.Add(me.Extra.Sub(me.Position).Unit.Multiply(0.1))
			}
			if (me.Position.Sub(mousePosition).Magnitude<100){
				me.Velocity = me.Velocity.Add(me.Position.Sub(mousePosition).Unit.Multiply(0.12).Add(mouseVelocity.Multiply(.01)));
			}
		},new Vector2(w*.75+30,h*.25)));
		
		let bottomtext = 'To someone i know.';
		let d = new Date();
		if (Names.get(d.getDate()+d.getMonth()*31)) bottomtext=Names.get(d.getDate()+d.getMonth()*31)
		
		c.innerHTML = '<a href=\"javascript:document.getElementById(\'thanks\').play();window.party();\"><img src="../media/birthda/happ.gif"></img></a><br><center>'+bottomtext+'</center>';
		
	}
});