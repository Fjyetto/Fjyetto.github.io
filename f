[1mdiff --git a/index.html b/index.html[m
[1mindex 93219dd..0191087 100644[m
[1m--- a/index.html[m
[1m+++ b/index.html[m
[36m@@ -20,21 +20,6 @@[m
 <body>[m
 	<center><h1>The babdomig zone!!</h1></center>[m
 	<div class="maind">[m
[31m-		<!--[m
[31m-		<div class="fyf">[m
[31m-			<div class="top">[m
[31m-				<p class="JOE">[m
[31m-					<img src="media/IEicon.png">[m
[31m-					<img src="media/titlenavbar.png">[m
[31m-				</p>[m
[31m-			</div>[m
[31m-			<div class="funyn">[m
[31m-				<ul class="inset navbar">[m
[31m-					<li>Home</li>[m
[31m-					<li><a href="POO/poo.html">Homer vs Trool</a></li>[m
[31m-				</ul>[m
[31m-			</div>[m
[31m-		</div>-->[m
 		<center>[m
 		<p>Welcome to the babdomig zone!!!<br>commit test</p>[m
 		<table>[m
[1mdiff --git a/raycas/canvas.js b/raycas/canvas.js[m
[1mindex a07381f..075e496 100644[m
[1m--- a/raycas/canvas.js[m
[1m+++ b/raycas/canvas.js[m
[36m@@ -118,7 +118,7 @@[m [mfunction ray(origin,angle,max,incr){[m
 	var cPos = new Vector2(origin[0],origin[1]);[m
 	var t = 0;[m
 	[m
[31m-	let dirVec = new Vector2(Math.sin(angle),Math.cos(angle));[m
[32m+[m	[32m/* let dirVec = new Vector2(Math.sin(angle),Math.cos(angle));[m
 	let currentGrid = new Vector2(Math.floor(cPos[0]),Math.floor(cPos[1]));[m
 	while (t<max && (typeof Map[currentGrid[1]] != "undefined") && (Map[currentGrid[1]].charAt(currentGrid[0])!="#")){[m
 		//currentGrid = currentGrid.Add(dirVec.Unit);[m
[36m@@ -165,15 +165,15 @@[m [mfunction ray(origin,angle,max,incr){[m
 		}[m
 		//cPos = cPos.Add();[m
 		t=t+1;[m
[31m-	}[m
[32m+[m	[32m}*/[m
 	[m
[31m-	/*while ( t<max && (typeof Map[Math.floor(cPos[1])] != "undefined") && (Map[Math.floor(cPos[1])].charAt(Math.floor(cPos[0]))!="#")){[m
[32m+[m	[32mwhile ( t<max && (typeof Map[Math.floor(cPos[1])] != "undefined") && (Map[Math.floor(cPos[1])].charAt(Math.floor(cPos[0]))!="#")){[m
 		cPos = cPos.Add(new Vector2(Math.sin(angle)*incr,Math.cos(angle)*incr));[m
 		t=t+1;[m
[31m-	}*/[m
[32m+[m	[32m}[m
 	[m
 	//console.log(cPos,origin);[m
[31m-	return [(currentGrid.Sub(origin).Magnitude),cPos];[m
[32m+[m	[32mreturn [(cPos.Sub(origin).Magnitude),cPos];[m
 }[m
 [m
 document.addEventListener("DOMContentLoaded", function(event) { [m
