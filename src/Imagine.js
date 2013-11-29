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
	escapeWithin: escapeWithin,
	unescapeWithin: unescapeWithin,
	escapeSymbols: escapeSymbols,
	unescapeSymbols: unescapeSymbols,
	parseArguments: parseArguments,

	//API
	any: any,
	int: int,
	float: float,
	number: number,
	bool: bool,
	replacements: replacements,
	expression: expression,
	sanitize: sanitize,
	none: none,
	populate: populate,

	//Set of filters
	fixed: fixed,

	index: index,
	repeat: repeat,

	//utils
	extend: extend,
	escapeWithin: escapeWithin,
	unescapeWithin: unescapeWithin,
	escapeSymbols: escapeSymbols,
	unescapeSymbols: unescapeSymbols,

	//Classes
	Expression: Expression,
	DataDescriptor: DataDescriptor

});