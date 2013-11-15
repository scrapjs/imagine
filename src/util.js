/*
	Vars
*/
groupRefBrackets = ["<", ">"]//["⦅", "⦆"];
escaper = "\\";
groupRefBracketRE = [
	new RegExp(groupRefBrackets[0], "g"),
	new RegExp(groupRefBrackets[1], "g")
]
escapedGroupRefBracketRE = [
	new RegExp("\\" + escaper + groupRefBrackets[0], "g"),
	new RegExp("\\" + escaper + groupRefBrackets[1], "g")
]
unsafeSymbols = "\\{}[]()^?:.+*$,0123456789'\"|trs"

/*
	class extender tool
*/
function extend(a){
	for (var i = 1, l = arguments.length; i<l; i++){
		var b = arguments[i];
		for (var k in b){
			a[k] = b[k];
		}
	}
	return a;
}

/*
*	Returns number between from and to.
*	If @to is omitted, returns number between 0 and @from
* number(from, to, round?), number(to, round?), number(round?)
*/
function number(a, b, c){
	var from = Number.MIN_VALUE, to = Number.MAX_VALUE, r = false;
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
	if (to === undefined) return number(from, false);
	return number(from, to, false)
}
function int(from, to){
	if (to === undefined) return number(from, true);
	return number(from, to, true)
}
function bool(){
	return !!Math.round(Math.random())
}

/*
*	Returns random value from array/string passed
*/
function any(arr){
	if (!arr) return arr;
	if (arr.length !== undefined) return arr[int(arr.length-1)];
	if (arguments.length > 1) return arguments[int(arguments.length-1)];
	return arr;
}

/*
*	Apply list of replacements to the string, like {"x": "12345", "X": "0123456789"}
*/
function replacements(str, replacements){
	var self = this;
	for (var rep in replacements){
		var re = rep.replace(/[\?\*\+\\\{\}\[\]\(\)\,\.]/, function(m){return "\\" + m});
		str = str.replace(new RegExp(re, "g"), function(){
			return any(replacements[rep])
		})
	}

	return str;
}

/* 
*	Populate @string based on regex-like notation mixed with moustache data-insertions.
*	Examples:
*	"{{ Internet.url }}{2,3}"
*	"[a-z]{4,5}"
*	"([1-9][0-9]?)(?:, ${1}){,2}" ⇒ "14", "5" or "2, 12, 45"
*	""
*/
var expressions = {};
function expression(str){
	//cache expression
	if (!expressions[str]){
		expressions[str] = new Expression(str);
	}

	return expressions[str].populate();
}

/*
*	strip tags which shouldn’t be involved into the parsing proccess
*/
function sanitize(str, tags){
	var res = str;
	tags = tags || I.o.badTags;
	for (var i = 0; i < tags.length; i++){
		var fullTagReStr = ["<", tags[i], "\\b(?:[^](?!<\\/", tags[i] ,"))*[^]<\\/", tags[i], "\\b[^>]*>"].join("");
		var fullTagRe = new RegExp(fullTagReStr, "ig");

		var shortTagReStr = ["<", tags[i], "[^\\/>]*\\/>"].join("");
		var shortTagRe = new RegExp(shortTagReStr, "ig");
		
		res = res.replace(fullTagRe, '');
		res = res.replace(shortTagRe, '');
	}
	return res
}


/*
* Returns randomly generated data based on dataDescriptor object passed
*/
function object(dataDescriptor){
	var dd = new DataDescriptor(dataDescriptor);
	return dd.populate();
}
