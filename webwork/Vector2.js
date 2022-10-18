// Vector2 class
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

export {Vector2};