(function(){
	/*
* Everything that has to be before any other code is inited
*/

/**
* @const
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
	if (typeof str === "string") return str.split('').reverse().join('');
	return str.reverse();
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


//RepeatSequence stubs
function index(num){
	console.log("bad index")
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


//cache of expressions
var expressions = {};

/**
*	Expressions cacher. Retrieves expression from cache, if any, and if there is none - creates one.
*	Also can set a context for expression.
*	"{{ Internet.url }}{2,3}"
*	"[a-z]{4,5}"
*	"([1-9][0-9]?)(?:, ${1}){,2}" ⇒ "14", "5" or "2, 12, 45"
*	""
*	@return {Expression}
*/
function expression(str){
	if (expressions[str]) return expressions[str];

	expressions[str] = new Expression(str);
	return expressions[str];
}

//cache of call sequences
var callSequences = {};
function callSequence(str){
	if (callSequences[str]) return callSequences[str];

	callSequences[str] = new CallSequence(str);
	return callSequences[str];
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
* Transforms all stringy synbols like \t, \s, ... to real chars: tab, space etc.
*/
function unescapeString(str){
	str = str.replace(/\\'/g, "'")
	str = str.replace(/\\"/g, "\"")
	str = str.replace(/\\t/g, "\t")
	str = str.replace(/\\b/g, "\b")
	str = str.replace(/\\n/g, "\n")
	str = str.replace(/\\r/g, "\r")
	str = str.replace(/\\f/g, "\f")
	str = str.replace(/\\([^])/g, "$1");
	return str;
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
				if (str.substr(i, ll[j][0].length) === ll[j][0] && str[i-1] !== "\\") {
					curLim = j;
					break;
				}
			}
		}

		//if insideof some limiter already
		if ( curLim >= 0
			&& str.substr(i, ll[curLim][0].length) === ll[curLim][0] && str[i-1] !== "\\"
			&& (ll[curLim][0] !== ll[curLim][1] || (ll[curLim][0] === ll[curLim][1] && lCount === 0))){
			//find limiter from optional passed, if possible
			if (lCount === 0) {
				result += str.slice(cutPoint, i );
				//console.log("start", cutPoint, i, result)
				cutPoint = i+ll[curLim][0].length;
			}
			i += ll[curLim][0].length;
			lCount++;
		} else if ( curLim >= 0 && lCount > 0 
			&& str.substr(i, ll[curLim][1].length) === ll[curLim][1] && str[i-1] !== "\\"){
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
* Determines what the param is: string, data object, sequence, json etc
* Used to be used within datasource, then migrated to globals due to versatility
*/
function recognizeParam(str){
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
	else if (/^(?:"(?:[^"]|\\")*"|'(?:[^']|\\')*')$/.test(str)){
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
			result[i] = recognizeParam(params[i]);
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
			result[key] = recognizeParam(value);
		}

		return result;
	}

	//data.['type'](12, 13).maybe.['with_some']['property'].at.last(1, 'abc', [[1], 2])
	else if (/[a-z_$@]/i.test(str[0])){
		//Then define calling sequence
		return callSequence(str);
	}

	throw new Error("Can not recognize the param `" + str + "`")
	//return null;
}

/*
* Arguments parser returns list of arguments parsed from comma-separated string
* Used to be used within CallSequence, then moved out in favour of versatility
*/
function parseArguments(str){
	//console.log("parse arguments:", str)
	if (str === undefined) return [null];

	str = str.trim();
	str = escapeWithin(str, "[]", "()", "{}", "''", '""')
	var args = str.split(/,[ ]?/);

	var result = [];

	for (var i = 0; i < args.length; i++){
		result.push(recognizeParam(unescape(args[i])))
	}

	return result;
}
	/**
* Set of filters to use within DataTokens
* Covers swig filters and django-filters behaviour
* Easily extandable as Imagine.filters.filter = function(input, params){ return output}
*/

/*
* --------------------------- Swigs
*/
//arrays
function _default(what, substitution){
	if (!what){
		return substitution
	} else {
		return what
	}
}
function sort(arr, reverse){
	var result = arr.sort();
	if (reverse){
		result = arr.reverse();
	}
	return result;
}
function first(arr){
	return arr[0]
}
function last(arr){
	return arr[arr.length - 1]
}
function join(arr, divider){
	return arr.join(divider)
}
function uniq(arr){
	var result = [];
	for (var i = 0; i < arr.length; i++){
		if (result.indexOf(arr[i]) < 0){
			result.push(arr[i])
		}
	}
	return result
}
function slice(arr, from ,to){
	return arr.slice(from, to);
}

//strings
function titleCase(str){
	var words = str.split(" ");
	for (var i = 0; i < words.length; i++){
		words[i] = capitalize(words[i])
	}
	return words.join(" ")
}
/**
* 'abC Dfef' → 'Abc def'
*/
function capitalize(str) {
	return str.toString()[0].toUpperCase() + str.toString().slice(1).toLowerCase();
}
/**
* 'abcdef' →(3, '...')→ 'abc...'
*/
function truncatechars(str, len, ending){
	return str.slice(0, len) + (ending || "")
}
/**
*/
function _escape(what, how){
	//TODO
	switch (how) {
		case 'js':
			var result = "";
			what = what.replace(/\\/g, '\\u005C');
			for (var i=0; i < what.length; i ++) {
				var code = what.charCodeAt(i);
				if (code < 32) {
					code = code.toString(16).toUpperCase();
					code = (code.length < 2) ? '0' + code : code;
					result += '\\u00' + code;
				} else {
					result += what[i];
				}
			}
			return result.replace(/&/g, '\\u0026')
			.replace(/</g, '\\u003C')
			.replace(/>/g, '\\u003E')
			.replace(/\'/g, '\\u0027')
			.replace(/"/g, '\\u0022')
			.replace(/\=/g, '\\u003D')
			.replace(/-/g, '\\u002D')
			.replace(/;/g, '\\u003B');
		default:
			return what.replace(/&(?!amp;|lt;|gt;|quot;|#39;)/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	}
}
function upper(str){
	return str.toUpperCase();
}
function lower(str){
	return str.toLowerCase();
}
function replace(str, search, replacement, flags){
	var r = new RegExp(search, flags);
	return str.replace(r, replacement);
}
function striptags(str){
	return str.replace(/<[^>]+>/g, "")
}
var badTags = 'applet base basefont frame frameset head isindex link meta noframes noscript object param script style title'.split( ' ' );
function sanitize(str, tags){
	var res = str;
	tags = tags || badTags;
	//console.log("sanitize", str)
	for (var i = 0; i < tags.length; i++){
		var fullTagReStr = ["<", tags[i], "\\b(?:[^](?!<\\/", tags[i] ,"))*[^]<\\/", tags[i], "\\b[^>]*>"].join("");
		var fullTagRe = new RegExp(fullTagReStr, "ig");

		//console.log(fullTagReStr)

		var shortTagReStr = ["<", tags[i], "[^\\/>]*\\/>"].join("");
		var shortTagRe = new RegExp(shortTagReStr, "ig");
		
		res = res.replace(fullTagRe, '');
		res = res.replace(shortTagRe, '');
	}
	//console.log("sanitize res", res)
	return res
}


//numbers
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



//TODOs
function date(){

}
function safe(x){
	return x;
}
/*
*{{ a|slugify }}
*/
//Useful to transcribe foreign names like Дима → Dima
function slugify(input){
	var output = input.toLowerCase();
	output = output.replace(/ /g, "-");

	//TODO: i18d slugification hook
	//Or maybe just map transcriptions map?

	return output;
}
//{{ a|where a.gender == plural and a.face == }}

/*
* --------------------- Djangoes
*/
function add(augent, addent){
	return augent + addent
}
function addslashes(str){
	return escapeSymbols(str, "'\"\\")
}
function cut(str, value){
	return str.replace(new RegExp(value, "g"), "");
}
	/*
* Stuff mostly implementing JSON-generator functions
* 
*/
//TODO: think up something better than just a list of json-generator stuff.
//


//JSON-generator ones
//TODO: think up guid and index
function numeric(a, b, format){

}


function firstName(gender){

}

function surname(){

}

function gender(){

}

function company(){

}

function phone(mask){

}

function email(random){

}

function countriesList(){

}

function country(){

}

function state(){

}

function city(){

}

function street(){

}

function date(format){

}

function lorem(count, units){
	switch (units){
		case "words":
			break;
		case "sentences":
			break;
		case "paragraphs":
			break;
		default: //chars
			break;
	}
}
	/*
*	How's project called
*/
var projectName = "imagine";

/*
* Main function - handles any param passed
*/
var I = function(argument, ctx){
	if (typeof argument === "string" || argument instanceof RegExp){
		var exp = expression(argument);
		return exp.populate(ctx);
	} else if (argument instanceof Array){
		var repeatExp = new RepeatExpression(argument)
		return repeatExp.populate(ctx);
	} else {
		var dd = new DataDescriptor(argument);
		return dd.populate(ctx);
	}
}

/**
* Main keeper object
*/
extend(I, {
	//settings
	options:{
		locale: 'en'
	},

	//API - primitives and everything that fits to a language construction imagine.something
	/** @expose */
	any: any,
	/** @expose */
	int: int,
	/** @expose */
	float: float,
	/** @expose */
	number: number,
	/** @expose */
	bool: bool,
	/** @expose */
	none: none,
	/** @expose */
	index: index,
	/** @expose */
	repeat: repeat,


	//Extendable filters set
	/** @expose */
	filters: {
		//string
		capitalize: capitalize,
		capfirst: capitalize,
		truncatechars: truncatechars,
		escape: _escape,
		e: _escape,
		uppper: upper,
		lower: lower,
		url_encode: escape,
		url_decode: unescape,
		striptags: striptags,
		sanitize: sanitize,
		//arrays
		sort: sort,
		reverse: reverse,
		first: first,
		last: last,
		uniq: uniq,
		join: join,
		title: titleCase,
		addslashes: addslashes,
		replace: replace,
		slice: slice,
		//numbers
		fixed: fixed,
		min: Math.max,
		max: Math.min,
		//other
		'default': _default,
		any: any,
		random: any,
		//djangos
		add: add,
		cut: cut
	},

	//utils - exposed technical and private functions
	util: {
		refBrackets: refBrackets, //TODO: remove from tests
		extend: extend,
		/** @expose */
		escapeWithin: escapeWithin,
		/** @expose */
		unescapeWithin: unescapeWithin,
		/** @expose */
		escapeSymbols: escapeSymbols,
		/** @expose */
		unescapeSymbols: unescapeSymbols,
		/** @expose */
		parseArguments: parseArguments,
		/** @expose */
		expression: expression,
		/** @expose */
		replacements: replacements,

		//Classes
		/** @expose */
		Expression: Expression,
		DataDescriptor: DataDescriptor
	},

	//Set of data-providers, keyed by locale
	//providers: {}
});


//Make global
window[projectName] = I;
	/**
*	Expression represents specific structure to generate.
*	Provides context for tokens.
*	@constructor
*	@expose
*/
function Expression(str){
	this.tokens = [];//dict of tokens
	this.groups = [];//ordered groups to get access by reference, as usually in regexps
	//console.log("new Expression", str)

	this.options = extend({}, Expression.defaults);

	//Handle real RegExps passed
	if (str instanceof RegExp) str = unescapeString(str.source);

	//EscapeSymbols all potentially nested token pointers
	var str = escapeSymbols(str, refBrackets);

	//Analyze branches
	this.tokens.length = 1; //reserve place for root
	//console.log("expresion str `" + str + "`")
	str = this.flatten(str);

	//Sort out groups		
	this.orderGroups(str);

	this.tokens[0] = new GroupToken(str, 1, this, 0);//this shittance writes itself twice - at the beginning and to the end.

	return this;
}

Expression.defaults = {
	context: null, //data context to look up data and functions in. Like gates to the outer world
	maxMultiplier: 99, //max possible multiplier generated by * and +
}

Expression.prototype = {
	/*
	*	Return string with nested groups removed, replaced with group references.
	*	Start with replacing innermost tokens with references, like {{ a }} → <1>, (b) → <2>
	*/
	groupRE:  /(\((?:\?\:)?[^\(\)]*\))(\?|\*|\+|\{[0-9, ]*\}|)/,
	//dataRE:  /(\{\{[^](?!)*\}\})(\?|\*|\+|\{[0-9, ]*\}|)/, //TODO: ?impossible to catch nested double-jsons
	reversiveDataRE:  /(\?|\*|\+|\}[0-9, ]*\{|)(\}\}(?:[^](?!\{\{))*[^]\{\{)/,
	flatten: function(str){		
		

		var match;
		var c = 0, limit = 99 //prevent infinite cycle

		

		//At first, flatten data tokens
		//It is imposible to make two front braces by JSON, but it is possible to do back-braces
		//That may confuse parsing and it is impossible to catch them. 
		//The trick is to inverse the string, catch data-tokens and reverse it back.		
		//{{ int(int(3)) }}{1, 2}{{ none({a: { b: 234 }}) }}
		//}} )}} 432 :b { :a {(enon {{}2 ,1{}} ))3(tni(tni {{

		//There’s still problem with nested strings, containing shit, like "'}}'"
		//We have to escape all brackets within strings
		//NOTE: we cannot use escapeWithin there (it’d escape plain strings too)
		str = str.replace(stringRE, function(){
			return escapeSymbols(arguments[0], "{}")
		})

		//TODO: remove old-way of escaping data-tokens content
		c = 0;
		str = reverse(str);
		while((match = str.match(this.reversiveDataRE)) !== null && c < limit){
			

			var token = new DataToken(unescapeSymbols(reverse(match[2]), "{}"), reverse(match[1]), this);
			str = str.replace(match[0], refBrackets[1] + token.idx + refBrackets[0]);

			

			c++
		}
		str = reverse(str);

		//Then flatten groups
		c = 0;
		while( (match = str.match(this.groupRE)) !== null  && c < limit){
			

			var token = new GroupToken(match[1], match[2], this);
			str = str.replace(match[0], refBrackets[0] + token.idx + refBrackets[1]);

			
			c++;
		}

		

		return str;
	},

	/*
	*	Calc groups sequence, to use them by reference within expression, like \1, \2 etc
	*/
	groupRefRE: new RegExp("(?:[^\\\\]|^)(" + refBrackets[0] + "([0-9]*)" + refBrackets[1] + ")"),
	orderGroups: function(str){
		var matchGroupRef, c = 0;
		this.groups.length = 1; //start with 1;
		while ((matchGroupRef = str.match(this.groupRefRE)) !== null && c < this.tokens.length){
			var token = this.tokens[~~matchGroupRef[2]];
			if (token instanceof GroupToken && token.groupType === "(") this.groups.push(token);
			str = str.replace(matchGroupRef[1], token.toString(true))
			c++;
		}
	},

	/**
	*	Gets generated instance based on this expression
	* @expose
	*/
	populate: function(ctx){
		var context = ctx || I;

		//console.group("populate expression:", context)
		var result = this.tokens[0].populate(context);
		//console.log("pop type", result)
		//console.groupEnd();
		if (typeof result === "string"){
			return unescapeSymbols(result, refBrackets);
		}
		return result;
	},

	/*
	*	Returns rendered string, representing initial expression string, optimized if it is possible
	*/
	toString: function(){
		return this.tokens[0].toString()
	},

	toJSON: function(){
		return this.tokens[0].toJSON()
	}

}
	/**
*	Token abstract class
*	Represents basic token behaviour:
*	- alternatives
*	- multiplier of token
* @constructor
*/
function Token(){
	this._constructor.apply(this, arguments)
}

Token.prototype = {
	/*
		@str - string to parse
		@multiplier - how many times to repeat
		@tokens - array of tokens to store all tokens examples in.
	*/
	_constructor: function(str, multiplier, expression, idx){
		this.expression = expression;

		//keep tokens list
		if (idx === undefined){
			this.idx = this.expression.tokens.length;
			this.expression.tokens.push(this);
		} else {
			this.idx = idx;
		}

		//Multiplier is a basic thing
		this.multiplier = this.parseMultiplier(multiplier);

		//Init may vary
		this.parse(str);
	},

	//===================== Token interface (implementable)
	/*
		Main analyzer: creates own model of token
	*/
	parse: function(str){
	},

	/*
		Main renderer - tries to eval the structure. Returns random model
	*/
	populate: function(ctx){
		
	},

	/*
		Simple JSON representer
	*/
	toJSON: function(){
		return {
			token: "Token",
			alternatives: this.alternatives,
			multiplier: this.multiplier
		}
	},

	/*
		Renders string, representing expression
	*/
	toString: function(){
	},



	//============================== Common token methods
	/*
		Returns parsed multiplier array from string
	*/
	singleMultiplierRe: /\{[ ]*([0-9])[ ]*\}/,
	diapMultiplierRe: /\{[ ]*([0-9]*)[ ]*,[ ]*([0-9]*)[ ]*\}/, 
	parseMultiplier: function(str){
		if (typeof str === "number"){
			return [str, str]
		} else if (str instanceof Array){
			if (str.length === 2){
				return str;
			} else {
				return [str[0], str[0]]
			}
		} else {
			var match;
			if (!str){
				return [1,1]
			} else if (str === "?"){
				return [0,1]
			} else if (str === "*"){
				return [0, this.expression.options.maxMultiplier]
			} else if (str === "+"){
				return [1, this.expression.options.maxMultiplier]				
			} else if ((match = str.match(this.singleMultiplierRe))){
				return [~~match[1], ~~match[1]]
			} else if ((match = str.match(this.diapMultiplierRe))){
				return [match[1] ? ~~match[1] : 0, match[2] ? ~~match[2] : this.expression.options.maxMultiplier]
			} else {
				return [1,1]
			}
		}
	},

	/*
		Convert multiplier to string
	*/
	renderMultiplier: function(){
		if (this.multiplier[0] === 1 && this.multiplier[1] === this.expression.options.maxMultiplier){
			return "+"
		} else if (this.multiplier[0] === 0 && this.multiplier[1] === this.expression.options.maxMultiplier){
			return "*"
		} else if (this.multiplier[0] === 0 && this.multiplier[1] === 1){
			return "?"
		} else if(this.multiplier[0] === this.multiplier[1]){
			if(this.multiplier[0] === 1) return ""
			return "{" + this.multiplier[0] + "}"
		} else {
			return "{" + this.multiplier[0] + ", " + this.multiplier[1] + "}"
		}
	},

}
	/**
* ([^]*) and (?:[^]*) and [^]* token
* @constructor
* @extends Token
*/
function GroupToken(){
	this._constructor.apply(this, arguments)
}
extend(GroupToken.prototype, Token.prototype, {
	parse: function(str){
		//console.log("Group token", str)

		//init vars
		this.alternatives = [];

		this.groupString = str;

		this.groupType = str.match(/(\(\?\:|\(|)/)[1];
		str = str.slice(this.groupType.length, this.groupType ? -1 : str.length);
		
		//split alternatives
		var alternatives = str.split("|");
		for (var i = 0; i < alternatives.length; i++){
			this.alternatives.push(this.parseSequence(alternatives[i]));
		}
	},

	/*
		Parses one of the options: returns sequence (array) of tokens.
		Supposed that sequence does not contain alternatives | or groups ().
	*/
	anyTokenRE: /^\[([^]*)\](\?|\*|\+|\{[0-9, ]*\}|)/,
	dataTokenRE: /^\{\{[ ]*([0-9.a-zA-Z$_,-\|\(\)]*)[ ]*\}\}(\?|\*|\+|\{[0-9, ]*\}|)/,
	specSymbolTokenRE: /^\\([^])(\?|\*|\+|\{[0-9, ]*\}|)/,
	groupStubTokenRE: new RegExp("^" + refBrackets[0] + "([0-9]+)" + refBrackets[1]),
	stringTokenRE: new RegExp("^((?:[^](?![\\*\\?\\+\\{\\[" + refBrackets[0] + "\\\\]|$))+[^]|[^](?=[\\*\\?\\+\\{\\[" + refBrackets[0] + "\\\\]|$))(\\?|\\*|\\+|\\{[0-9, ]*\\}|)"),
	parseSequence: function(str){
		

		
		var sequence = [];

		//find first metasymbol
		var tokenMatch;
		var c = 0; //prevent infinite cycle
		while( str  && c < 9999){
			if (tokenMatch = str.match(this.anyTokenRE)){
				
				sequence.push(new AnyToken(tokenMatch[1], tokenMatch[2], this.expression));
			} else if (tokenMatch = str.match(this.dataTokenRE)){
				
				sequence.push(new DataToken(tokenMatch[1], tokenMatch[2], this.expression));				
			} else if (tokenMatch = str.match(this.specSymbolTokenRE)){
				

				//TODO: test on real spec symbols

				if (/[1-9]/.test(tokenMatch[1])){
					//group reference like \1
					sequence.push(new GroupRefToken(~~tokenMatch[1], tokenMatch[2], this.expression));
				} else {
					sequence.push(new StringToken("\\" + tokenMatch[1], tokenMatch[2], this.expression));
				}
			} else if (tokenMatch = str.match(this.groupStubTokenRE)){
				
				sequence.push(this.expression.tokens[tokenMatch[1]]);
			} else if (tokenMatch = str.match(this.stringTokenRE)){
				
				if (tokenMatch[2]) {
					sequence.push(new StringToken(tokenMatch[1].slice(0,-1), 1, this.expression))
					sequence.push(new StringToken(tokenMatch[1].slice(-1), tokenMatch[2], this.expression))
				} else {
					sequence.push(new StringToken(tokenMatch[1], tokenMatch[2], this.expression))
				}
			} else {
				//if no any other token worked: cast to string token
				
				sequence.push(str)
				str = ""
				break;
			}

			str = str.slice(tokenMatch[0].length);
			if (!str) break;
			c++;
		}
		
		
		return sequence;
	},

	toString: function(flatten){
		var result = this.groupType;
		for(var i = 0; i < this.alternatives.length; i++){
			var sequence = this.alternatives[i];
			//console.group(sequence)
			for (var j = 0; j < sequence.length; j++){
				//console.log(flatten, sequence[j])
				if (flatten && (sequence[j] instanceof GroupToken)){
					result += refBrackets[0] + sequence[j].idx + refBrackets[1];
				} else {
					result += sequence[j].toString();
				}
			}
			//console.groupEnd();
			if (i !== this.alternatives.length - 1) result += "|"
		}

		if (this.groupType) result += ")";
		result += this.renderMultiplier();

		return result;
	},

	toJSON: function(){
		result = {
			token: "GroupToken",
			alternatives: [],
			multiplier: this.multiplier
		}

		for (var i = 0; i < this.alternatives; i++){
			var seq = [];
			for (var j = 0; j < this.alternatives[i].length; j++){
				seq.push(this.alternatives[i][j].toJSON())
			}
			result.alternatives.push(seq)
		}

		return result
	},

	populate: function(ctx, multiplier){
		//TODO: think up how to populate real types for instances, containing only data, like "{{ true }}"

		var result = "",
			m = multiplier || this.multiplier,
			times = int(m[0], m[1]);

		var seq = any(this.alternatives);

		if (times === 1 && seq.length === 1){
			return seq[0].populate(ctx);
		} else {
			for (var i = 0; i < times; i++){
				for (var j = 0; j < seq.length; j++){
					result += seq[j].populate(ctx);
				}
			}
		}

		return result;
	}
});
	/**
* \1, \2 ... token
* @constructor
* @extends Token
*/
function GroupRefToken(){
	this._constructor.apply(this, arguments)
}
extend(GroupRefToken.prototype, Token.prototype, {
	parse: function(str){
		//init vars
		this.groupId = ~~str;
	},

	toString: function(){
		return "\\" + this.groupId + this.renderMultiplier();
	},

	toJSON: function(){
		return {
			token: "GroupRefToken",
			groupId: this.groupId,
			multiplier: this.multiplier
		}
	},

	populate: function(ctx){
		var times = int(this.multiplier[0], this.multiplier[1], true);
		var result = "";
		for (var i = 0; i < times; i++){
			result += this.expression.groups[this.groupId].populate(ctx, [1,1]);
		}

		return result;
	}
});
	/**
* b? or abc token
* @constructor
* @extends Token
*/
function StringToken(){
	this._constructor.apply(this, arguments)
}
extend(StringToken.prototype, Token.prototype, {
	parse: function(str){
		if (str[0] === "\\"){
			this.isUnsafe = unsafeSymbols.indexOf(str[1]) >= 0;
			this.alternatives = str.slice(1)
		} else {
			this.alternatives = str
		}
	},

	populate: function(ctx, multiplier){
		var m = multiplier || this.multiplier,
			result = "",
			times = int(m[0], m[1]);
		for (var i = 0; i < times; i++){
			result += this.alternatives;
		}

		return result;
	},

	toString: function(){
		return (this.isUnsafe ? '\\' : '') + this.alternatives + this.renderMultiplier();
	},

	toJSON: function(){
		return {
			token: "StringToken",
			alternatives: this.alternatives,
			multiplier: this.multiplier
		}
	}
})
	/**
* {{ Data.Type }} token
* @constructor
* @extends Token
*/
function DataToken(){
	this._constructor.apply(this, arguments)
}
extend(DataToken.prototype, Token.prototype, {
	maxRecursionDepth: 5,

	techSymbols: "|,()",
	parse: function(str){
		//console.group("dataToken: ", str)

		//Get rid of brackets
		str = str.slice(2, -2).trim();

		this.dataString = str;

		//escape all stringy tech chars to avoid interference in parsing
		str = escapeWithin(str, "''", '""')

		//Split components: source|filter1|filter2...
		var sequence = str.split('|');
		var source = unescape(sequence[0]).trim();
		var filters = sequence.slice(1);

		//Set up vital variables: source
		this.source = recognizeParam(source);

		//And list of filter callers
		this.filters = [];
		for (var i = 0; i < filters.length; i++){
			this.filters.push(new Filter(unescape(filters[i])))
		}

		//console.log("Datatoken source: ", this.source)
		//console.log("Datatoken filters: ", this.filters)

		//recognize function to call within context

		//console.groupEnd();
	},

	toString: function(){
		return "{{ " + this.dataString + " }}" + this.renderMultiplier();
	},

	toJSON: function(){
		return {
			token: "DataToken",
			source: this.source,
			filters: this.filters,
			multiplier: this.multiplier
		}
	},

	populate: function(ctx, multiplier){
		//console.group("populate datatoken:", this.toString(), " with context", ctx)
		var result,
			m = multiplier || this.multiplier,
			times = int(m[0], m[1], true);

		//TODO
		//Read data from known place, like language.alphabete
		//Read data from unknown place, like email (search throughout the models)
		//Eval functions, if function matched, like {{ abc(12) }}
		//Choose any from array, if data is array (and eval each element as an expression)
		//Choose any key, if property contains keys
		//Eval expression, if it is string
		//Apply replacements, if there are any data-elemens nearby
		//The same way, define environment to call it within. It is needed to call things like {{ index(12) }}, {{ repeat(23,25) }}
		//Prevent too long recursive calls: just output last as empty string

		//TODO: apply context to the call of function, if it is 
		if (times === 1){
			result = this.getData(ctx);
			//console.groupEnd();
			return result;
		} else {
			for (var i = 0; i < times; i++){
				result += this.getData(ctx);
			}
		}

		//console.log("Populated:", result)
		//console.groupEnd();

		return result;
	},

	getData: function(ctx){
		var src = undefined,
			result;
		//Makes initial source
		//console.group("data token getdata:", this.source, "with ctx", ctx)
		if (this.source instanceof CallSequence) {
			result = this.source.makeCall(ctx);
		} else {
			result = this.source;
		}
		//console.groupEnd()

		//Goes through all filters registered, does CallSequence calls, if needed
		for (var i = 0; i < this.filters.length; i++){
			result = this.filters[i].process(result, ctx);
		}

		return result;
	}
});
	/**
* [abc] token
* @constructor
* @extends Token
*/
function AnyToken(){
	this._constructor.apply(this, arguments)
}
//TODO: optimize sequences. Now you can write something like a-я (a is english), and it will raise huge list
//TODO: make reserved things like alnum
extend(AnyToken.prototype, Token.prototype, {
	parse: function(str){

		var seqRE = /[^-]-[^-]/ig;

		var seqMatch = str.match(seqRE);

		//find and handle sequences
		if (seqMatch){
			for (var i = 0; i < seqMatch.length; i++){
				var start = seqMatch[i].charCodeAt(0),
					end = seqMatch[i].charCodeAt(2),
					seqStr = "",
					from = Math.min(start, end),
					to = Math.max(start, end);
				for (var charCode = from; charCode <= to; charCode++){
					seqStr += String.fromCharCode(charCode);
				}
				str = str.replace(seqMatch[i], seqStr);
			}
		}
		this.alternatives = str;
	},

	populate: function(ctx, multiplier){
		var m = multiplier || this.multiplier,
			result = "",
			times = int(m[0], m[1], true);

		for (var i = 0; i < times; i++){
			result += any(this.alternatives)
		}

		return result;
	},

	toString: function(){
		return "[" + this.alternatives + "]" + this.renderMultiplier();
	},

	toJSON: function(){
		return {
			token: "AnyToken",
			alternatives: this.alternatives.split(""),
			multiplier: this.multiplier
		}
	}
})
	/**
* Special object to supply callable primitive. May consist of other call sequences.
* E.g. `.some['property']('to', ['call'], { with: 'params'})[1][2].[3]`
* It will make all necessary calls to obtain the most recent result
*
* Called within expressions only
* @constructor
*/
function CallSequence(str){
	if (!str) return undefined;

	//console.group("callsequence", str, expression)

	this.chunkNames = [];
	this.chunkArguments = [];

	//Parse chunks
	//.name(args)
	//['name'](args)
	//Every callchunk is:
	//{ name: '', arguments: [...]}

	str = escapeWithin(str, "()", "''", '""');

	//Make initial chunk matching
	var match;
	match = str.match(this.plainChunkRE);

	if (!match) {
		throw new Error("Cannot match initial call sequence chunk `" + str + "`")
		//return null;
	}

	this.chunkNames.push(unescape(match[1]));
	this.chunkArguments.push(parseArguments(unescape(match[2])));

	str = str.replace(match[0], "");

	if (!str) {
		//console.log("callseq ok")
		//console.groupEnd();
		return;
	}

	//Match rest chunks
	var c = 10; //limiter of infinite cycling
	while ((match = str.match(this.plainChunkRE) || str.match(this.keyChunkRE)) && c){
		//console.log("chunk", match)
		this.chunkNames.push(unescape(match[1]));
		this.chunkArguments.push(parseArguments(unescape(match[2])));
		str = str.replace(match[0], "");
		c--;
	}

	//console.log("callseq ok", this.chunkNames);
	//console.groupEnd();
}

CallSequence.prototype = {
	plainChunkRE: /^([a-z_$][a-z0-9_$]*)[ ]?(?:\(([^\)]*)\))?\.?/i,
	keyChunkRE: /^\[['"]((?:[^](?!['"]))+[^]|[^])['"]\][ ]?(?:\([^\)]*\))?\.?/i,
	//indexChunkRE: /^/i,

	/*
	* Invokes sequence
	*/
	makeCall: function(ctx){
		var context = ctx || I;
		//console.group("callseq makeCall `" + this.chunkNames[0] + "` within ctx:", ctx)

		var chunkTarget = context[this.chunkNames[0]];
		if (chunkTarget === undefined) chunkTarget = I[this.chunkNames[0]];
		if (chunkTarget === undefined) {
			console.error("warning: no target found for chunk `" + this.chunkNames[0] + "` within context ", context)
			//console.groupEnd();
			return undefined;
		}

		if (typeof chunkTarget === "function"){
			var tmpValue = chunkTarget.apply(context, this.getArgumentsData(this.chunkArguments[0], context));
			//console.log("callseq result", tmpValue)
		} else {
			//TODO: what else value callsequence may possess? If it is object - probably I should eval it with data? No?
			//console.groupEnd();
			return chunkTarget;
		}

		//Go by chunks
		for (var i = 1; i < this.chunkNames.length; i++){
			if (typeof tmpValue[this.chunkNames[i]] === "function"){
				var args = this.getArgumentsData(this.chunkArguments[i], context);
				tmpValue = tmpValue[this.chunkNames[i]].apply(context, args);
			} else {
				tmpValue = tmpValue[this.chunkNames[i]]
			}
		}
		//console.groupEnd();

		return tmpValue;
	},

	/*
	* Obtains real data by calling arguments
	*/
	getArgumentsData: function(args, ctx){
		if (!args) return undefined;

		var argsData = [];
		for (var i = 0; i < args.length; i++){
			//supposed that each argument is whether plain type or callsequence
			if (args[i] instanceof CallSequence) {
				argsData.push(args[i].makeCall(ctx));
			} else {
				argsData.push(args[i]);
			}			
		}

		return argsData;
	}
}
	/**
* Filter caller
* Used to call filter with special params in runtime
* @constructor
*/
function Filter(str){
	//console.group("filter", str)

	var firstBrace = str.indexOf("(");

	if (firstBrace > 0){
		this.name = str.slice(0, firstBrace).trim();
		//console.log(str)
		this.params = parseArguments(str.slice(firstBrace).slice(1,-1));
	} else{
		this.name = str.trim();
	}

	// Target filter function to call, like `capitalize`
	this.fn = I.filters[this.name];

	if (!this.fn){
		console.error("no filter `" + this.name + "` found. `none` is used instead.")
		this.fn = none;
	}
	//console.groupEnd();
}

Filter.prototype = {
	/*
	* Main handler: applies filter to the src passed with filtering function fn
	*/
	process: function(src, ctx){
		//console.log("filter process:", src)
		return this.fn.apply(this, [src].concat(this.getParams(ctx)));
	},

	/*
	* Obtains real parameters values
	* As far as params can include DataSources to call, it has to be called first in order to get real data
	*/
	getParams: function(ctx){
		if (!this.params) return undefined;

		var result = [];
		for (var i = 0; i < this.params.length; i++){
			if (this.params[i] instanceof CallSequence) {
				result.push(this.params[i].makeCall(ctx));
			} else {
				result.push(this.params[i]);
			}
		}

		return result;
	}
}
	/**
* Wrapper over expression no comprehend things like ["{{ repeat }}", ...things]
* @constructor
*/
function RepeatExpression(arr){

	this.repeatContext = {
		repeat: this.repeat
	};
	//context for every subject called
	this.subjectContext = extend({}, I, {
		lastIndex: undefined,
		index: this.index
	});

	//match if first item is `{{ repeat }}` statement
	var repeatMatch, restArgs, repeatStr;
	if (typeof arr[0] === 'string' && (/\{\{[ ]*repeat[ \(\),0-9]*\}\}/.test(arr[0]))){
		repeatStr = arr[0];
		restArgs = arr.slice(1);
	} else {
		restArgs = arr;
	}

	//eval subjects
	this.subjects = []
	for (var i = 0; i < restArgs.length; i++){
		this.subjects.push(new DataDescriptor(restArgs[i]))
	}

	//if it was a plain array, repeat as many times as subjects is there
	if (!repeatStr) repeatStr = '{{ repeat(' + this.subjects.length + ') }}';

	this.repeatContext.subjects = this.subjects;
	this.repeatContext.subjectContext = this.subjectContext;

	//own repeat expression
	this.repeatEx = expression(repeatStr)

	//console.log("repeatex", this.subjects)
	//NOTE: there everything is ok, shit happens on call
}

RepeatExpression.prototype = {

	/*
	* To use from within RepeatExpression lists comprehensions
	* Requires context of call
	*
	* Example call:
	* repeat(from, to, randomly) or repeat(times, randomly)
	*/
	//TODO: repeat with no context returns undefined. Always
	repeat: function(a, b, c){
		//console.group("repeatcall with ctx", this)

		if (!this.subjects || this.subjects.length === undefined) return undefined

		//define how many times to repeat
		var min = 1, max = 1, randomly = false;
		if ((b === undefined || b === true || b === false) && a !== undefined){
			max = a;
			min = a;
			randomly = !!b;
		} else if (b !== undefined && a !== undefined) {
			max = b;
			min = a;
			randomly = !!c;
		}


		//define subjects context
		var times = int(min, max);

		this.subjectContext.lastIndex = undefined;

		//Fill results list
		var resultList = [], length = this.subjects.length || 1;
		
		for (var i = 0; i < times; i++){

			var subject = randomly ? any(this.subjects) : this.subjects[i % length];
			//console.group("repeat iteration", this.subjectContext.lastIndex, subject)

			if (subject){
				resultList.push(subject.populate(this.subjectContext));

				//if index function has changed last index, increment from the new value
				if (this.subjectContext.lastIndex !== undefined) {
					this.subjectContext.lastIndex++;
				}
				//console.log("idx after populate", this.subjectContext.lastIndex)
			} else {
				//weird case when non-data-descriptor
				resultList.push(subject);
				//console.log("wrong num")
			}
			//console.groupEnd();
		}
		//console.groupEnd();

		return resultList
	},

	/*
	* To use fromwithin data descriptors. Inserts index of item.
	*/
	//TODO: index with no context always returns 1
	index: function(from){
		if (this.lastIndex === undefined) {
			this.lastIndex = from || 0;
		}
		//console.log("index fn", this.lastIndex)
		return this.lastIndex;
	},

	populate: function(ctx){
		//console.group("populate repeatex", this.subjects)
		var result = this.repeatEx.populate(this.repeatContext);
		//console.groupEnd();
		return result;
	}	
}
	/*
* Data-descriptor concept is similar to the one of expressions, but with data, not with strings.
* You first initializes it, than you can populate it as many times as you wish.
* Reasons to existence of such an object:
* - Parsing happens once, on creating object (it is important for nested and repeated data-descriptors)
* - It is a separate independent module
* - One object populates multiple times
* 
* Shortly, it’s a wrapper over any natural data-type to populate data based on this
* It’s a safety way to create data-populator from any type of object
*/

/* Exemplary data-descriptor
new DataDescriptor({
	siteName: '{{ name }}',
	categories: ['{{ repeat(2,3) }}', {
		id: '{{ index(2) }}',
		name: Person.name,
		regDate: '{{ date(from, to)|naturalday }}'
	}],

	logoColor: function(){ return any("red", "green", "blue") },

	pages: [ '{{ repeat(2,12) }}', Article, News, List ]
})
*/

/**
* @constructor
*/
function DataDescriptor(src) {
	//context to keep tacidly data related with populating expressions

	this.model = this.recognize(src);

	this.stop = 0;
	//console.log("new dd", this.model)
	//TODO: these new data descriptors are not apprehended by repeatEx
}


DataDescriptor.prototype = {
	dataRegExp: new RegExp([
		dataDelimiter[0],
		"[ ]*([a-zA-Z_$@][a-zA-Z_$@.0-9]*)[^", dataDelimiter[0], dataDelimiter[1], "]*",
		dataDelimiter[1]
	].join(''), "ig"),

	/*
	* Parses @str, makes model based on it.
	* Returns data-desctiptor parsed
	*/
	parseDescriptor: function(str){

		var dataMatch = str.match(this.dataRegExp);

		var dataRequired = [];

		dataRequired[0] = {
			title: "",
			description: "",
			tagline: "",
			categories: [],
			tags: [],
			pubdate: "",
			author: "Person"
		}

		return dataRequired;
	},

	/*
	* Creates descriptor from any obj passed
	*/
	recognize: function(src){
		//if list is passed - use it as a basis
		if (src instanceof Array){
			return new RepeatExpression(src);
		}

		//if string passed - parse data-descriptor from it and init model
		else if (typeof src === "string" || src instanceof RegExp ){
			return expression(src);
		}

		//if simple object is passed - make a list from it
		else if (src instanceof Object){
			return this.recognizeObject(src);
		}

		//otherwise do not create itseld, cause it is the same as plain value
		else {
			return src
		}
	},

	/*
	* If descriptor of format {obj}
	*/
	recognizeObject: function(descriptor){
		if (!descriptor || typeof descriptor === "function") return descriptor;

		var result = {};

		//Go by keys, handle each properly
		for (var key in descriptor){
			result[key] = this.recognize(descriptor[key])
		}

		return result;
	},

	/**
	* External method
	* @expose
	*/
	populate: function(ctx){ //TODO: if undefined passed deliberately
		var context = ctx || I;
		return this.populateModel(context, this.model);
	},
	/**
	* Private populator of model
	*/
	populateModel: function(ctx, model){
		var result = undefined;

		//console.group("populate datadesc with model", model)

		if (model instanceof Expression){
			result = model.populate(ctx);
		} else if (model instanceof DataDescriptor){
			result = model.populate(ctx);
		} else if (model instanceof RepeatExpression){
			result = model.populate(ctx);
		} else if (model instanceof Object){
			if (this.stop >= 19){
				console.error("Too big depth of population. Reassert your DataDescriptor")
				return undefined;
			}
			result = this.populateObject(ctx, model);
		} else {
			result = model;
		}
		//console.log("pop result", result)
		//console.groupEnd();

		return result
	},
	populateObject: function(ctx, obj){
		if (typeof obj === "function"){
			//TODO: think about passing a param to function
			return obj.apply(ctx);
		}

		var result = {};
		this.stop += 1;
		for (var key in obj){
			//console.group("populate object key: `" + key+ "`", obj[key], "result:", result)
			//result[key] = obj[key]
			result[key] = this.populateModel(ctx, obj[key]);
			//console.log("populated obj key `" + key + "` result:", result)
			//console.groupEnd();
		}
		//console.log("popobj result", result)
		return result
	}
}


})();