/**
* b? or abc token
* @constructor
* @extends Token
*/
function StringToken(){
	this._constructor.apply(this, arguments)
}
extend(StringToken.prototype, Token.prototype, {
	parse: function(str){
		if (str[0] === "\\"){
			this.isUnsafe = unsafeSymbols.indexOf(str[1]) >= 0;
			this.alternatives = str.slice(1)
		} else {
			this.alternatives = str
		}
	},

	populate: function(ctx, multiplier){
		var m = multiplier || this.multiplier,
			result = "",
			times = int(m[0], m[1]);
		for (var i = 0; i < times; i++){
			result += this.alternatives;
		}

		return result;
	},

	toString: function(){
		return (this.isUnsafe ? '\\' : '') + this.alternatives + this.renderMultiplier();
	},

	toJSON: function(){
		return {
			token: "StringToken",
			alternatives: this.alternatives,
			multiplier: this.multiplier
		}
	}
})