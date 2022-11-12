var on = false;

function rad(deg)
{
  return deg*(Math.PI/180);
}
function mod(x, m) {
	return (x%m + m)%m;
}
function arrayRemove(arr, value) { 
	return arr.filter(function(ele){ 
		return ele != value; 
	});
}

function tick(){
	return (new Date().getTime());
}

function dist(x1,x2,y1,y2){
	return Math.sqrt((x1 - x2)**2+(y1- y2)**2); 
}

function within(n,l,w){
	return n>l && n<l+w
}

let secondsPassed = 0;
let oldTimeStamp = 0;
let attackState = 0;

class Particle{
	constructor(X,Y,VX,VY,E,C,CPX,G,Life){
		this.X = X;
		this.Y = Y;
		this.VX = VX;
		this.VY = VY;
		this.FS = C;
		this.GX = CPX;
		this.G = G;
		this.E = E;
		this.Death = tick()+Life;
	}
	update(){
		this.X+=this.VX*secondsPassed;
		this.Y+=this.VY*secondsPassed;
		this.VX*=this.E;
		this.VY*=this.E;
		this.VX+=this.GX*secondsPassed;
		this.VY+=this.G*secondsPassed;
	}
}

document.addEventListener("DOMContentLoaded", function(event) { 
	const butt = document.getElementById("StartButton");
	const OwSfx = document.getElementById("OwSfx");
	const GMS = document.getElementById("GMMusic");
	const WSfx = document.getElementById("WSfx");
	const Ow2Sfx = document.getElementById("Ow2Sfx");
	const titlescreen = document.getElementById("titles");
	
	const c = document.getElementById("poo");
	const ctx = c.getContext("2d");
	
	ctx.drawImage(titlescreen,0,0);
	
	const img = document.getElementById("trof");
	const plri = document.getElementById("hom");
	const hbar = document.getElementById("hbar");
	const pw = plri.naturalWidth;
	const ph = plri.naturalHeight;
	const str = document.getElementById("star");
	const proj = document.getElementById("proj");
	const skull = document.getElementById("skull");
	const loser = document.getElementById("loser");
	const winner = document.getElementById("winner");
	const homerpalette = ["#7F5841","#FCC349","#FCBD50","#66A8F9","#4F8BF9","#F9FBFF","#FFFFFF","#66432E"];
	const troolpalette = ["#7F0000","#FF0000"];
	
	const DC = document.getElementById("DCount");
	const BHC = document.getElementById("BHCount");
	const LC = document.getElementById("Lives");
	
	var strr = document.getElementById("starb");
	var StarsL1 = [[2,2],[25,53],[50,72],[120,140]];
	var StarsL2 = [];
	var DONGS = [];
	var Particles = [];
	
	var kht = [false,false,false];
	
	var dir = 0;
	var x=0;
	var y=17;
	var pvx=0;
	var px=0;
	var py=0;
	
	var ls=0;
	var PlayerOuch = false;
	var LastPO = 0;
	var EnemOuch = false;
	var LastEO = 0;
	var LastShoot = 0;
	
	var Lives = 5;
	var BH = 50;
	var Start = tick();
	
	function off(){
		on = false;
		butt.innerHTML = "Start";
		document.getElementById("Music").pause();
		
		dir = 0;
		x=0;
		y=17;
		pvx=0;
		px=0;
		py=0;
	
		ls=0;
		PlayerOuch = false;
		LastPO = 0;
		EnemOuch = false;
		LastEO = 0;
		LastShoot = 0;
		
		DONGS = []
	
		Lives = 5;
		BH = 50;
	}
	
	butt.onclick = function(){
		if (on==false){
			Start = tick();
			on = true;
			loop();
			butt.innerHTML = "Reset";
			window.requestAnimationFrame(loop);
			GMS.pause();
			document.getElementById("Music").currentTime = 0;
			document.getElementById("Music").play();
			document.getElementById("Music").loop = true;
		}else{
			off();
			ctx.drawImage(titlescreen,0,0);
		}
	};
	
	for (let i = 0; i < 36; i++) {
		StarsL1[i+3]=[i*16,Math.random()*240]
		StarsL2[i]=[i*16,Math.random()*240]
	} 
	
	function update(progress) {
		if (Lives<=0){
			off();
			GMS.currentTime = 0;
			GMS.play();
			ctx.drawImage(loser,0,0)
		}
		if (BH<=0){
			off();
			WSfx.play();
			ctx.drawImage(winner,0,0)
		}
		LC.innerHTML = "Lives: "+Lives;
		BHC.innerHTML = "Boss Health: "+BH;
		DC.innerHTML = "Timer: "+Math.floor((tick()-Start)/100)/10;
		
		if (kht[0]){
			pvx+=48*secondsPassed;
		}
		if (kht[1]){
			pvx-=48*secondsPassed;
		}
		if (kht[2] && tick()-LastShoot>100){
			LastShoot = tick();
			DONGS.push([px+10,153,0,1.7,tick(),proj,"Player"]);  //DONGS 0 = X 1 = Y 2 = VX 3 = G 4 = TimeCreated 5 = Image 6 = Type
		}
		dir=dir+Math.cos(new Date().getTime()*0.00002)*.003
		pvx=pvx*.86;
		px=px+pvx;
		if (EnemOuch==false){
			x=Math.cos(new Date().getTime()*0.002)*120+155;
			y=17;
		}else{
			if (tick()-LastEO>120){
				BH = BH-1
				LastEO = tick();
				EnemOuch = false;
			}
			x = Math.cos(tick()*0.002)*120+155 + Math.random()*5;
			y = 17+Math.random()*5;
		}
		if (PlayerOuch==false){
			py = 155+Math.cos(tick()*0.006)*4;
		}else{
			if (tick()-LastPO>120){
				LastPO = tick();
				PlayerOuch = false;
				Lives = Lives-1
			}
			py = 155+Math.cos(tick()*0.006)*4+Math.random()*4-2;
			px = px+Math.random()*4-2;
		}
		if (px<-30)
			px=329
		else if (px>329)
			px=-30
		for (s of StarsL1) {
			//console.log(s[0])
			s[0]+=Math.sin(dir);//.5
			s[1]+=Math.cos(dir);//2
		} 
		for (s of StarsL2) {
			s[0]+=Math.sin(dir)*.4;//.25
			s[1]+=Math.cos(dir+.12)*.4;//.8
		} 
		DONGS.forEach((s,index) => {  //DONGS 0 = X / 1 = Y / 2 = VX / 3 = G / 4 = TimeCreated / 5 = Image / 6 = Type
			s[1]-=s[3]*secondsPassed*48;
			s[0]+=s[2]*secondsPassed*48;
			s[2]*=.998;
			s[3]=s[3]*1.02;
			if ((tick()-s[4])>10000){
				//arrayRemove(DONGS,s);
				DONGS.splice(index,1);
			}
			if ( (y-s[1])**2 < 40 && within(s[0],x,55) && tick()-LastEO>200 && s[6]=="Player" && EnemOuch==false){ // TROOL HIT
				EnemOuch = true;
				
				for (let i = 0; i < 8; i++) {
					Particles.push(new Particle(x+pw/2+(Math.random()-.5)*pw*.5,y+ph/2+(Math.random()-.5)*ph*.5,(Math.random()-.5)*180,(Math.random()-.5)*150-250,.98,troolpalette[Math.floor(Math.random()*troolpalette.length)],Math.sin(rad((i-1)*5+90))*100,2800,4000));
				}
				
				Ow2Sfx.play();
				LastEO = tick();
				DONGS.splice(index,1);
				console.log("yes");
			}
			if ( (py- s[1])**2 < 40 && within(s[0],px,57) && tick()-LastPO>200 && s[6]=="Enemy" && PlayerOuch==false){ // PLAYER HIT
				PlayerOuch = true;
				
				for (let i = 0; i < 18; i++) {
					/*Particles.push(new Particle(px+pw/2,py+ph/2,Math.sin(rad((i-1)*5+90))*(70+Math.random()*20)+Math.random()*10,-5+Math.cos(rad(i*5+90))*(260+Math.random()*80)+Math.random()*50-380,.975,"#FF0002",Math.sin(rad((i-1)*5+90))*1000,2800,4000));
					Particles.push(new Particle(px+pw/2,py+ph/2,Math.sin(rad((i-1)*5+90))*(73+Math.random()*20)+Math.random()*10,-5+Math.cos(rad(i*5+90))*(275+Math.random()*80)+Math.random()*50-390,.98,"#FC0522",Math.sin(rad((i-1)*5+90))*800,2800,4000));*/
					Particles.push(new Particle(px+pw/2+(Math.random()-.5)*pw*.2,py+ph/2+Math.cos(rad(i*10+90))*15,Math.sin(rad((i-1)*10+90))*(74+Math.random()*20)+Math.random()*10,Math.random()*100-600,.99,"#F92A3B",0,2800,4000));
					Particles.push(new Particle(px+pw/2+(Math.random()-.5)*pw*.5,py+ph/2+(Math.random()-.5)*ph*.5,Math.sin(rad((i-1)*10+90))*(70+Math.random()*20)+Math.random()*10,-5+Math.cos(rad(i*10+90))*(260+Math.random()*80)+Math.random()*50-300,.98,homerpalette[Math.floor(Math.random()*homerpalette.length)],Math.sin(rad((i-1)*10+90))*100,2800,4000));
				}
				
				OwSfx.play();
				LastPO = tick();
				DONGS.splice(index,1);
				console.log("no!");
			}
		})
		Particles.forEach((P,index) => {
			P.update();
			if (tick()-P.Death>0){
				Particles.splice(index,1);
			}
		});
		
		switch (attackState){
			case 0:
				if ((tick()-ls)>Math.random()*800+200){
					ls = tick();
					DONGS.push([x,15,0,-3.6,tick(),skull,"Enemy"]); //DONGS 0 = X 1 = Y 2 = VX 3 = G 4 = TimeCreated 5 = Image 6 = Type
				}
				break;
			case 1:
				if ((tick()-ls)>400){
					ls = tick();
					DONGS.push([x,15,(px-x)*.03,-3.6+(py-y)*-.01,tick(),skull,"Enemy"]); //DONGS 0 = X 1 = Y 2 = VX 3 = G 4 = TimeCreated 5 = Image 6 = Type
				}
				break;
			case 2:
				if ((tick()-ls)>800){
					ls = tick();
					DONGS.push([x,15,0,-3.6,tick(),skull,"Enemy"]);
					DONGS.push([x,15,3,-3.6,tick(),skull,"Enemy"]);
					DONGS.push([x,15,-3,-3.6,tick(),skull,"Enemy"]);
				}
				break;
			case 3:
				if ((tick()-ls)>1000){
					ls = tick();
					for (let i=0;i < 20; i++){
						DONGS.push([x,15-i*8,0,-3.6,tick(),skull,"Enemy"]);
						DONGS.push([x,15-i*8+4,0,-4,tick(),skull,"Enemy"]);
						DONGS.push([x,15-i*8+8,0,-4.4,tick(),skull,"Enemy"]);
					}
				}
				break;
		}
		/* if ((tick()-ls)>Math.random()*800+200){
			ls = tick();
			DONGS.push([x,15,-3.6,tick(),skull,"Enemy"]); //DONGS 0 = X 1 = Y 2 = G 3 = TimeCreated 4 = Image 5 = Type
		} */
		//if (on==true) setTimeout(update,20);
	}
	
	function draw() {
		
		// -*-*-*-*-*-*-*-*-*- DRAWINGS!!!!!
		
		//ctx.fillStyle='rgba(10,28,48,.06)';
		//ctx.fillRect(0,0,360,240);
		if (on==false) return;
		
		// star render layer 2
		for (s of StarsL2) {
			ctx.drawImage(strr,mod(s[0],360),mod(s[1],240));
		} 
	
		//ctx.fillStyle='rgba(10,28,48,.1)';
		ctx.fillStyle='rgba(10,28,48,.3';
		ctx.fillRect(0,0,360,240);
		
		// star render layer 1
		for (s of StarsL1) {
			ctx.drawImage(str,mod(s[0],360),mod(s[1],240));
		} 
		
		// projectile render
		for (s of DONGS) {
			ctx.drawImage(s[5],s[0],s[1]);
		} 
		
		// draw the enemy
		ctx.drawImage(img,x,y);
		
		// draw the player
		ctx.drawImage(plri,px,py);
		if (px>300 || px<0){
			ctx.drawImage(plri,px-360,py);
			ctx.drawImage(plri,px+360,py);
		}
		
		// particle render
		Particles.forEach((P,index) => {
			ctx.fillStyle = P.FS;
			ctx.fillRect(P.X,P.Y,3,3);
		});
		
		ctx.fillStyle='#8C6C13';
		ctx.fillRect(9,3,342,9);
		ctx.fillStyle='#CC0000';
		ctx.fillRect(10,4,340,7);
		ctx.fillStyle = '#FF0000';
		ctx.fillRect(10,4,340*(BH/50),7);
		ctx.drawImage(hbar,10+340*(BH/50),3);
		
		
		//if (on==true) window.requestAnimationFrame(draw);
	}
	
	function loop(timeStamp) {
		/*var progress = timestamp - lastRender;

		update(progress);
		if (on==true) draw();

		lastRender = timestamp;
		if (on==true){
			window.requestAnimationFrame(loop);
		}*/
<<<<<<< HEAD
		if (on==true) window.requestAnimationFrame(loop);
=======
>>>>>>> 67935bd7e47787d926a3b6621c16c9f35d09c156
		
		secondsPassed = (timeStamp - oldTimeStamp) / 1000;
		oldTimeStamp = timeStamp;
		
		if (on==true){
			draw();
			update(secondsPassed);
<<<<<<< HEAD
		}
	}
	
	document.addEventListener('keydown',function(e){
=======
			window.requestAnimationFrame(loop);
		}
	}
	
	document.addEventListener('keypress',function(e){
>>>>>>> 67935bd7e47787d926a3b6621c16c9f35d09c156
		if (e.code=="KeyD"){
			//pvx=pvx+1;
			kht[0]=true;
		}
		if (e.code=="KeyJ"){
			//DONGS.push([px+10,153,1.7,new Date().getTime(),proj,"Player"]);
			kht[2]=true;
		}
		if (e.code=="KeyA"){
			//pvx=pvx-1;
			kht[1]=true;
		}
	});
	
	document.addEventListener('keyup',function(e){
		if (e.code=="KeyD"){
			//pvx=pvx+1;
			kht[0]=false;
		}
		if (e.code=="KeyJ"){
			kht[2]=false;
		}
		if (e.code=="KeyA"){
			//pvx=pvx-1;
			kht[1]=false;
		}
	});
	
});