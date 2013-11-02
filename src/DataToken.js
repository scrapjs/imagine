/*
	{{ Data.Type }} token
*/
function DataToken(){
	this._constructor.apply(this, arguments)
}
extend(DataToken.prototype, Token.prototype, {
	parse: function(str){
		this.dataType = str
		//TODO: recognize data type
	},

	toString: function(){
		return "{{ " + this.dataType + " }}" + this.renderMultiplier();
	},

	toJSON: function(){
		return {
			token: "DataToken",
			dataType: this.dataType,
			multiplier: this.multiplier
		}
	},

	populate: function(multiplier){
		var result = "",
			m = multiplier || this.multiplier,
			times = randomBetween(m[0], m[1], true);

		for (var i = 0; i < times; i++){
			result += this.getData();
		}

		return result;
	},


	getData: function(){
		return this.dataType;
	}
});