/*
	Returns number between from and to.
	If @to is omitted, returns number between 0 and @from
*/
function randNum(from, to){
	if (to)	return Math.round( Math.random() * (to - from) + from);
	else return Math.round(Math.random() * from);
}

/*
	Returns random value from array/string passed
*/
function randFrom(arr){
	return arr[randNum(arr.length-1)];
}

/*
	Returns random character from alphabete passed
*/
function randChar(alphabete){
	alphabete = alphabete || language.alphabete;
	return randFrom(alphabete);
}

/*
	Fill string with letters instead of ? and digits instead of #
*/
function lexnum(string){
	var res = string.replace(/#/g, function(){
		return randNum(0,9)
	})
	return res.replace(/\?/g, function(){
		return randChar()
	})
}

/*
	Apply list of replacements to the string, like {"x": "12345", "X": "0123456789"}
*/
function replacements(str, replacements){
	for (var rep in replacements){
		str.replace(new RegExp("rep", "g"), function(){
			return randFrom(replacements[rep])
		})
	}
}

/*
	strip tags which shouldn’t be involved into the parsing proccess
*/
var badTags = 'applet base basefont frame frameset head isindex link meta noframes noscript object param script style title'.split( ' ' )
function sanitize(str, tags){
	var res = str;
	tags = tags || badTags;
	for (var i = 0; i < tags.length; i++){
		var fullTagReStr = ["<", tags[i], "\\b(?:[^](?!<\\/", tags[i] ,"))*[^]<\\/", tags[i], "\\b[^>]*>"].join("");
		var fullTagRe = new RegExp(fullTagReStr, "ig");

		var shortTagReStr = ["<", tags[i], "[^\\/>]*\\/>"].join("");
		var shortTagRe = new RegExp(shortTagReStr, "ig");
		
		res = res.replace(fullTagRe, '');
		res = res.replace(shortTagRe, '');
	}
	return res
}