/*
*	How's project called
*/
//#ifdef projectName
	//# put 'var projectName = "' + projectName + '";'
//#else
	var projectName = "imagine";
//#endif

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
		//other
		'default': _default,
		any: any,
		random: any,
		//djangos
		add: add,
		cut: cut
	},

	//utils - exposed technical and private functions
	utils: {
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
		Expression: Expression,
	},

	//Set of data-providers, keyed by locale
	//providers: {}
});


//Make global
window[projectName] = I;