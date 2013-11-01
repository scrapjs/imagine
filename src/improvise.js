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
	/*
	*	Returns number between from and to.
	*	If @to is omitted, returns number between 0 and @from
	*/
	randomBetween: function(from, to){
		if (to)	return ( Math.random() * (to - from) + from);
		else return (Math.random() * from);
	},


	/*
	*	Returns random value from array/string passed
	*/
	randomFrom: function(arr){
		return arr[Math.round(this.randomBetween(arr.length-1))];
	},


	/*
	*	Apply list of replacements to the string, like {"x": "12345", "X": "0123456789"}
	*/
	replacements: function(str, replacements){
		var self = this;
		for (var rep in replacements){
			var re = rep.replace(/[\?\*\+\\\{\}\[\]\(\)\,\.]/, function(m){return "\\" + m});
			str = str.replace(new RegExp(re, "g"), function(){
				return self.randomFrom(replacements[rep])
			})
		}

		return str;
	},



	/* 
	*	Populate @string based on regex-like notation mixed with moustache data-insertions.
	*	Examples:
	*	"{{ Internet.url }}{2,3}"
	*	"[a-z]{4,5}"
	*	"([1-9][0-9]?)(?:, ${1}){,2}" ⇒ "14", "5" or "2, 12, 45"
	*	""
	*/
	expressions: {},
	expression: function(str){
		//cache expression
		if (!this.expressions[str]){
			this.expressions[str] = new Expression(str);
		}

		//console.log(this.expressions[str].toString())

		return this.expressions[str].populate();
	},


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


	/*
	*	strip tags which shouldn’t be involved into the parsing proccess
	*/
	sanitize: function(str, tags){
		var res = str;
		tags = tags || I.o.badTags;
		for (var i = 0; i < tags.length; i++){
			var fullTagReStr = ["<", tags[i], "\\b(?:[^](?!<\\/", tags[i] ,"))*[^]<\\/", tags[i], "\\b[^>]*>"].join("");
			var fullTagRe = new RegExp(fullTagReStr, "ig");

			var shortTagReStr = ["<", tags[i], "[^\\/>]*\\/>"].join("");
			var shortTagRe = new RegExp(shortTagReStr, "ig");
			
			res = res.replace(fullTagRe, '');
			res = res.replace(shortTagRe, '');
		}
		return res
	},


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