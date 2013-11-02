/*
	[abc] token
*/
function AnyToken(){
	this._constructor.apply(this, arguments)
}
extend(AnyToken.prototype, Token.prototype, {
	parse: function(str){
		this.alternatives = str;
	},

	populate: function(multiplier){
		var m = multiplier || this.multiplier,
			result = "",
			times = randomBetween(m[0], m[1], true);

		for (var i = 0; i < times; i++){
			result += randomFrom(this.alternatives)
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