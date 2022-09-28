document.addEventListener("DOMContentLoaded", function(event) { 
	const c = document.getElementById("jo");
	function nowYet(){
		let d = new Date();
		return d.getDate()==26 && d.getMonth()==11;
	}
	if (nowYet()){
		c.innerHTML = "Birthday!";
	}
	
});