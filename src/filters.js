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