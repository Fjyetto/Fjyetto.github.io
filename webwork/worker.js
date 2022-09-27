// worker

//import {Vector2} from './Vector2.js';
importScripts('Vector2.js');
let Res = 120;
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

function ray(origin,angle,max,incr){
	// there is a much better and faster way to do this
	var cPos = new Vector2(origin[0],origin[1]);
	var t = 0;
	
	while ( t<max && (typeof Map[Math.floor(cPos[1])] != "undefined") && (Map[Math.floor(cPos[1])].charAt(Math.floor(cPos[0]))!="#")){
		cPos = cPos.Add(new Vector2(Math.sin(angle)*incr,Math.cos(angle)*incr));
		t=t+1;
	}
	
	//console.log(cPos,origin);
	return [(cPos.Sub(origin).Magnitude),cPos];
}

self.addEventListener('message' function(e){
	if (e.data[0]=='R'){
		let Dist = ray(e.data[1],e.data[2],e.data[3],e.data[4])[0];
		let i = e.data[5];
		let ctx = e.data[6];
		let dtM = ((i/Res)-.5)**2;
		let Len = Math.atan(Math.sqrt(1/Dist)*.2)*1000+(dtM*40)/Dist;
		ctx.fillStyle = 'rgb(10,'+ Math.floor((5.02-Dist)*53) + ','+ Math.floor(Len) +')';
		ctx.fillRect(i*Size,(360-Len)/2,Size,Len);
		//postMessage(ray(e.data[1],e.data[2],e.data[3],e.data[4]));
	}
	self.close();
});