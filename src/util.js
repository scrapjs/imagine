/*
	class extender tool
*/
function extend(a){
	for (var i = 1, l = arguments.length; i<l; i++){
		var b = arguments[i];
		for (var k in b){
			a[k] = b[k];
		}
	}
	return a;
}

/*
*	Returns number between from and to.
*	If @to is omitted, returns number between 0 and @from
*/
function randomBetween(from, to, round){
	if (to === true || to === false) {
		return Math.round(Math.random() * from)
	} else if (to === undefined || to === null) {		
		return (Math.random() * from)
	} else {
		if (round) {
			return Math.round( Math.random() * (to - from) + from)
		} else {
			return ( Math.random() * (to - from) + from)
		}
	}
}

/*
*	Returns random value from array/string passed
*/
function randomFrom(arr){
	return arr[randomBetween(arr.length-1, true)];
}

/*
*	Apply list of replacements to the string, like {"x": "12345", "X": "0123456789"}
*/
function replacements(str, replacements){
	var self = this;
	for (var rep in replacements){
		var re = rep.replace(/[\?\*\+\\\{\}\[\]\(\)\,\.]/, function(m){return "\\" + m});
		str = str.replace(new RegExp(re, "g"), function(){
			return self.randomFrom(replacements[rep])
		})
	}

	return str;
}

/* 
*	Populate @string based on regex-like notation mixed with moustache data-insertions.
*	Examples:
*	"{{ Internet.url }}{2,3}"
*	"[a-z]{4,5}"
*	"([1-9][0-9]?)(?:, ${1}){,2}" ⇒ "14", "5" or "2, 12, 45"
*	""
*/
var expressions = {};
function expression(str){
	//cache expression
	if (!expressions[str]){
		expressions[str] = new Expression(str);
	}

	return expressions[str].populate();
}

/*
*	strip tags which shouldn’t be involved into the parsing proccess
*/
function sanitize(str, tags){
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
}