var J = -1;
const trolloe = ["Ah?","Ah bah non","Je peux pas","Non","Non plus","J'ai pas envie","Je pense pas","Nope","Bye"];
var butt;

function getBrowserName() { 
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
        return 'Opera';
    } else if(navigator.userAgent.indexOf("Edg") != -1 ) {
        return 'Edge';
    } else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
        return 'Chrome';
    } else if(navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    } else if(navigator.userAgent.indexOf("Firefox") != -1 ){
        return 'Firefox';
    } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
        return 'Internet Explorer';
    } else {
        return '?!?!?';
    }
}

function diag(){
  J = J + 1;
  butt.innerHTML = trolloe[J];
  if (J >= trolloe.length){
    butt.remove()
    let p = document.createElement("p")
    const t = document.getElementById("buttonplace");
    t.append(p);
    p.innerHTML = "Maintenant t'as plus de bouton, t'es content?"
  }
}

document.addEventListener("DOMContentLoaded", function(){
  mt = document.getElementById("mainTitle");
  mt.innerHTML = getBrowserName()+" ne peut pas afficher cette page Web";
  butt = document.getElementById("diagnose");
});