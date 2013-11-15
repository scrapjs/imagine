/*
	How's project called
*/
//#ifdef projectName
	//# put 'var projectName = "' + projectName + '";'
//#else
	var projectName = "improvise";
//#endif


/*
	Main keeper object - singleton
*/
var I = {};
window[projectName] = I;


/*
	Init improviser settings
*/
I.o = {
	dataDelimiter: ["{{", "}}"], //delimiters to split data-chunks from string
	locale: 'en_EN', //default locale to rely on
	badTags: 'applet base basefont frame frameset head isindex link meta noframes noscript object param script style title'.split( ' ' ),
};
if (window[projectName]){
	extend(I.o, window[projectName]);
}


/*
	Init improviser methods
*/
extend(I, {
	//vars
	refBrackets: refBrackets, 

	//API
	any: any,
	int: int,
	float: float,
	number: number,
	bool: bool,
	replacements: replacements,
	expression: expression,
	sanitize: sanitize,
	object: object
});