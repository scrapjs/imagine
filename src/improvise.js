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
	//API
	randomBetween: randomBetween,	
	randomFrom: randomFrom,
	replacements: replacements,
	expression: expression,
	sanitize: sanitize,



	/*
		Builds up an syntax tree object, representing structure of data should be generated
		"abc(de?f|(hjk|lm[nN]{{ o }}pq|rst?))?uv|xyz"
		Typical tree
		{} - token: group, set, string
		[] - sequence

		{
			idx: 0,
			alternatives:[
				[
					{
						idx: 1,
						alternatives: ["abc"],
						times: [1,1]
					},
					{
						idx: 2,
						alternatives:[
							...
						],
						times: [1,1]
					},
					...
				],
				[
					{
						idx: N,
						alternatives: ["xyz"],
						times: [1,1]
					}
				]
			],
			times:[1,1]
		}
	*/



	dataRegExp: new RegExp(
		[
			I.o.dataDelimiter[0],
			"[ ]*([a-zA-Z_$@][a-zA-Z_$@.0-9]*)[^", I.o.dataDelimiter[0], I.o.dataDelimiter[1], "]*",
			I.o.dataDelimiter[1]
		].join(''), "ig"),


	/*
		Forms data-properties array from the string passed.
		I.E. parses django- or swig-like- teplate passed
	*/
	//TODO: think how to recognize types of properties (some dict maybe?)
	/*
		Sample descriptor
		data: {		
			"page":{
				"title": "{{ Thing.title }}",
				"intro": "{{ lorem p1 }}"
			},
			"posts": {
				dataType: 'Thing',
				number: 12,

			}

		}
	*/
	recognizeDataRequired: function(str){
		var dataMatch = str.match(I.dataRegExp);
		console.log(dataMatch)
		return [];
	}
});