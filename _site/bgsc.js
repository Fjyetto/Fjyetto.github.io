let start;

var loadImage = function (url) {
	var imge = new Image();
	imge.src = url
	return imge;
}

const beh = [0,1,2];
const cv = document.getElementById("cv");

let wk = false;
let sk = false;
let dk = false;
let ak = false;

document.addEventListener('keydown',function(e){
	switch (e.code){
		case 'KeyA':
			ak=true;
			break;
		case 'KeyW':
			wk=true;
			break;
		case 'KeyS':
			sk=true;
			break;
		case 'KeyD':
			dk=true;
			break;
	}
});
document.addEventListener('keyup',function(e){
	//console.log("bah!");
	switch (e.code){
		case 'KeyA':
			ak=false;
			break;
		case 'KeyW':
			wk=false;
			break;
		case 'KeyS':
			sk=false;
			break;
		case 'KeyD':
			dk=false;
			break;
	}
});

let pos = [0,0,0];
let movpos = [0,0,6];
let realpos = [0,0,0];

function da(x){
	let y = 3-x*2;
	if (x>1){
		y = 1.5-x*0.5;
	}
	return y
}
function adiv(nu,denu){
	//return nu/denu;
	
	if (denu>0){
		return nu*da(denu)
	}
	return -nu*da(-denu)
}
function ediv(ba,daba){
	let y = 2.71^(-daba+1)
	if (daba>0){
		y = 2.71^( daba+1)
	}
	return ba*y;
}

let parts = [];
let drawtd = true;

let mmx = 0;
let mmy = 0;
let click = false;
document.addEventListener("mousedown", (event) => {
	click = true;
});
document.addEventListener("mouseup", (event) => {
	click = false;
});
document.addEventListener('mousemove', function(event) {
    //console.log('Mouse X:', event.clientX, 'Mouse Y:', event.clientY);
    mmx=event.pageX;
    mmy=event.pageY;
});

var body = document.body,
    html = document.documentElement;

identity = (x) => x;

async function* makeTextFileLineIterator(fileURL) {
  const response = await fetch(fileURL);
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

  let { value: chunk, done: readerDone } = await reader.read();
  chunk = chunk || "";

  const newline = /\r?\n/gm;
  let startIndex = 0;

  while (true) {
    const result = newline.exec(chunk);
    if (!result) {
      if (readerDone) break;
      const remainder = chunk.substr(startIndex);
      ({ value: chunk, done: readerDone } = await reader.read());
      chunk = remainder + (chunk || "");
      startIndex = newline.lastIndex = 0;
      continue;
    }
    yield chunk.substring(startIndex, result.index);
    startIndex = newline.lastIndex;
  }

  if (startIndex < chunk.length) {
    // Last line didn't end in a newline char
    yield chunk.substring(startIndex);
  }
}

var loadModel = async function(url){
	let berts = [];
	let bedges = [];

	console.log("loading "+url);

	for await (const line of makeTextFileLineIterator(url)) {
		let r= line.split(" ");
		//console.log(r)
		switch (r[0]){
			case 'v':
			berts.push([parseFloat(r[1]),-parseFloat(r[2]),parseFloat(r[3])])
			break;
			case 'f':
			//console.log(r[1].split("/")[0]-1)
			bedges.push([
				r[1].split("/")[0]-1,
				r[2].split("/")[0]-1
			])
			/*bedges.push([
				r[1].split("/")[0]-1,
				r[3].split("/")[0]-1
			])*/
			bedges.push([
				r[2].split("/")[0]-1,
				r[3].split("/")[0]-1
			])
			break;
			default:
			//whatever
		}
	}

	console.log("got "+berts.length+" verts");

	let model = [[...berts],[...bedges],[0,0,0],[0,0]];

	return model;
}

window.addEventListener('load', function () {
	var w = window.innerWidth;
	var h = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight )-20;

	const ctx = cv.getContext("2d");
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = h

	//ctx.fillStyle="rgba(255,0,120,1)"
	//ctx.fillRect(30,30,w/2-30,h/2-30)
	let ib = -80;
	let imgs = [loadImage("/masc.gif"),loadImage("/btn/CD.png"),loadImage("/btn/Alien.png"),loadImage("/btn/twitter2.png"),loadImage("/btn/Warning.png"),loadImage("/btn/Madagascar3.png")];
	/*let yaw = 0;
	let pitch = 0;*/

	let verts = [
		[-1,-1,-1],
		[1,-1,-1],[-1,1,-1],[-1,-1,1],
		[1,1,-1], [1,-1,1], [-1,1,1],
		[1,1,1]
	];
	let edges = [
		[0,1],[0,2],[0,3],
		[1,5],[3,5],[3,6],
		[5,7],[1,4],[2,6],
		[6,7],[7,4],[2,4]
	];
	let cube = [[...verts],[...edges],[0,0,0],[0,0]];
	
	let graph = [cube/*,cube.map(identity)*/];

	let buddha = loadModel("/media/buddhaFinal.obj").then((res)=>{graph.push(res);console.log(res)});

	graph[0][2]=[0,2,0]

	for (let i=0; i<100; i++){
		parts.push([w*.5,h*.5,Math.random()*15-7.5,-30+Math.random()*13,Date.now()+16000,Math.floor((imgs.length)*Math.random()),2.5]);
	}
	let lastpar = Date.now()+10000;

	function rend(t) {
		ctx.clearRect(0,0,w,h);

		ib+=1;
		let dt = 0.01;
		if (!(start === undefined)) {
		    dt = t-start;
		}
		//console.log(i);
		/*ctx.fillStyle="rgba(128,128,255,0.01)"
		ctx.fillRect(0,0,w,h)*/

		//let bab = (Math.cos(ib*0.001)**2)*.707;

		//ctx.drawImage(img, Math.sin(ib*0.005+bab*.12)*w*(0.15+bab*0.07)+w*0.5, Math.cos(ib*0.01+bab*.1)*w*(0.15+bab*0.04)+h*0.5);
		/*yaw = ib*0.01;
		pitch = ib*0.005;*/

		//graph[0][3] = [ib*0.01,ib*0.005];

		if (graph[1]!=undefined){
			//graph[1][3] = [ib*0.01,ib*0.005];
			graph[1][2] = [0,1,0];
			graph[1][3] = [ib*0.01,0];
		}
		if (Date.now()-lastpar>0){
			let of = 5000*Math.random();
			for (let i=0; i<150; i++){
				parts.push(
					[
					w*.5,
					h*.5,
					Math.random()*15-7.5,
					-30+Math.random()*13,
					Date.now()-i*200-of,
					Math.floor((imgs.length)*Math.random()),
					2.5
					]);
			}
			lastpar=Date.now()+4000+Math.random()*120000;
		}

		ctx.fillStyle="rgba(255,255,255,.9)";
		let remove = []
		parts.forEach((it,ind)=>{
			ctx.drawImage(imgs[it[5]], it[0], it[1]);
			it[0] = it[0]+it[2];
			it[1] = it[1]+it[3];
			it[2] = it[2]*.99;
			it[3] = it[3]*.98+.5;

			//it[2]=it[2]+1/(1+(Math.abs(it[0]-mx)+Math.abs(it[1]-my)))
			if ((Math.abs(it[0]-mmx)+Math.abs(it[1]-mmy))<300){
				if (click){
					it[2]=it[2]+(mmx-it[0])*.01
					it[3]=it[3]+(mmy-it[1])*.01
				}else{
					it[2]=it[2]-(mmx-it[0])*.01
					it[3]=it[3]-(mmy-it[1])*.01
				}
			}

			if (it[1]>h-imgs[it[5]].height) {
				it[3]=-it[3]-5-12*Math.random();
				it[2]=it[2]*it[6];
				it[6]=0.8;
			}
			if (it[0]>w+1) {it[0]-=w}
			if (it[0]<-5) {it[0]+=w}
			if (Date.now()-it[4]>20000){
				parts.splice(ind,1);//remove.push(ind);
			}
		});
		/*remove.forEach((it,ind)=>{
			parts.splice(it,1);
		})*/
		ctx.strokeStyle = "#b81";

		if (drawtd){
			ctx.beginPath();
			graph.forEach((obj,oind)=>{
				//console.log("drawing "+oind);

				let yaw = obj[3][0];
				let pitch = obj[3][1];

				let vertproj = [];
				let cedges = obj[1];

				obj[0].forEach((it,ind)=>{
					let x = it[0]+obj[2][0];
					let y = it[1]+obj[2][1];
					let z = it[2]+obj[2][2];

					let nx = -Math.sin(yaw)*z +Math.cos(yaw)*x;
					let ny = y;
					let nz = Math.sin(yaw)*x  +Math.cos(yaw)*z;

					x = nx;
					y = Math.cos(pitch)*ny+Math.sin(pitch)*nz;
					z = Math.cos(pitch)*nz-Math.sin(pitch)*ny;

					x=x-pos[0];
					y=y-pos[1];
					z=z-pos[2];

					//x = x/(z+1);
					//y = y/(z+1);
					x = (adiv(x,z)+x/z)*0.5;
					y = (adiv(y,z)+y/z)*0.5;
					//x = ediv(x,z);
					//y = ediv(y,z);

					x = w*0.5+x*70;
					y = h*0.5+y*70;

					//ctx.drawImage(img, x, y);
					if (z>-3.5){
						/*x=w*0.5;
						y=h*0.5;*/
						x=NaN;
						y=NaN;
					}

					vertproj[ind]=[x,y,z];
				});

				//console.log(verts.length,vertproj.length);

				cedges.forEach((it,ind)=>{
					//console.log(it[1], vertproj.length)

					let [x1,y1,x2,y2] = [vertproj[it[0]][0], vertproj[it[0]][1], vertproj[it[1]][0], vertproj[it[1]][1]]
					ctx.moveTo(x1,y1);
					ctx.lineTo(x2,y2);
				});

			});
			ctx.stroke();
			ctx.fillStyle="rgba(255,255,255,1)";
		}


		/*if ((ib%16)==0){
			console.log("bacon !");
			// get the image data object
			var image = ctx.getImageData(0, 0, w, h);
			// get the image data values 
			var imageData = image.data,
			length = imageData.length;
			// set every fourth value to 50
			for(var i=3; i < length; i+=4){  
			    imageData[i] = Math.max(imageData[i]*0.1-4,0);
			}
			// after the manipulation, reset the data
			image.data = imageData;
			// and put the imagedata back to the canvas
			ctx.putImageData(image, 0, 0);
		}*/
		if (wk || sk || dk || ak){
			let dx = 0;
			let dz = 0;
			if (wk) dz+=1;
			if (sk) dz-=1;
			if (ak) dx-=1;
			if (dk) dx+=1;
			dir = [dx,0,dz];
			movpos = [movpos[0]+dir[0]*dt*0.01,movpos[1],movpos[2]+dir[2]*dt*0.01]
		}
		let ang = ib/180;

		//pos = [pos[0]+Math.cos(ang)*dt*0.001,pos[1],pos[2]+Math.sin(ang)*dt*0.001]
		rpos = [Math.cos(ang*Date.now()*0.000000000001)*2,0,Math.sin(ang*Date.now()*0.000000000001)*2]
		pos = [rpos[0]+movpos[0],rpos[1]+movpos[1],rpos[2]+movpos[2]]
		//pos=movpos;
		start = t;
		window.requestAnimationFrame(rend);
	}
	rend(1);
});