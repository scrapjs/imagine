/**
* Set of filters to use within DataTokens
* Covers swig filters and django-filters behaviour
* Easily extandable as Imagine.filters.filter = function(input, params){ return output}
*/

var filters = {
	//strings
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

	//other
	'default': _default,
	any: any,
	random: any,

	//djangos
	add: add,
	cut: cut
}

/*
* --------------------------- Swigs
*/
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
				code = what.charCodeAt(i);
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


//TODOs
function date(){

}
function safe(){

}

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