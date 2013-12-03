/*
*	How's project called
*/
//#ifdef projectName
	//# put 'var projectName = "' + projectName + '";'
//#else
	var projectName = "imagine";
//#endif

/*
* Main keeper object - singleton
* External methods & default context
*/
var I = {
	//settings
	locale: 'en_EN',

	//utils - exposed private functions
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
	},

	//API - data-functions
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
	replacements: replacements,
	/** @expose */
	expression: expression,
	/** @expose */
	none: none,
	/** @expose */
	populate: populate,
	/** @expose */
	fixed: fixed,
	/** @expose */
	index: index,
	/** @expose */
	repeat: repeat,
	/** @expose */
	sanitize: sanitize,

	//Extendable filters set
	/** @expose */
	filters: {},

	//Classes
	Expression: Expression

};


//Make global
window[projectName] = I;