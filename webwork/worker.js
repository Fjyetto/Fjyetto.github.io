// worker

import {Vector2} from './Vector2.js';

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
	if (e.data[0]=='M'){
		
	}
	self.close();
});