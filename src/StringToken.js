/*
	b? or abc token
*/
function StringToken(){
	this._constructor.apply(this, arguments)
}
extend(StringToken.prototype, Token.prototype, {
	parse: function(str){
		this.alternatives = str;
	},

	populate: function(multiplier){
		var m = multiplier || this.multiplier,
			result = "",
			times = int(m[0], m[1]);
		for (var i = 0; i < times; i++){
			result += this.alternatives;
		}

		return result;
	},

	toString: function(){
		return this.alternatives + this.renderMultiplier();
	},

	toJSON: function(){
		return {
			token: "StringToken",
			alternatives: this.alternatives,
			multiplier: this.multiplier
		}
	}
})