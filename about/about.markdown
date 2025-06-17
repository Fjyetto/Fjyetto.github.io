---
title: About
permalink: /about/
layout: post
bg: true
---
<div id="ttip" style="background:#add; border: #112 1px solid; position: absolute; display:none; width:200px; height: fit-content; z-index: 60;">
	<center id="scratch" style="display:none;">
		<p>one of my early projects</p><hr><img src="/RETROWORLD/media/mario%20brrr.jpg" width="160">
	</center>
	<center id="roblox" style="display:none;">
		<p>one of my early games</p><hr><img src="/RETROWORLD/media/f3x%20showcase.jpg" width="160">
	</center>
</div>
<div style="text-align: left;margin: 8px;">
<p><dd>Hello! I am fjyetto.</dd>I am an 18 year old software engineer and hardware enthusiast.<br>
I have been programming for 
<!-- terrible way to do this but hey it works -->
<span id="year">2014</span> years, first on <span class="dut" 
onmouseover="tt.style.display = 'block';sc.style.display = 'block'" 
onmouseleave="tt.style.display = 'none';sc.style.display = 'none'">scratch</span> in 2014, creating simple games, then in lua on
  <span class="dut"
 onmouseover="tt.style.display = 'block';rx.style.display = 'block'"  
onmouseleave="tt.style.display = 'none';rx.style.display = 'none'">roblox</span> in 2016. After these I dabbled in many other languages: C, HTML5, Python, Java, all the good stuff to have on a resume, but nowadays I still mostly write lua. I have grown attached to roblox, building friendships and a tight-knit devteam.<br>To this day, I make games on roblox, although I try to find alternatives in godot or custom game engines.<br>In the future, I see myself making a living doing what I love with my friends.<br>
If you would like to contact me, you may at <a href="mailto:fjyetto@proton.me">fjyetto@proton.me</a>
</p>
</div>
			
<script>
	const y = document.getElementById("year");
	y.innerHTML = (new Date().getFullYear()) - y.innerHTML;

	let mx=0;
	let my=0;
	const tt=document.getElementById('ttip');
	const sc=document.getElementById('scratch');
	const rx=document.getElementById('roblox');
	document.addEventListener('mousemove', function(event) {
	    //console.log('Mouse X:', event.clientX, 'Mouse Y:', event.clientY);
	    mx=event.clientX;
	    my=event.clientY;
	    tt.style.left = (mx+20)+'px';
	    tt.style.top = (my+3)+'px';
	});
</script>
