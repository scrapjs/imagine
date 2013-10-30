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

	populate: function(){

	},

	toString: function(){
		return "[" + this.alternatives + "]" + this.renderMultiplier();
	},

	toJSON: function(){
		return {
			alternatives: this.alternatives,
			multiplier: this.multiplier
		}
	}
})