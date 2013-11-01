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
	}
});