/**
* exposed API
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
	numeric: numeric,
	/** @expose */
	bool: bool,
	/** @expose */
	none: none,
	/** @expose */
	index: index,
	/** @expose */
	//repeat: repeat,
	/** @expose */
	ajax: ajax,



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

	networkSettings: Network.settings,
	ajaxDefaults: Network.ajaxDefaults

	//Set of data-providers, keyed by locale
	//providers: {}
});