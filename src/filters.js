/**
* Set of filters to use within DataTokens
* Covers swig filters and django-filters behaviour
* Easily extandable as Imagine.filters.filter = function(input, params){ return output}
*/

var filters = {
	capitalize: capitalize,
	capfirst: capitalize,
	'default': _default,
	truncatechars: truncatechars,

	sort: sort,
	reverse: reverse,
	first: first,
	last: last,
	uniq: uniq,
	join: join,
	title: titleCase,

	escape: _escape,
	e: _escape,

	any: any,
	random: any,

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
	//TODO
	var result = arr;
	return result
}


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
	return what
}


/*
* --------------------- Djangoes
*/
function add(augent, addent){
	return augent + addent
}
function addslashes(str){
	//TODO
	return str
}
function cut(str, value){
	return str.replace(new RegExp(value, "g"), "");
}