/*
	Vars
*/
var refBrackets = ["⦅", "⦆"], //["<", ">"]
	escaper = "\\",
	unsafeSymbols = "\\{}[]()^?:.+*$,0123456789'\"|trs",
	stringRE = /(?:'[^']*'|"[^"]*")/g,
	dataDelimiter = ["{{", "}}"] //delimiters to split data-chunks from string

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

function none(arg){
	return arg || null
}

/*
*	Returns reversed str
*/
function reverse(str){
	return str.split('').reverse().join('');
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
* Populates any data passed
*/
function populate(obj){
	var dd = new DataDescriptor(obj);
	return dd.populate();
}

//RepeatSequence stubs
function index(num){
	return num;
}
function repeat(){
	return undefined
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
function expression(str, params){
	//cache expression
	if (!expressions[str]){
		expressions[str] = new Expression(str, params);
	} else if (params) {
		expression[str].setParams(params);
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
*	Escapes symbols passed
*/
//TODO: think how to escape non-single symbols like \\x123
function escapeSymbols(str, symbols){
	if (symbols instanceof Array) symbols = symbols.join('');
	symbols = symbols.replace(/[\[\]\\]/g, "\\$&");
	return str.replace(new RegExp("[" + symbols + "]", "g"), "\\$&");
}

/*
* Vice-versa action: convert `\n` to `n`
*/
function unescapeSymbols(str, symbols){
	if (symbols instanceof Array) symbols = symbols.join('');
	symbols = symbols.replace(/[\[\]\\]/g, "\\$&");
	return str.replace(new RegExp("\\\\([" + symbols + "])", "g"), "$1");
}

/*
* Escapes every occurence of value within symbols, like `escapeWithin(str, "''")`
* E.g. `escapeWithin("a(b(&))", "()")` returns `a(b%28%26%29)`
*
* If multiple limiters passed, escapes all outermost variants found
* e.g. `escapeWithin("{[]}", "[]", "{}")` escapes only once - content within "{}"
*/
function escapeWithin(str){
	return doWithin(str, escape, Array.prototype.slice.apply(arguments).slice(1))
}
function unescapeWithin(str){
	return doWithin(str, unescape, Array.prototype.slice.apply(arguments).slice(1))	
}

/*
* Calls string handler function on the elements within limiters.
* Used by escapeWithin, unescapeWithin 
* limitersList (@ll) is a list of limiters to seek for limiter braces within, like ["{}", "[]", ["{{", "}}"], ...]
*/
function doWithin(str, fn, ll){
	var lCount = 0, //counter of nested limiters
		cutPoint = 0,  //points to escape within
		result = "",
		i = 0,
		curLim = -1,
		llLen = ll.length;

	while (i < str.length){
		//console.group("before:", i, "lCount:" + lCount, "curLim:" + curLim)
		//find outermost limiter from optional limiters passed
		if (curLim < 0){
			for (var j = 0; j < llLen; j++){
				if (str.substr(i, ll[j][0].length) === ll[j][0]) {
					curLim = j;
					break;
				}
			}
		}

		//if insideof some limiter already
		if ( curLim >= 0
			&& str.substr(i, ll[curLim][0].length) === ll[curLim][0]
			&& (ll[curLim][0] !== ll[curLim][1] || (ll[curLim][0] === ll[curLim][1] && lCount === 0))){
			//find limiter from optional passed, if possible
			if (lCount === 0) {
				result += str.slice(cutPoint, i );
				//console.log("start", cutPoint, i, result)
				cutPoint = i+ll[curLim][0].length;
			}
			i += ll[curLim][0].length;
			lCount++;
		} else if ( curLim >= 0 && lCount > 0 && str.substr(i, ll[curLim][1].length) === ll[curLim][1]){
			lCount--;
			if (lCount === 0){
				result += ll[curLim][0] + fn(str.slice(cutPoint, i)) + ll[curLim][1];
				//console.log("end", cutPoint, i, result)
				i += ll[curLim][1].length;
				cutPoint = i;
				curLim = -1;
			} else {
				i += ll[curLim][1].length;
			}
		} else {
			i++;
		}
		//console.log("after:", i, "lCount:" + lCount, "curLim:" + curLim)
		//console.groupEnd();
	}

	result += str.slice(cutPoint, str.lenght);

	return result
}

/*
* Returns anything fixed to format
* fixed(123, '00000') === '00123'
* fixed(123, 2) === '12'
* fixed(123, 6) === '000123'
*/
function fixed(value, format){
	var value = value.toString();
	var length =  value.length;
	if (typeof format === "string"){
		length = format.length;
	} else if (typeof format === "number"){
		length = Math.round(format)
	}

	if (length > value.length){
		var l = length - value.length;
		for (var i = l; i--;){
			value = "0" + value;
		}
	} else {
		value = value.slice(0, length);
	}

	return value;
}



/*
* Determines what the param is: string, data object, sequence, json etc
* Used to be used within datasource, then migrated to globals due to versatility
*/
function recognizeParam(str, context){
	//console.log("recognize:", str)
	var result = undefined;
	//123.456
	if (!isNaN(result = parseFloat(str))){
		return result;
	}

	//true/false
	else if (/^true$/i.test(str)){
		return true
	}
	else if (/^false$/i.test(str)){
		return false
	}

	//techs
	else if (str === undefined || str.length === 0 || str === "undefined"){
		return undefined
	}
	else if (str === "NaN"){
		return NaN
	}
	else if (str === "null"){
		return null
	}

	//'string'
	else if (/^(?:"[^"]*"|'[^']*')$/.test(str)){
		return str.slice(1,-1);
	}

	//['list', 04, 'things']
	else if (str[0] === "[" && str[str.length - 1] === "]"){
		str = str.slice(1,-1).trim();
		if (!str) return [];

		str = escapeWithin(str, "{}", "[]");
		var params = str.split(",");
		var result = [];
		for (var i = 0; i < params.length; i++){
			//console.log("list param:", params[i])
			params[i] = unescape(params[i]).trim();
			result[i] = recognizeParam(params[i], context);
		}

		return result;
	}

	//{a: 1, b: 2}
	else if (str[0] === "{" && str[str.length - 1] === "}"){
		str = str.slice(1,-1);
		str = str.trim();

		if (!str) return {};

		str = escapeWithin(str, "{}", "[]", "()", "''", '""');

		var props = str.split(",");

		result = {};
		for (var i = 0; i < props.length; i++){
			props[i] = props[i].trim()
			var propComps = props[i].split(":");
			var key = propComps[0].trim();
			var value = propComps[1].trim();
			if ((key[0] === "'" && key[key.length - 1] === "'") || (key[0] === '"' && key[key.length - 1] === '"')){
				key = key.slice(1, -1);
			}
			value = unescape(value);
			result[key] = recognizeParam(value, context);
		}

		return result;
	}

	//data.['type'](12, 13).maybe.['with_some']['property'].at.last(1, 'abc', [[1], 2])
	else if (/[a-z_$@]/i.test(str[0])){
		//Then define calling sequence
		return new CallSequence(str, context);
	}

	throw new Error("Can not recognize the param `" + str + "`")
	return null;
}

/*
* Arguments parser returns list of arguments parsed from comma-separated string
* Used to be used within CallSequence, then moved out in favour of versatility
*/
function parseArguments(str, context){
	//console.log("parse arguments:", str)
	if (str === undefined) return [null];

	str = str.trim();
	str = escapeWithin(str, "[]", "()", "{}", "''", '""')
	var args = str.split(/,[ ]?/);

	var result = [];

	for (var i = 0; i < args.length; i++){
		result.push(recognizeParam(unescape(args[i]), context))
	}

	return result;
}


/*
* 'abC Dfef' → 'Abc def'
*/
function capitalize(str) {
	return str.toString()[0].toUpperCase() + str.toString().slice(1).toLowerCase();
}

/*
* 'abcdef' →(3, '...')→ 'abc...'
*/
function truncatechars(str, len, ending){
	return str.slice(0, len) + (ending || "")
}