/**
* [abc] token
* @constructor
* @extends Token
*/
function AnyToken(){
	this._constructor.apply(this, arguments)
}
//TODO: optimize sequences. Now you can write something like a-я (a is english), and it will raise huge list
//TODO: make reserved things like alnum
extend(AnyToken.prototype, Token.prototype, {
	parse: function(str){

		var seqRE = /[^-]-[^-]/ig;

		var seqMatch = str.match(seqRE);

		//find and handle sequences
		if (seqMatch){
			for (var i = 0; i < seqMatch.length; i++){
				var start = seqMatch[i].charCodeAt(0),
					end = seqMatch[i].charCodeAt(2),
					seqStr = "",
					from = Math.min(start, end),
					to = Math.max(start, end);
				for (var charCode = from; charCode <= to; charCode++){
					seqStr += String.fromCharCode(charCode);
				}
				str = str.replace(seqMatch[i], seqStr);
			}
		}
		this.alternatives = str;
	},

	populate: function(multiplier){
		var m = multiplier || this.multiplier,
			result = "",
			times = int(m[0], m[1], true);

		for (var i = 0; i < times; i++){
			result += any(this.alternatives)
		}

		return result;
	},

	toString: function(){
		return "[" + this.alternatives + "]" + this.renderMultiplier();
	},

	toJSON: function(){
		return {
			token: "AnyToken",
			alternatives: this.alternatives.split(""),
			multiplier: this.multiplier
		}
	}
})