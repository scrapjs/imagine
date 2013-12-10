/*
* Number-related utils
*/
var Numbers = {
	romanNumerals: "IVXLCDM"
}

//------------------------Functions
//have to be separated cause they’re utils also


/*
*	Returns number between from and to.
*	If @to is omitted, returns number between 0 and @from
* number(from, to, round?), number(to, round?), number(round?)
*/
function number(a, b, c){
	var from = -999999, to = 999999, r = false;
	if (a === true || a === false || a === undefined){
		r = !!a;
	} else if (b === true || b === false || b === undefined) {
		r = !!b;
		to = parseFloat(a);
		from = 0;
	} else if (c === true || c === false || c === undefined) {
		from = parseFloat(a);
		to = parseFloat(b);
		r = !!c
	}
	var result = Math.random() * (to - from) + from;
	return r ? Math.round( result ) : result;
}
function float(from, to){
	if (from === undefined) return number(false);
	if (to === undefined) return number(from, false);
	return number(from, to, false)
}
function int(from, to){
	if (from === undefined) return number(true);
	if (to === undefined) return number(from, true);
	return number(from, to, true)
}
function bool(){
	return !!Math.round(Math.random())
}


//JSON-generator numeric thing. Tests whether a & b are integers or not
function numeric(a, b){
	if (a === Math.round(a) && b === Math.round(b)){
		return int(a, b)
	} else {
		return float(a, b)
	}
}