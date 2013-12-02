/*
*	How's project called
*/
//#ifdef projectName
	//# put 'var projectName = "' + projectName + '";'
//#else
	var projectName = "imagine";
//#endif


/*
*	Main keeper object - singleton
*/
var I = {};
window[projectName] = I;


/*
*	Init improviser settings
*/
I.o = {
	locale: 'en_EN', //default locale to rely on
	badTags: 'applet base basefont frame frameset head isindex link meta noframes noscript object param script style title'.split( ' ' ),
};
if (window[projectName]){
	extend(I.o, window[projectName]);
}


/*
*	External methods & default context
*/
extend(I, {
	refBrackets: refBrackets, 

	//utils
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

	//API
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
	sanitize: sanitize,
	/** @expose */
	none: none,
	/** @expose */
	populate: populate,

	//Set of filters
	/** @expose */
	fixed: fixed,
	/** @expose */
	index: index,
	/** @expose */
	repeat: repeat,

	//Classes
	/** @expose */
	Expression: Expression,
	/** @expose */
	DataDescriptor: DataDescriptor

});